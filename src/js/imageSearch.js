const imageSearchResults = document.getElementById("imageSearchResults");
const showMoreBtn = document.getElementById("showMoreButton");

export const deleteImageSearchResults = () => {
  const parentElement = document.getElementById("imageSearchResults");
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildImageSearchResults = async (keyword, page) => {
  if (keyword === "") return;

  if (page === 1) {
    imageSearchResults.innerHTML = "";
  }

  return await fetch(
    `/.netlify/functions/fetch-unsplash?keyword=${keyword}&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const createImageSearchResults = (results) => {
  if (results.length === 0) {
    const statLine = document.getElementById("stats");
    statLine.textContent = "Sorry, No results"
  } else {
    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";

      imageLink.appendChild(image);
      imageSearchResults.appendChild(imageLink);
    });
    showMoreBtn.style.display = "block";
  }
};
