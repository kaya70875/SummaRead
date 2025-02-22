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

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("highlightInfo", async (result) => {
    if (result.highlightInfo) {
      document.querySelector(".system-status")?.classList.add("active");
    }
  });
});

handleToggle();
handleOptions();
