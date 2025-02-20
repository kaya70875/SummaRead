document.addEventListener("DOMContentLoaded", () => {
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
});
