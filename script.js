const numberOfEpisodesShown = document.querySelector(".number-shown");

let tvShows = [];

//setup for calling all the functions with fetch
async function setup() {
  let fetchEpisodes = await fetchOneShow(82);
  console.log(fetchEpisodes); //number was just added
  let fetchShows = await fetchTVshows();
  //calling the function with all episodes
  getOneEpisode(fetchEpisodes);
  checkEpisodes(fetchEpisodes);
  numberOfEpisodesShown.innerText = fetchEpisodes.length;
  searchEpisode(fetchEpisodes);
  checkEpisodes(fetchEpisodes);
  addTVshows(fetchShows);
}

//fetching one TV show(now its GoT)
let fetchOneShow = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const data = await response.json();
  return data;
};

//fetching all the shows
const fetchTVshows = async () => {
  let response = await fetch("https://api.tvmaze.com/shows");
  let data = await response.json();
  tvShows = data;
  return data;
};

//function for one div of an episode
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

    //cut summary if too long
    const summary =
      episode.summary.length > 400
        ? episode.summary.slice(0, 400) + "..."
        : episode.summary;
      
    episodeSummary.innerHTML = summary 
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

//search for an episode
const searchInput = document.querySelector("#searchbar");

function searchEpisode(episodeList) {
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // console.log(searchTerm);
    rootElem.textContent = "";

    const filteredEpisodes = episodeList.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    getOneEpisode(filteredEpisodes);
    numberOfEpisodesShown.innerText = filteredEpisodes.length;
  });
}

//input to choose an episode
function checkEpisodes(allEpisodes) {
  const episodeSelect = document.querySelector("#select-input");

  //delete all previous options
episodeSelect
  .querySelectorAll("option:not(#show-all-episodes)")
  .forEach((option) => option.remove());
  for (let episode of allEpisodes) {
   
    let newEpisode = document.createElement("option");
    
    newEpisode.innerHTML = `S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")} ${episode.name}`;

    episodeSelect.appendChild(newEpisode);
  }

  episodeSelect.addEventListener("change", (event) => {
    const selectedEpisode = event.target.value;
    rootElem.textContent = "";
    const myTitle = selectedEpisode.slice(7);

    if (selectedEpisode === "Show all episodes") {
      getOneEpisode(allEpisodes);
      numberOfEpisodesShown.innerText = allEpisodes.length;
    } else {
      const filteredEpisodes = allEpisodes.filter((episode) => {
        return episode.name.includes(myTitle);
      });
      getOneEpisode(filteredEpisodes);
      numberOfEpisodesShown.innerText = filteredEpisodes.length;
    }
  });
}

//add TV shows - level 400

function addTVshows(allshows) {
  const seriesSelect = document.querySelector("#TVshows");

  for (let show of allshows) {
    let newSeries = document.createElement("option");
    newSeries.innerHTML = show.name;

    seriesSelect.appendChild(newSeries);
  }

  seriesSelect.addEventListener("change", async (event) => {
    // console.log(tvShows);
    const selectShow = event.target.value;
    rootElem.textContent = "";
    let myTitle = selectShow;

    let selectedShow = tvShows.find((data) => data.name === selectShow);
    console.log(selectedShow);
    let id = selectedShow.id;
    // console.log(id)

    let newfetch = await fetchOneShow(id);
    console.log(newfetch);
    getOneEpisode(newfetch);
    checkEpisodes(newfetch);
    numberOfEpisodesShown.innerText = newfetch.length;
    searchEpisode(newfetch);
    checkEpisodes(newfetch);
  });
}
window.onload = setup;
