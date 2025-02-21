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

// Listener for chrome.storage changes
chrome.storage.onChanged.addListener(async (changes, namespace) => {
  console.log("Storage changed:", changes.buttonActive);
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;
    console.log("new state", newState);
    if (newState) {
      await handleFetchAndHighlight();
    } else {
      removeHighlights();
    }
  } else if (namespace === "sync" && changes.summaryLength) {
    const newState = changes.summaryLength.newValue;
    console.log("new state", newState);
    if (newState) {
      removeHighlights();
      await handleFetchAndHighlight();
    }
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
