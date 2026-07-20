function voteBini() {
    const toast = (message, type = "info") => {
    const div = document.createElement("div");

    div.textContent = message;
    div.style =
      "position:fixed;" +
      "top:20px;" +
      "left:50%;" +
      "transform:translateX(-50%);" +
      (type === "error" ? "background:red;" : "background:#008080;") +
      "color:#fff;" +
      "padding:12px 20px;" +
      "border-radius:8px;" +
      "z-index:2147483647;" +
      "font-size:16px;" +
      "box-shadow:0 2px-10px rgba(0,0,0,.4)";

    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 60000);
  };


  // Find the radio label containing "BINI"
  const label = [
    ...document.querySelectorAll('label[for^="PDI_answer"]')
  ].find(label => /BINI/i.test(label.textContent));


  if (!label) {
    toast("BINI not found", "error");
    setTimeout(() => location.reload(), 3000 );
    return;
  } else {

    // Select BINI
    label.click();


    setTimeout(() => {

      const voteButton = document.querySelector(
        "form button.css-vote-button"
      );


      if (!voteButton) {
        alert("Vote button not found");
        return;
      }


      // Click vote
      voteButton.click();


      setTimeout(() => {

        const resultContainer = document.querySelector(
          "#PDI_container17221304"
        );


        document
          .querySelector(".pds-feedback-votes")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });


        if (
          resultContainer &&
          /thank you for voting/i.test(resultContainer.textContent)
        ) {
          toast("Vote counted, reloading in 1 second..");
        } else {
          toast("Error: Thank you for voting not found. Sleeping 20 seconds before retrying..", "error");
          localStorage.clear();

          sessionStorage.clear();
          document.cookie
            .split(";")
            .forEach(cookie => {
              const name = cookie
                .split("=")[0]
                .trim();

              document.cookie =
                `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
          setTimeout(() => location.reload(), 1000 * 60);
  
          return;
        }

        // Clear localStorage, sessionStorage, and cookies before reloading
        setTimeout(() => {

          localStorage.clear();

          sessionStorage.clear();


          document.cookie
            .split(";")
            .forEach(cookie => {
              const name = cookie
                .split("=")[0]
                .trim();

              document.cookie =
                `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });


          location.reload();

        }, 1000);


      }, 1000);


    }, 300);

  }
}

voteBini();
setTimeout(() => location.reload(), 1000 * 60 * 2); // for safety