import { SummaryResponse } from "../types/api";
import { getR } from "./getOptions";
console.log("Content Loaded.");
import { highlightSummary, removeHighlights } from "./marker/highlight";

// Function to fetch the summary as before
const fetchSummary = async (rValue: number) => {
  console.log("r", rValue);
  const raw_text = Array.from(document.querySelectorAll("p"))
    .map((p) => p.innerText)
    .join(" ");

  const response = await fetch("http://127.0.0.1:8000/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paragraph: raw_text,
      r: rValue || 200,
    }),
  });
  const data = await response.json();
  return data;
};

// Handle messages from background script
chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === "updateButtonState") {
    console.log("Received state update:", request.state);

    if (request.state) {
      await handleFetchAndHighlight();
    } else {
      removeHighlights();
    }
  } else if (request.action === "updateSliderState") {
    removeHighlights();
    await handleFetchAndHighlight();
  }
});

// Optionally, check initial state on load and update accordingly
const getInitialState = async () => {
  console.log("Checking initial state...");
  chrome.storage.sync.get(["buttonActive"], async (result) => {
    const active = result.buttonActive;
    if (active) {
      await handleFetchAndHighlight();
    } else {
      removeHighlights();
    }
  });
};

const handleFetchAndHighlight = async () => {
  try {
    const rValue = (await getR()) as number;
    console.log("R value:", rValue);
    const data = await fetchSummary(rValue);
    highlightSummary(data as SummaryResponse);
  } catch (error) {
    console.error("Error fetching summary:", error);
  }
};

getInitialState();
