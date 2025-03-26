import { Readability } from "@mozilla/readability";

const baseURl = process.env.BASE_URL;

// Function to fetch the summary as before
export const fetchSummary = async (rValue: number) => {
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  const raw_text = article ? article.textContent : "";

  const response = await fetch(
    `https://summarizer-production-ec90.up.railway.app/summarize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paragraph: raw_text,
        r: rValue || 0.3,
      }),
    }
  );
  const data = await response.json();
  return data;
};
