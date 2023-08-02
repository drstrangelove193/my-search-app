import {
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
  clearPushListener,
} from "./searchBar.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import {
  buildImageSearchResults,
  createImageSearchResults,
  deleteImageSearchResults,
} from "./imageSearch.js";

const showMoreBtn = document.getElementById("showMoreButton");

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

// declaring Global Variables
let page = 1;
let keyword = "";

const initApp = () => {
  setSearchFocus();

  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);

  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);

  // Button for image search
  const imageSearch = document.getElementById("imageSearchButton");
  imageSearch.addEventListener("click", async () => {
    showMoreBtn.style.display = "none";
    page = 1;
    deleteSearchResults();
    clearStatsLine();
    keyword = getSearchTerm();
    const results = await buildImageSearchResults(keyword, page);
    console.log(results);
    createImageSearchResults(results);
  });
};

showMoreBtn.addEventListener("click", async () => {
  page++;
  const results = await buildImageSearchResults(keyword, page);
  createImageSearchResults(results);
});

//Procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  deleteImageSearchResults();
  showMoreBtn.style.display = "none";
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

//Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
