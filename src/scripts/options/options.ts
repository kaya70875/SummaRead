import { getItemFromStorage } from "../utils/helpers.js";

const optionElements = document.querySelectorAll(".option-content");
const buttonElement = document.querySelector(".save-settings");

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.buttonActive) {
    const isAppActive = changes.buttonActive.newValue;

    optionElements.forEach((option) => {
      if (isAppActive) {
        option.classList.remove("disabled");
        buttonElement?.classList.remove("disabled");
      } else {
        option.classList.add("disabled");
        buttonElement?.classList.add("disabled");
      }
    });
  }
});

const initializeOptionActiveStates = async () => {
  const buttonState = (await getItemFromStorage("buttonActive")) as boolean;
  optionElements.forEach((option) => {
    if (buttonState) {
      option.classList.remove("disabled");
      buttonElement?.classList.remove("disabled");
    } else {
      option.classList.add("disabled");
      buttonElement?.classList.add("disabled");
    }
  });
};

initializeOptionActiveStates();
