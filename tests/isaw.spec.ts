import { test, expect } from '@playwright/test';


test('Find label in any iframe', async ({ page }) => {
  await page.goto('https://isaw777.blogspot.com/2026/07/isawan7777.html');

  // Wait until all iframes are attached
  await page.waitForLoadState('domcontentloaded');

  const frames = page.frames();

  for (const frame of frames) {
    try {
      const label = frame.locator('label[for="PDI_answer75253678"]');
      const button = frame.locator('button#pd-vote-button17221304');

      if (await label.count()) {
        //console.log('Found in:', frame.url());
        await label.click();
        await button.click();
        const text = await frame.locator('#question-top-17221304').textContent();

        if (/thank you for voting/i.test(text ?? '')) {
            const answer = frame.locator('.pds-answer-text', {
                hasText: "BINI - 'Signals'",
                });

                const votes = await answer
                .locator('xpath=..')
                .locator('.pds-feedback-votes')
                .textContent();

            console.log('✅ Thank you for voting - ' + votes?.trim() + ' - ' + new Date().toLocaleString());    

        } else {
        console.log('❌ Thank you for voting not found');
        }
      }
    } catch (e) {
      // Ignore inaccessible/not-ready frames
    }
  }
  
});