//You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;

// }

// window.onload = setup;

let gameOfThronesEpisodes = getAllEpisodes();

let rootElem = document.getElementById("root");

function getOneEpisode(allEpisodes) {
  for (let episode of allEpisodes) {
    //main div for one episode
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("episode");
    rootElem.appendChild(mainDiv);

    //title for the episode
    const title = document.createElement("h1");
    title.classList.add("episode-title");
    title.textContent = episode.name;
    mainDiv.appendChild(title);

    //episode number
    const episodeNumber = document.createElement("h2");
    episodeNumber.textContent = `S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")}`;
    episodeNumber.classList.add("episode-number");
    mainDiv.appendChild(episodeNumber);

    // container for episode image
    const divForEpisodeImage = document.createElement("div");
    divForEpisodeImage.classList.add("episode-image-container");
    mainDiv.appendChild(divForEpisodeImage);

    // episode image
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.alt = episode.name;
    episodeImage.classList.add("episode-image");
    divForEpisodeImage.appendChild(episodeImage);

    // episode summary
    const episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episode-summary");
    mainDiv.appendChild(episodeSummary);
    // mainDiv.appendChild(document.createElement("br"));
  }
}

getOneEpisode(gameOfThronesEpisodes);

const footer = document.createElement("footer");
document.querySelector("body").appendChild(footer);
const footerLink = document.createElement("a");
footerLink.href = "https://www.tvmaze.com/";
footerLink.target = "_blank";
footerLink.textContent = "© TVmaze.com";
footer.appendChild(footerLink);



// Add a "live" search input:
// Only episodes whose summary OR name contains the search term should be displayed
// The search should be case-insensitive
// The display should update immediately after each keystroke changes the input.
// Display how many episodes match the current search
// If the search box is cleared, all episodes should be shown.

// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-200
