let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppend(searchedResults) {
    console.log(searchedResults);
    let {
        title,
        link,
        description
    } = searchedResults;

    // creating reasult item 

    let resultsItem = document.createElement('div');
    resultsItem.classList.add('result-item');
    searchResultsEl.appendChild(resultsItem);

    // creating title Element

    let titleEl = document.createElement('a');
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = '_blank';
    titleEl.classList.add('result-title');
    resultsItem.append(titleEl);

    // creating break Element 

    let titleBreak = document.createElement('br');
    resultsItem.append(titleBreak);

    // creating link Element

    let linkEl = document.createElement('a');
    linkEl.textContent = link;
    linkEl.href = link;
    linkEl.target = '_blank';
    linkEl.classList.add('result-url');
    resultsItem.append(linkEl);

    //  creating break Element 

    let linkBreak = document.createElement('br');
    resultsItem.append(linkBreak);

    // creating description  Element

    let descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    descriptionEl.classList.add('link-description');
    resultsItem.append(descriptionEl);

}

function wikipediaSerachedDetails(search_results) {
    spinnerEl.classList.toggle('d-none');
    for (let result of search_results) {
        createAndAppend(result);
    }
}

function searchWikipedia(event) {
    if (event.key === 'Enter') {
        spinnerEl.classList.toggle('d-none');
        searchResultsEl.textContent = '';
        let searchValue = searchInputEl.value;
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchValue;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                wikipediaSerachedDetails(search_results);
            });

    }

}

searchInputEl.addEventListener('keydown', searchWikipedia);