async function voteBini(){
    const label = document.querySelector("label[for='PDI_answer75253678']");
    const voteButton = document.querySelector("#pd-vote-button17221304");
    

    label.click();
    
    if (voteButton) {
        voteButton.scrollIntoView({
            behavior: "auto",
            block: "center"
        });

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        voteButton.click();

        const resultContainer = document.querySelector("#PDI_container17221304");

        const deadline = Date.now() + 10000; // 10 seconds

        while (Date.now() < deadline) {
            if (/thank you for voting/i.test(resultContainer.textContent)) {
                const label = [...document.querySelectorAll("label.pds-feedback-label")]
                    .find(label =>
                        label.querySelector('span.pds-answer-text[title*="BINI"]')
                    );

                if (!label) {
                    throw new Error("BINI label not found");
                }

                const votesElement = label.querySelector(".pds-feedback-votes");

                if (!votesElement) {
                    throw new Error("Votes element not found");
                }

                return {r: 'ok', m: votesElement.textContent.trim()};
            }
            await sleep(100);
        }

        


        


        


    }


}