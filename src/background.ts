import { sendStorageChangeToActiveTab } from "./scripts/utils/listeners.js";

// Define a mapping of storage keys to their corresponding actions and state names
const storageKeyMapping = {
  buttonActive: { action: "updateButtonState", stateName: "state" },
  summaryLength: { action: "updateSliderState", stateName: "state" },
  backgroundColor: { action: "updateColorPref", stateName: "bgColor" },
  textColor: { action: "updateColorPref", stateName: "textColor" },
};

// Listener for storage changes
chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === "sync") {
    for (const [key, { action, stateName }] of Object.entries(
      storageKeyMapping
    )) {
      if (changes[key]) {
        const newState = changes[key].newValue;
        await sendStorageChangeToActiveTab(newState, stateName, action);
      }
    }
  }
});
