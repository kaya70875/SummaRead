// Function to check if the current site is supported
function isSupportedSite(url: string) {
  const supportedSites = [
    "medium.com",
    "psychologytoday.com",
    "sciencenews.org",
    "en.m.wikipedia.org",
    "nytimes.com",
    "theguardian.com",
    "bbc.com",
    "cnn.com",
    "npr.org",
    "forbes.com",
    "huffpost.com",
    "theatlantic.com",
    "vox.com",
    "wired.com",
    "businessinsider.com",
    "reuters.com",
    "theverge.com",
    "buzzfeed.com",
    "independent.co.uk",
    "cnbc.com",
    "economist.com",
    "ft.com",
    "latimes.com",
    "usatoday.com",
    "washingtonpost.com",
    "time.com",
    "newscientist.com",
    "wikihow.com",
  ];

  const hostname = new URL(url).hostname.replace("www.", "");
  return supportedSites.some((site) => hostname.endsWith(site));
}

// Check if the current tab is supported
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const url = tabs[0].url;
  const isSupported = isSupportedSite(url as string);

  // Update the popup UI based on whether the site is supported or not
  if (!isSupported) {
    const unsupportedElement = document.querySelector(
      ".unsupported"
    ) as HTMLElement;
    if (unsupportedElement) {
      unsupportedElement.style.display = "block";
    }
  }
});
