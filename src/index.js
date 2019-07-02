const beerUrl = "http://localhost:3000/beers"
const beerContainer = document.querySelector("#list-group")
const beerDetailsContainer = document.querySelector("#beer-detail")


function fetchBeer(){
  fetch(beerUrl)
  .then(r => r.json())
  .then(beerData => renderBeer(beerData))
}// end of fetching list of beers

function renderBeer(beerData){
  beerData.forEach(beer =>{
    beerContainer.innerHTML += `
    <li id= ${beer.id} class="list-group-item">${beer.name}</li>
    `
  })// render lister of beers
}

beerContainer.addEventListener("click", e => {
  const beerId = e.target.id
  fetch(beerUrl +"/"+ beerId)
  .then(r => r.json())
  .then(beerInfo => renderBeerInfo(beerInfo))
})// eventlistenr for beer to show more info

function renderBeerInfo(beer){
  beerDetailsContainer.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea id= textArea>${beer.description}</textarea>
    <button data-name= ${beer.id} id="edit-beer" class="btn btn-info">
      Save
    </button>
  `
}//the rendered beer details

beerDetailsContainer.addEventListener("click", e => {
  const textArea = document.querySelector("#textArea")
  const beerId = e.target.dataset.name
  let newInput = textArea.value
  if (e.target.innerText === "Save"){
    fetch(beerUrl +"/"+ beerId, {
      method: 'PATCH',
      headers: {
            'Content-Type': 'application/json',
      Accept:  'application/json'
        },
      body: JSON.stringify({
        "description": newInput,
      }),
    })
    .then(response => response.json())
    .then(updatedData => renderBeerInfo(updatedData))
    }
})// edit the beer details

//Tried to clean it up Chuck!
fetchBeer()
