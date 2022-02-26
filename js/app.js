'use strict';

// GLOBAL VARIABLES

let votesAllowed = 25;
let allProducts = [];

// DOM REFERENCES

let prodContainer = document.getElementById('prod-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
/*
let resultsBtn = document.getElementById('view-results-btn');
let showResults = document.getElementById('display-results-list');
*/
// canvas element for chart.js
let ctx = document.getElementById('prod-chart');
//let ctx2 = document.getElementById('prod2-chart');

/*function getProdFave(clicks, views) {
  return Math.round((clicks/views)*100);
}*/

// CONSTRUCTOR FUNCTION

function Prod(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `./img/${name}.${fileExtension}`;
 // this.fave = getProdFave(this.clicks, this.views);

  allProducts.push(this);
}

// INSTANTIATE OBJECTS

new Prod('sweep', 'png');
new Prod('bag');
new Prod('banana');
new Prod('bathroom');
new Prod('boots');
new Prod('breakfast');
new Prod('bubblegum');
new Prod('chair');
new Prod('cthulhu');
new Prod('dog-duck');
new Prod('dragon');
new Prod('pen');
new Prod('pet-sweep');
new Prod('scissors');
new Prod('shark');
new Prod('tauntaun');
new Prod('unicorn');
new Prod('water-can');
new Prod('wine-glass');

console.log(allProducts);

// MATH FUNCTION TO GENERATE RANDOM ALLPRODUCTS ARRAY INDEX

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// FUNCTION TO RENDER THREE RANDOM IMAGES

let randomIndexes = [];

function renderImgs() {
  while (randomIndexes.length < 6) {
    let randomNum = getRandomIndex();
    while (!randomIndexes.includes(randomNum)) {
      randomIndexes.push(randomNum);
    }
  }
  
  let prodOneIndex = randomIndexes.shift();
  let prodTwoIndex = randomIndexes.shift();
  let prodThreeIndex = randomIndexes.shift();

  imgOne.src = allProducts[prodOneIndex].src;
  imgOne.alt = allProducts[prodOneIndex].name;
  allProducts[prodOneIndex].views++;

  imgTwo.src = allProducts[prodTwoIndex].src;
  imgTwo.alt = allProducts[prodTwoIndex].name;
  allProducts[prodTwoIndex].views++;

  imgThree.src = allProducts[prodThreeIndex].src;
  imgThree.alt = allProducts[prodThreeIndex].name;
  allProducts[prodThreeIndex].views++;
}

renderImgs();

// EVENT LISTENERS

// clicks

function handleClick(event) {
  votesAllowed--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (imgClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderImgs();

  if(votesAllowed === 0) {
    prodContainer.removeEventListener('click', handleClick);

    renderChart1();
  //  renderChart2();
  }
}

// CHART RENDERING

function renderChart1() {
  let prodNames = [];
  let prodClicks = [];
  let prodViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    prodNames.push(allProducts[i].name);
    prodClicks.push(allProducts[i].clicks);
    prodViews.push(allProducts[i].views);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Clicks',
        data: prodClicks,
        backgroundColor: [
          'purple'
        ],
        borderColor: [
          'purple'
        ],
        borderWidth: 1,
        hoverBorderColor: 'black'
      },
      {
        label: '# of Views',
        data: prodViews,
        backgroundColor: [
          'green'
        ],
        borderColor: [
          'green'
        ],
        borderWidth: 1
      },]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const prodChart = new Chart(ctx, chartObject);
}

/*function renderChart2() {
  let prodNames = [];
  let prodClicks = [];
  let prodViews = [];

  let prodFavInd = [];

  for (let i = 0; i < allProducts.length; i++) {
    prodNames.push(allProducts[i].name);
    prodClicks.push(allProducts[i].clicks);
    prodViews.push(allProducts[i].views);
    prodFavInd.push(allProducts[i].fave);

  }

  let chartObject2 = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: 'Favorability Index',
        data: prodFavInd,
        backgroundColor: [
          'purple'
        ],
        borderColor: [
          'purple'
        ],
        borderWidth: 1,
        hoverBorderColor: 'black'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const prodChart = new Chart(ctx2, chartObject2);
}*/
prodContainer.addEventListener('click', handleClick);



