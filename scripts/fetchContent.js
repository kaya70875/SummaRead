import { getR } from "./getOptions";
import { removeHighlights } from "./marker/highlight";
import { highlightSummary } from "./marker/highlight";

console.log("Content Loaded.");

// Function to fetch the summary as before
const fetchSummary = async (rValue) => {
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
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;

    if (newState) {
      await handleFetchAndHighlight();
    } else {
      removeHighlights();
    }
  }
});

// Optionally, check initial state on load and update accordingly
const getInitialState = async () => {
  chrome.storage.sync.get(["buttonActive"], async (result) => {
    const active = result.buttonActive;
    if (active) {
      await handleFetchAndHighlight(rValue);
    } else {
      removeHighlights();
    }
  });
};

const handleFetchAndHighlight = async () => {
  try {
    const rValue = await getR();
    const data = await fetchSummary(rValue);
    highlightSummary(data);
  } catch (error) {
    console.error("Error fetching summary:", error);
  }
};

getInitialState();
