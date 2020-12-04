'use strict';

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// search through iran.json and fetch data

const searchStates = async (searchText) => {
  const response = await fetch('../data/iran.json');
  const states = await response.json();

  // get matches to current input

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`);
    return state.province_name.match(regex) || state.county_name.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  output(matches);
};

// Show results in html

const output = (matches) => {
  if (matches.length > 0) {
    const markup = matches
      .map(
        (match) => `<div class="wrapper--result__result">
            <h3 class="wrapper--result__state">${match.city_name}</h3>
            <small>تاریخ شکل گیری شهر : ${match.city_creation_date_raw}</small>
        </div>`
      )
      .join('');

    matchList.innerHTML = markup;
  } else {
    console.warn('Enter the state!');
  }
};

search.addEventListener('input', () => searchStates(search.value));



// Copyright in console :)
const copyright = {
  author_of_iran_json: 'Tohid Arastu',
  data: 'iran.json file in his github',
  link: 'https://github.com/arastu',
};

console.table(copyright);
