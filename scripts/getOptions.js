export const getR = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["summaryLength"], async (result) => {
      const sliderValue = result.summaryLength || 200;
      resolve(sliderValue);
    });
  });
};
