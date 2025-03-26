import { Readability } from "@mozilla/readability";

// Function to fetch the summary as before
export const fetchSummary = async (rValue: number) => {
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  const raw_text = article ? article.textContent : "";

  const response = await fetch(`http://127.0.0.1:8000/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paragraph: raw_text,
      r: rValue || 0.3,
    }),
  });
  const data = await response.json();
  return data;
};
