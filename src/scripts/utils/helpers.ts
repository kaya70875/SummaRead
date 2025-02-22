export const getR = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["summaryLength"], async (result) => {
      const sliderValue = result.summaryLength || 200;
      resolve(sliderValue);
    });
  });
};

export const getItemFromStorage = (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], async (result) => {
      const value = result[key];
      resolve(value);
    });
  });
};

export const applyMarkColors = async () => {
  const bgColor = await getItemFromStorage("backgroundColor");
  const textColor = await getItemFromStorage("textColor");

  console.log("Initial Colors:", bgColor, textColor);

  document.querySelectorAll<HTMLSpanElement>(".highlight").forEach((item) => {
    item.style.backgroundColor = bgColor as string;
    item.style.color = textColor as string;
  });
};
