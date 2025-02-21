console.log("toggle.js");

function handleToggle() {
  const button = document.querySelector(".input-switch");
  if (!button) return;

  // Retrieve stored state
  chrome.storage.sync.get(["buttonActive"], (result) => {
    if (result.buttonActive) {
      button.classList.add("active");
    }
  });

  // Toggle button active state and persist it
  button.addEventListener("click", () => {
    const isActive = button.classList.contains("active");
    console.log("isActive:", isActive);
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
    const sliderValue = result.summaryLength || (200 as number);
    const slider = document.querySelector(
      ".summary-length"
    ) as HTMLInputElement;
    slider.value = sliderValue;
  });

  saveButton?.addEventListener("click", () => {
    const slider = document.querySelector(
      ".summary-length"
    ) as HTMLInputElement;
    const sliderValue = slider.value;
    chrome.storage.sync.set({ summaryLength: sliderValue });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("highlightInfo", async (result) => {
    if (result.highlightInfo) {
      document.querySelector(".system-status")?.classList.add("active");
    }
  });
});

handleToggle();
handleOptions();
