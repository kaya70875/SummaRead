console.log("Content Loaded.");

// This function fetches unnecessary content from the page fix that.
const raw_text = Array.from(document.querySelectorAll("p"))
  .map((p) => p.innerText)
  .join(" ");

const fetchSummary = async () => {
  const response = await fetch("http://127.0.0.1:8000/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paragraph: raw_text,
    }),
  });
  const data = await response.json();
  return data;
};

fetchSummary()
  .then((data) => {
    // data contains the API response
    // Ensure that data.summary is in the correct format
    // For example, if data.summary is a string, convert it to an array of sentences:
    const sentencesToHighlight =
      typeof data.summary === "string"
        ? data.summary
            .split(".")
            .map((s) => s.trim())
            .filter(Boolean)
        : data.summary;

    /*const raw = data.summary.forEach((element) => {
      console.log(element);
    });*/

    // Create a Mark instance and highlight the sentences
    const markInstance = new Mark(document.body);
    markInstance.mark(sentencesToHighlight, {
      element: "span",
      className: "highlight",
      separateWordSearch: false, // Ensures full sentence match
    });
  })
  .catch((error) => {
    console.error("Error fetching summary:", error);
  });
