import { listenStorageChanges } from "./scripts/utils/listeners.js";

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;
    await listenStorageChanges(newState, "state", "updateButtonState");
  } else if (namespace === "sync" && changes.summaryLength) {
    const newState = changes.summaryLength.newValue;
    await listenStorageChanges(newState, "state", "updateSliderState");
  } else if (namespace === "sync" && changes.backgroundColor) {
    const newState = changes.backgroundColor.newValue;
    await listenStorageChanges(newState, "bgColor", "updateColorPref");
  } else if (namespace === "sync" && changes.textColor) {
    const newState = changes.textColor.newValue;
    await listenStorageChanges(newState, "textColor", "updateColorPref");
  }
});

// In background.js, listen and store:
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "highlightComplete") {
    chrome.storage.sync.set({ highlightInfo: request.info });
  }
});
