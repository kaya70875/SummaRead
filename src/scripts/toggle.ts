type InputElementResultsType = string | number | boolean;

export function saveInputElementToStorage<T extends HTMLInputElement>(
  elementClass: string,
  storageKey: string
) {
  const element = document.querySelector(elementClass) as T;
  if (!element) return console.log("Element class not found");

  const elementValue = element.value;
  chrome.storage.sync.set({ [storageKey]: elementValue });
}

export function getInputElementFromStorage(
  elementClass: string,
  storageKey: string
) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([storageKey], async (result) => {
      const elementValue = result[storageKey] as InputElementResultsType;
      if (!elementClass) {
        resolve(elementValue);
      }

      const element = document.querySelector(elementClass) as HTMLInputElement;
      element.value = elementValue.toString();
    });
  });
}

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
    if (isActive) {
      button.classList.remove("active");
      chrome.storage.sync.set({ buttonActive: false });
    } else {
      button.classList.add("active");
      chrome.storage.sync.set({ buttonActive: true });
    }
  });
}

/* Get and set storage for input elements in extension UI. This functions are strict to InputElements and required for persistent values */

function handleOptions() {
  const saveButton = document.getElementById("save-settings");

  getInputElementFromStorage(".summary-length", "summaryLength");
  getInputElementFromStorage("#primary-color", "backgroundColor");
  getInputElementFromStorage("#secondary-color", "textColor");

  saveButton?.addEventListener("click", () => {
    saveInputElementToStorage(".summary-length", "summaryLength");
    saveInputElementToStorage("#primary-color", "backgroundColor");
    saveInputElementToStorage("#secondary-color", "textColor");
  });
}

// Add event listeners for real-time color updates with debouncing
const primaryColorInput = document.querySelector(
  "#primary-color"
) as HTMLInputElement;
const secondaryColorInput = document.querySelector(
  "#secondary-color"
) as HTMLInputElement;

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const updatePrimaryColor = debounce(() => {
  const color = primaryColorInput.value;
  chrome.storage.sync.set({ backgroundColor: color });
  chrome.runtime.sendMessage({ action: "updateColorPref", bgColor: color });
}, 300);

const updateSecondaryColor = debounce(() => {
  const color = secondaryColorInput.value;
  chrome.storage.sync.set({ textColor: color });
  chrome.runtime.sendMessage({ action: "updateColorPref", textColor: color });
}, 300);

primaryColorInput?.addEventListener("input", updatePrimaryColor);
secondaryColorInput?.addEventListener("input", updateSecondaryColor);

handleToggle();
handleOptions();
