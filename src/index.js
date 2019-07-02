document.addEventListener('DOMContentLoaded', getBeers)

function getBeers() {
  fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(beers => renderBeers(beers))
  .then(addEventListenersToList)
}

function renderBeers(beers) {
  beers.forEach(beer => addBeerToSide(beer))
}

const beerList = document.querySelector('#list-group')

function addBeerToSide(beer) {
  beerList.innerHTML += `
  <li class="list-group-item" id="${beer.id}">${beer.name}</li>
  `
}

const beerDetail = document.querySelector('#beer-detail')

function addEventListenersToList() {
  beerList.addEventListener('click', (e) => {
    fetch(`http://localhost:3000/beers/${e.target.id}`)
    .then(resp => resp.json())
    .then(beer => addBeerDetail(beer))
  })

  beerDetail.addEventListener('click', (e) => {
    if (e.target.className === "btn btn-info") {
      const beerId = e.target.id.split('-')[2]
      const configPatch = {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: `${e.target.previousSibling.previousSibling.value}`
        })
      }
      fetch(`http://localhost:3000/beers/${beerId}`, configPatch)
    }
  })
}

function addBeerDetail(beer) {
  beerDetail.innerHTML = `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer-${beer.id}" class="btn btn-info">
  Save
  </button>
  `
}
