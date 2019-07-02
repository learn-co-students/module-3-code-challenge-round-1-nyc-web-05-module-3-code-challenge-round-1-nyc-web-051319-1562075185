// Fetch beers once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/beers')
  .then(response => response.json())
  .then(beers => {
    beers.forEach(beer => renderBeer(beer))
  })
})


const beerContainer = document.querySelector('#list-group')
const beerDetails = document.querySelector('#beer-detail')

// List all beers as list items under ul saved in 'beerContainer'
function renderBeer(beer) {
  beerContainer.innerHTML += `
    <li class="list-group-item" data-id=${beer.id}> ${beer.name} </li>
  `
}

// When li is clickedc fetch details of beer to display on page
beerContainer.addEventListener('click', function(e) {
  if (e.target.className === "list-group-item") {
    let beerId = e.target.dataset.id
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(response => response.json())
    .then(beer => renderBeerDets(beer))
  }
})

// Display beer details under 'beerDetails'
function renderBeerDets(beer) {
  beerDetails.innerHTML = `
    <h1> ${beer.name} </h1>
    <img src=${beer.image_url}>
    <h3> ${beer.tagline} </h3>
    <textarea> ${beer.description} </textarea>
    <button id='edit-beer' class='btn btn-info' data-id=${beer.id}>
      Save
    </button>
  `
}

// When edit button is clicked send PATCH request
beerDetails.addEventListener('click', function(e) {
  if (e.target.id === 'edit-beer') {
    let beerId = e.target.dataset.id
    editBeerDets(beerId)
  }
})

// Send PATCH request with the edited beer description
function editBeerDets(beerId) {
  const editDesc = beerDetails.querySelector('textarea').value

  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: editDesc
    })
  })
  .then(response => response.json())
  .then(beer => updateBeer(beer))
}

// Update DOM with new description
function updateBeer(beer) {
  const beerDesc = beerDetails.querySelector('textarea')
  beerDesc.innerHTML = beer.description
}
