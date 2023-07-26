# TV Show DOM Project

Welcome to the TV Show Project! This project is a simple web application that allows users to browse and search for TV show episodes. It fetches data from the TVmaze API and displays episodes' information, such as titles, summaries, images, and runtime. Users can search for specific episodes by name or keyword, and they can also filter episodes by TV show.

## Getting Started

To get started with this project, follow the steps below:

1. Clone the repository: [Link to the Repository](https://github.com/nataliiazab/tv-show-dom-project)
2. Open the `index.html` file in your web browser.

## Tech Stack
1. HTML: The project uses HTML to structure the web application and create the user interface.
2. CSS: CSS is utilized for styling the elements and providing a visually appealing layout.
3. JavaScript (DOM Manipulation): The core functionality of the project is implemented using JavaScript with a focus on DOM manipulation. It handles fetching data from the TVmaze API, creating and rendering episodes dynamically on the page, and managing user interactions.

## Project Structure

The project consists of three main components:

1. `script.js`: This file contains all the JavaScript code responsible for fetching data from the TVmaze API, creating and rendering the episodes on the page, and handling user interactions such as searching and filtering episodes.

2. `style.css`: This file contains the CSS styling for the web application. It defines the layout and appearance of the episodes and other elements on the page.

3. `index.html`: This is the main HTML file that includes the necessary JavaScript and CSS files and provides the basic structure of the web application.

## Functions

### `setup()`

This function is the entry point of the application. It fetches all TV shows from the TVmaze API and sets up the event listeners for searching and filtering episodes. It also calls other functions to display the TV show covers and the episodes.

### `fetchAllShows()`

This async function fetches all the TV shows from the TVmaze API and stores them in the `tvShows` array.

### `fetchOneShow(id)`

This async function fetches the episodes of a specific TV show by its ID from the TVmaze API.

### `getOneEpisode(allEpisodes)`

This function takes an array of episodes as input and dynamically creates the HTML elements to display each episode's information, including title, episode number, image, summary, and a button to play the episode.

### `cutSummary(episode)`

This function cuts the summary of an episode if it exceeds 400 characters and appends "..." at the end.

### `searchEpisode(episodeList)`

This function sets up the event listener for the search input box and filters the episodes based on the user's search term. It updates the displayed episodes and the count of episodes shown.

### `selectOneEpisode(allEpisodes)`

This function populates the episode selection dropdown with all episodes of the selected TV show. It also filters the episodes when a specific episode is selected from the dropdown.

### `getTVShowsCovers(allShows)`

This function displays the covers of all TV shows by creating HTML elements dynamically. It also sets up an event listener for each cover, allowing users to view the episodes of the selected TV show.

### `selectShow(allshows)`

This function populates the TV show selection dropdown with all available TV shows. When a TV show is selected from the dropdown, it fetches and displays the episodes of the selected TV show.

## Usage

1. Open the `index.html` file in your web browser.
2. The page will display all TV show covers along with their titles and summaries.
3. Use the search bar to search for specific episodes by their name or keywords. The displayed episodes will be filtered based on your search.
4. Use the "Choose an episode" dropdown to select a specific TV show and view its episodes. You can also select "Show all episodes" to see all episodes again.
5. Use the "Choose TV series" dropdown to view the episodes of a specific TV show by selecting it from the dropdown.
6. Click on the "Go to episodes" button on each TV show cover to view the episodes of that show.

## Contributing

If you would like to contribute to this project, please follow the standard GitHub fork and pull request workflow. You can submit bug fixes, feature enhancements, or any improvements to the existing codebase.

## Contact

If you have any questions, feel free to reach out to the developer, Natalie Zablotska, via her LinkedIn profile: [Natalie's LinkedIn](https://www.linkedin.com/in/nataliia-zablotska/).

## Acknowledgments

The data for this project comes from [TVmaze](https://www.tvmaze.com/). A big thank you to the CYF community for creating such an interesting challenge to learn DOM! 
