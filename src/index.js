document.addEventListener('DOMContentLoaded', beers);

function beers(){
  fetch("http://localhost:3000/beers")
  .then(resp => resp.json())
  .then(beers => {
    addBeersToDom(beers)
  })
}


function addBeersToDom(beers){
    const beerList = document.querySelector(".list-group")
    beers.map(beers => {
      const beerLI = document.createElement("li")
      beerLI.className = "list-group-item"
      beerLI.id = beers.id
       beerLI.innerHTML +=
      `
        ${beers.name}
        ${beerEventListener(beerLI, beers.id)}
      `
      beerList.appendChild(beerLI)
    })
}

function beerEventListener(beers,beersID){
  beers.addEventListener('click',function(e){
    fetch("http://localhost:3000/beers"+"/"+beersID)
    .then(resp => resp.json())
    .then(beer => {
      addInformationToDom(beer, beer.id)
    })
    .then(button => {
      editBeerButton()
    })
  })
}

function addInformationToDom(beer, beerID){
  const beerDetail = document.querySelector("#beer-detail")
  beerDetail.dataset.id = beerID
  beerDetail.innerHTML =
  `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id = "description">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
  Save
  </button>
  `
}


function editBeerButton(){
  const button = document.querySelector("#edit-beer")
  button.addEventListener('click', function(e){
    const decription = document.querySelector("#description")
    // debugger
    fetch("http://localhost:3000/beers"+"/"+e.target.parentElement.dataset.id,{
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "description": e.target.previousSibling.previousElementSibling.value
      })
    })
    .then(resp => resp.json())
    .then(decription => {
      e.target.previousSibling.previousElementSibling.innerHTML = e.target.previousSibling.previousElementSibling.value
    })

  })
}
