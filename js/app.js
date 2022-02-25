'use strict';

// GLOBAL VARIABLES

let votesAllowed = 25;
let allProducts = [];

// DOM REFERENCES

let prodContainer = document.getElementById('prod-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('view-results-btn');
let showResults = document.getElementById('display-results-list');

// CONSTRUCTOR FUNCTION

function Prod(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `./img/${name}.${fileExtension}`;

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

function renderImgs() {
  let prodOneIndex = getRandomIndex();
  let prodTwoIndex = getRandomIndex();
  let prodThreeIndex = getRandomIndex();

  while(prodOneIndex === prodTwoIndex) {
    prodTwoIndex = getRandomIndex();
  }
  while(prodOneIndex === prodThreeIndex || prodTwoIndex === prodThreeIndex) {
    prodThreeIndex = getRandomIndex();
  }

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
  }
}

// 'view results' button

function handleViewResults(event) {

  if(votesAllowed === 0) {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times, and was voted for ${allProducts[i].clicks} times.`;
      showResults.appendChild(li);
    }
  }
}

// Grab input/events to listen to

prodContainer.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleViewResults);


