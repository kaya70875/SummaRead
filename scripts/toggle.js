function handleToggle() {
  const button = document.querySelector(".input-switch");

  // Retrieve stored state
  chrome.storage.sync.get(["buttonActive"], (result) => {
    if (result.buttonActive) {
      button.classList.add("active");
    }
  });

  // Toggle button active state and persist it
  button.addEventListener("click", () => {
    const isActive = button.classList.contains("active");
    if (isActive) {
      button.classList.remove("active");
      chrome.storage.sync.set({ buttonActive: false });
    } else {
      button.classList.add("active");
      chrome.storage.sync.set({ buttonActive: true });
    }
  });
}

function handleOptions() {
  const saveButton = document.getElementById("save-settings");

  chrome.storage.sync.get(["summaryLength"], (result) => {
    const sliderValue = result.summaryLength || 200;
    document.querySelector(".summary-length").value = sliderValue;
  });

  saveButton.addEventListener("click", () => {
    const sliderValue = document.querySelector(".summary-length").value;
    chrome.storage.sync.set({ summaryLength: sliderValue });
  });
}

// Call the functions
handleToggle();
handleOptions();
