import Mark from "mark.js";
import { SummaryResponse } from "../../types/api";
console.log("Highlight script loaded.");

// Function to highlight the summary using Mark.js
const highlightSummary = (data: SummaryResponse) => {
  console.log("Highlighting summary...");
  const sentencesToHighlight = data.summary;

  const markInstance = new Mark(document.body);
  console.log("Mark.js instance created");
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

const testFunction = () => {
  console.log("Test function called.");
};

export { highlightSummary, removeHighlights, testFunction };
