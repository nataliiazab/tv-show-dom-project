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
const numberOfEpisodesShown = document.querySelector(".number-shown");

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

    // button to play the episode
    const containerForPlayButton = document.createElement("div");
    containerForPlayButton.classList.add("play-button-container");
    mainDiv.appendChild(containerForPlayButton);

    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.classList.add("play-button");
    containerForPlayButton.appendChild(playButton);

    //add event listener to play button
    playButton.addEventListener("click", () => {
      window.open(`${episode.url}`, "mozillaTab");
    });

    // run time
    const runTime = document.createElement("div");
    runTime.classList.add("run-time");
    runTime.innerHTML = "<p>Runtime: " + episode.runtime + " min" + "</p>";
    mainDiv.appendChild(runTime);
  }
}

//calling the function with all episodes
getOneEpisode(gameOfThronesEpisodes);
numberOfEpisodesShown.innerText = gameOfThronesEpisodes.length;

//search
const searchInput = document.querySelector("#searchbar");

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  rootElem.textContent = "";

  const filteredEpisodes = gameOfThronesEpisodes.filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  getOneEpisode(filteredEpisodes);
  numberOfEpisodesShown.innerText = filteredEpisodes.length;
});

// Display how many episodes match the current search
// If the search box is cleared, all episodes should be shown.

// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-200
