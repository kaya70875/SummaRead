import Mark from "mark.js";
import { SummaryResponse } from "../../types/api";

// Function to highlight the summary using Mark.js
const injectMarks = (data: SummaryResponse) => {
  const sentencesToHighlight = data.summary;

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
};

// Function to remove highlights, for instance by removing the added span tags
// (You may need a more robust method depending on your implementation)
const removeMarks = () => {
  // Simple example: remove all elements with class "highlight"
  const markInstance = new Mark(document.body);
  markInstance.unmark();
};

export { injectMarks, removeMarks };
