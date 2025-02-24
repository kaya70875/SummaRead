import Mark from "mark.js";
import { SummaryResponse } from "../../types/api";

// Function to highlight the summary using Mark.js
const injectMarks = (data: SummaryResponse) => {
  const sentencesToHighlight = data.summary;
  if (!sentencesToHighlight) return console.log("No sentences to highlight");

  try {
    const markInstance = new Mark(document.body);
    markInstance.mark(sentencesToHighlight, {
      element: "span",
      className: "highlight",
      separateWordSearch: false,
      done: () => {
        chrome.runtime.sendMessage({
          action: "highlightComplete",
          info: "Highlighting completed",
        });
      },
    });
  } catch (error) {
    console.error("Error while highlighting:", error);
  }
};

// Function to remove highlights, for instance by removing the added span tags
// (You may need a more robust method depending on your implementation)
const removeMarks = () => {
  // Simple example: remove all elements with class "highlight"
  const markInstance = new Mark(document.body);
  if (!markInstance) return console.log("Mark instance not found");

  markInstance.unmark();
};

export { injectMarks, removeMarks };
