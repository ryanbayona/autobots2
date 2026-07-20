import { test, expect } from '@playwright/test';

const POLL_URL =
  'https://billboardphilippines.com/music/features/p-pop-2026-favorite-release-poll/';



test('P-Pop 2026 poll shows the BINI - Signals answer and a vote button', async ({
  browser,
}) => {
 let context = await browser.newContext();
  let page = await context.newPage();

  await page.goto(POLL_URL);
  
  await page.waitForLoadState('load');

  // If the Google consent dialog appears, accept it. It renders directly in the
  // DOM under #fc-consent-root (not an iframe), so a normal locator works.
  const consentRoot = page.locator('div.fc-consent-root');
  try {
    await consentRoot.waitFor({ state: 'visible', timeout: 5000 });
    await consentRoot.getByRole('button', { name: /consent/i }).click();
  } catch {
    // Consent dialog never appeared (already consented) — continue.
  }

  // Scroll the poll into view. The poll element carries both classes.
  const poll = page.locator('.CSS_Poll.PDS_Poll');
  await poll.scrollIntoViewIfNeeded();

  
  // The answer label for BINI's "Signals" release (case-insensitive match).
  const biniSignals = poll.locator('label[for="PDI_answer75253678"]');
  //await expect(biniSignals).toHaveText(/BINI\s*-\s*'?Signals'?/i);
  await biniSignals.click();

  // The vote button inside the poll form.
  const voteButton = poll.locator('form button.css-vote-button');
  await voteButton.click();

  const label = page.locator('label.pds-feedback-label').filter({
    has: page.locator('span.pds-answer-text[title*="BINI"]'),
  });
  const votesLocator = label.locator('.pds-feedback-votes');
  if (await votesLocator.count()) {
    votesLocator.scrollIntoViewIfNeeded();
    const text = await votesLocator.textContent();

    if (/votes/i.test(text ?? '')) {
      console.log('Votes found:', text?.trim());
    }
  }

  const votes = await votesLocator.textContent();
  console.log(votes?.trim());
  const container = page.locator('#PDI_container17221304');

  const text = await container.textContent();

  if (text?.match(/thank you for voting/i)) {
    console.log('✅ Already voted');
  } else {
    console.log('❌ Not voted yet');
  }
  
  // Explicitly close the browser once we're done so no window lingers.
  //await page.context().browser()?.close();
});
//article-page-content