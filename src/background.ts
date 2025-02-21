chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "updateButtonState",
        state: newState,
      });
    }
  } else if (namespace === "sync" && changes.summaryLength) {
    const newState = changes.summaryLength.newValue;

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: "updateSliderState",
        state: newState,
      });
    }
  }
});
