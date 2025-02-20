console.log("Content Loaded.");

// Function to fetch the summary as before
const fetchSummary = async (rValue) => {
  console.log("Fetching summary...", rValue);
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

// Function to highlight the summary using Mark.js
const highlightSummary = (data) => {
  const sentencesToHighlight =
    typeof data.summary === "string"
      ? data.summary
          .split(".")
          .map((s) => s.trim())
          .filter(Boolean)
      : data.summary;

  const markInstance = new Mark(document.body);
  markInstance.mark(sentencesToHighlight, {
    element: "span",
    className: "highlight",
    separateWordSearch: false,
  });
};

// Function to remove highlights, for instance by removing the added span tags
// (You may need a more robust method depending on your implementation)
const removeHighlights = () => {
  // Simple example: remove all elements with class "highlight"
  document
    .querySelectorAll("span.highlight")
    .forEach((el) => el.classList.remove("highlight"));
};

// Listener for chrome.storage changes
chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === "sync" && changes.buttonActive) {
    const newState = changes.buttonActive.newValue;
    console.log("Button state changed:", newState);

    if (newState) {
      const rValue = await getR();
      await handleFetchAndHighlight(rValue);
    } else {
      removeHighlights();
    }
  } else if (namespace === "sync" && changes.summaryLength) {
    const newRValue = changes.summaryLength.newValue;
    console.log("Summary length changed:", newRValue);

    // Instead of checking truthiness, ensure the value is defined
    if (newRValue) {
      removeHighlights(); // Clear current highlights before adding or removing new highlights.
      console.log("new", newRValue);
      const rValue = await getR();
      await handleFetchAndHighlight(rValue);
    }
  }
});

const getR = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["summaryLength"], async (result) => {
      const sliderValue = result.summaryLength || 200;
      resolve(sliderValue);
    });
  });
};

// Optionally, check initial state on load and update accordingly
const getInitialState = async () => {
  const rValue = await getR();
  chrome.storage.sync.get(["buttonActive"], async (result) => {
    const active = result.buttonActive;
    if (active) {
      await handleFetchAndHighlight(rValue);
    } else {
      removeHighlights();
    }
  });
};

const handleFetchAndHighlight = async (rValue) => {
  try {
    const data = await fetchSummary(rValue);
    highlightSummary(data);
  } catch (error) {
    console.error("Error fetching summary:", error);
  }
};

getInitialState();
