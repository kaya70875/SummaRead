import { SummaryResponse } from "../types/api";
import { applyMarkColors, getItemFromStorage } from "./utils/helpers";
console.log("Content Loaded.");
import { injectMarks, removeMarks } from "./marker/highlight";
import { fetchSummary } from "./utils/fetch";

// Handle messages from background script
chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === "updateButtonState") {
    console.log("Received state update:", request.state);

    if (request.state) {
      handleFetchAndMark();
    } else {
      removeMarks();
    }
  } else if (request.action === "updateSliderState") {
    removeMarks();
    await handleFetchAndMark();
  }
});

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === "updateColorPref") {
    document.querySelectorAll<HTMLSpanElement>(".highlight").forEach((item) => {
      if (!item) return console.error("No item found");

      item.style.backgroundColor = request.bgColor;
      item.style.color = request.textColor;
    });
  } else {
    console.log("Unknown action:", request.action);
  }
});

const handleFetchAndMark = async () => {
  try {
    const rValue = ((await getItemFromStorage("summaryLength")) ||
      200) as number;
    const data = await fetchSummary(rValue);
    injectMarks(data as SummaryResponse);
    await applyMarkColors();
  } catch (error) {
    console.error("Error fetching summary:", error);
  }
};

// Optionally, check initial state on load and update accordingly
const initializeApp = async () => {
  const active = await getItemFromStorage("buttonActive");
  if (active) {
    await handleFetchAndMark();
  } else {
    removeMarks();
  }
};

initializeApp();
