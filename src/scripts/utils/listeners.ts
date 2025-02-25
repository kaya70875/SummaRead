type NewState = string | number | boolean;

/**
 *
 * @param newState : The new state to be sent to the tab
 * @param stateName  : The name of the state to be sent to the tab this can be get like request.bgColor
 * @param action : The action to be sent eventListener takes this like request.action
 */
export const listenStorageChanges = async (
  newState: NewState,
  stateName: string,
  action: string
) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  try {
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: action,
        [stateName]: newState,
      });
    }
  } catch (error) {
    console.error("Error sending message to tab:", error);
  }
};
