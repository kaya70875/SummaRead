// Function to fetch the summary as before
export const fetchSummary = async (rValue: number) => {
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
