export const getItemFromStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get([key], async (result) => {
        const value = result[key];
        resolve(value);
      });
    } catch (error) {
      console.error("Error retrieving item from storage:", error);
      reject(error);
    }
  });
};

export const applyMarkColors = async () => {
  const bgColor = (await getItemFromStorage("backgroundColor")) || "#9acd32";
  const textColor = (await getItemFromStorage("textColor")) || "#000000";

  console.log("Initial Colors:", bgColor, textColor);

  document.querySelectorAll<HTMLSpanElement>(".highlight").forEach((item) => {
    if (!item) {
      console.log("No marked elements found");
      return;
    }

    item.style.backgroundColor = bgColor as string;
    item.style.color = textColor as string;
  });
};
