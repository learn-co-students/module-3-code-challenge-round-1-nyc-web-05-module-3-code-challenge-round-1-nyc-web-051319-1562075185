// ---- VARIBLES ----
const beersURL = 'http://localhost:3000/beers'
const beerListGroup = document.querySelector('.list-group')
const beerDetailsDiv = document.querySelector('#beer-detail')

// ---- FETCH REQUESTS ----
// fetch and GET all beers for sidebar
fetch(beersURL)
  .then(function(response){
    return response.json()
  })
  .then(function(beers){
    beers.forEach(function(beer){
      appendBeerToDom(beer)
    })
  })
// fetch and GET beer details
function beerDetailsFetch(beer){
  fetch(`${beersURL}/${beer.id}`)
    .then(function(response){
      return response.json()
    })
    .then(function(beer){
      appendBeerDetailsToDom(beer)
    })
}
// fetch and PATCH beer description
function patchBeerDescription(beer, newDescription){
  fetch(`${beersURL}/${beer.id}`, {
    method: 'PATCH',
    headers:  {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: newDescription
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(beer){
    console.log(beer)
  })
}

// ---- HELPER FUNCTIONS ----
// append beer list to the DOM
function appendBeerToDom(beer){
  beerListGroup.innerHTML += `
    <li class="list-group-item" id="${beer.id}">${beer.name}</li>
  `
}
// append beer details to the DOM
function appendBeerDetailsToDom(beer){
  beerDetailsDiv.innerHTML = `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
    <textarea id="${beer.id}">${beer.description}</textarea>
  <button id="${beer.id}" class="btn btn-info">
    Save
  </button>
  `
}
// add event listener to beer list to GET details
function beerDetailsBtn(){
  beerListGroup.addEventListener('click', function(e){
    const beer = e.target
    beerDetailsFetch(beer)
  })
}
// add event listener to SAVE button to PATCH description
function beerSaveBtn(){
  beerDetailsDiv.addEventListener('click', function(e){
    if (e.target.innerText === 'Save'){
        const beer = e.target
        const newDescription = document.querySelector(`textarea[id='${beer.id}']`).innerHTML
        patchBeerDescription(beer, newDescription)
    }
  })
}

// INVOKE FUNCTIONS
beerDetailsBtn()
beerSaveBtn()
