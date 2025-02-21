chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;
    console.log("Options page detected state change:", newState);

    // Update the options page UI directly:
    const optionElements = document.querySelectorAll(".option-content");
    optionElements.forEach((option) => {
      if (newState) {
        option.classList.remove("disabled");
      } else {
        option.classList.add("disabled");
      }
    });
  }
});

chrome.storage.sync.get(["buttonActive"], async (result) => {
  const optionElements = document.querySelectorAll(".option-content");
  optionElements.forEach((option) => {
    if (result.buttonActive) {
      option.classList.remove("disabled");
    } else {
      option.classList.add("disabled");
    }
  });
});
