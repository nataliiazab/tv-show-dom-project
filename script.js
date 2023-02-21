const numberOfEpisodesShown = document.querySelector(".number-shown");

let tvShows = []; //all the TV shows from fetch

//setup for calling all the functions with fetch
async function setup() {
  try {
    let fetchShows = await fetchAllShows();
    getTVShowsCovers(fetchShows);
    searchEpisode(fetchShows);
    selectShow(fetchShows);
  } catch (error) {
    console.error("An error occurred in setup function:", error);
  }
}

//fetching one TV show(at the beginning it is GoT)
let fetchOneShow = async (id) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Check fetchOneShow function", error);
  }
};

//fetching all the shows
const fetchAllShows = async () => {
  try {
    let response = await fetch("https://api.tvmaze.com/shows");
    let data = await response.json();
    tvShows = data;
    return data;
  } catch (error) {
    console.error("Check fetchAllShows function", error);
  }
};

//function for one div of an episode
let rootElem = document.getElementById("root");

//cut summary if too long
function cutSummary(episode) {
  return episode.summary.length > 400
    ? episode.summary.slice(0, 400) + "..."
    : episode.summary;
}

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
    episodeSummary.innerHTML = cutSummary(episode);
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
function selectOneEpisode(allEpisodes) {
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

//add all TV shows - level 400

function selectShow(allshows) {
  const seriesSelect = document.querySelector("#TVshows");

  for (let show of allshows) {
    let newSeries = document.createElement("option");
    newSeries.innerHTML = show.name;
    seriesSelect.appendChild(newSeries);
  }

  seriesSelect.addEventListener("change", async (event) => {
    try {
      const selectShow = event.target.value;
      rootElem.textContent = "";

      let selectedShow = tvShows.find((data) => data.name === selectShow);
      let id = selectedShow.id;
      let newfetch = await fetchOneShow(id);

      //calling function with other functions as in setup
      getOneEpisode(newfetch);
      selectOneEpisode(newfetch);
      numberOfEpisodesShown.innerText = newfetch.length;
      searchEpisode(newfetch);
      selectOneEpisode(newfetch);
    } catch (error) {
      console.log("Check eventListener from selectShow function", error);
    }
  });
}

//add images of shows to the page - level 500 - https://syllabus.codeyourfuture.io/js-core-3/tv-show-dom-project/level-500

function createElement(type, className, appendElement) {
  const el = document.createElement(type);
  el.classList.add(className);
  appendElement.appendChild(el);
  return el;
}

function getTVShowsCovers(allShows) {
  for (let show of allShows) {
    //main div for one show
    let mainDiv = createElement("div", "episode", rootElem);

    //title for the show

    let title = createElement("h1", "episode-title", mainDiv);
    title.textContent = show.name;

    // container for show image

    let divForEpisodeImage = createElement(
      "div",
      "episode-image-container",
      mainDiv
    );

    // show image

    let episodeImage = createElement(
      "img",
      "episode-image",
      divForEpisodeImage
    );

    episodeImage.src = show.image.medium;
    episodeImage.alt = show.name;

    // show summary
    const episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = cutSummary(show);
    episodeSummary.classList.add("episode-summary");
    mainDiv.appendChild(episodeSummary);

    // button to open the episodes of the show
    const containerForPlayButton = document.createElement("div");
    containerForPlayButton.classList.add("play-button-container");
    mainDiv.appendChild(containerForPlayButton);


    const playButton = document.createElement("button");
    playButton.textContent = "Go to episodes";
    playButton.classList.add("play-button");
    playButton.id = "open-episodes";
    //for Event Listener below
    playButton.name = show.name;

    containerForPlayButton.appendChild(playButton);

    const openEpisodes = document.querySelector("#open-episodes");
    //add event listener to play button
    openEpisodes.addEventListener("click", async (event) => {
      // console.log("its working");


      //the function repeats, to - dry
      //abstract 
      try {
        let selectShow = event.target.name;
        console.log(event); // fix this
        rootElem.textContent = "";

        let selectedShow = tvShows.find((data) => data.name === selectShow);
        console.log(selectedShow);
        let id = selectedShow.id;
        console.log(id);
        let newfetch = await fetchOneShow(id);

        //calling function with other functions as in setup
        getOneEpisode(newfetch);
        selectOneEpisode(newfetch);
        numberOfEpisodesShown.innerText = newfetch.length;
        searchEpisode(newfetch);
        selectOneEpisode(newfetch);
      } catch (error) {
        console.log(
          "Check eventListener from getTVShowsCovers function",
          error
        );
      }
    });

    // run time
    const runTime = document.createElement("div");
    runTime.classList.add("run-time");
    runTime.innerHTML = "<p>Runtime: " + show.runtime + " min" + "</p>";
    mainDiv.appendChild(runTime);

    // //
    // const episodeRating = show.rating.average;
    // const episodeRatingDiv = document.createElement("p");
    // episodeRatingDiv.innerHTML = `Rating: ${episodeRating}`;
    // section.appendChild(episodeRatingDiv);
    // //genres
    // const episodeGenre = show.genres;
    // const episodeGenresDiv = document.createElement("p");
    // episodeGenresDiv.innerHTML = `Genres: ${episodeGenre}`;
    // //  episodeGenresDiv.innerHTML = `Genres: ${episodeGenre.replace(/,/g, ", ")}`;
    // section.appendChild(episodeGenresDiv);
  }
}

window.onload = setup;
