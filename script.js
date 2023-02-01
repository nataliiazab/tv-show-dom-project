
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



// https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-300


// Add a select input which allows you to jump quickly to an episode:
// The select input should list all episodes in the format: "S01E01 - Winter is Coming"
// When the user makes a selection, they should be taken directly to that episode in the list
// Bonus: if you prefer, when the select is used, ONLY show the selected episode. 
// If you do this, be sure to provide a way for the user to see all episodes again.