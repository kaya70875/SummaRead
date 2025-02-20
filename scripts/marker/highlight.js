// Function to highlight the summary using Mark.js
export const highlightSummary = (data) => {
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
export const removeHighlights = () => {
  // Simple example: remove all elements with class "highlight"
  document
    .querySelectorAll("span.highlight")
    .forEach((el) => el.classList.remove("highlight"));
};
