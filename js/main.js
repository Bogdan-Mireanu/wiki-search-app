import { setSearchFocus, showClearTextButton, clearSearchText, clearKeyListener } from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine,  setStatsLine  } from "./searchResults.js";

document.addEventListener("readystatechange", (event) => {
  if(event.target.readyState === "complete"){
      initApp();
  }
});

const initApp = () => {
    // set the focus
    setSearchFocus();

    // 3 clear text listeners
    const search = document.querySelector("#search");
    search.addEventListener("input", showClearTextButton);
    
    const clear = document.querySelector("#clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearKeyListener);


    // submit listener
    const form = document.querySelector("#searchBar");
    form.addEventListener("submit", submitTheSearch);
}

const submitTheSearch = (event) => {
    event.preventDefault();
    // delete search results
    deleteSearchResults();
    // process the search
    processTheSearch();
    // set the focus
    setSearchFocus();
}


//process the search function

const processTheSearch = async () => {
   // clear stats line
   clearStatsLine();

   const searchTerm = getSearchTerm();
   if(searchTerm === "") return;
   const resultArray = await retrieveSearchResults(searchTerm);
   if(resultArray.length){
      buildSearchResults(resultArray)
   } 
   // set stats 
   setStatsLine (resultArray.length);
}