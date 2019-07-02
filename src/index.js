//constant variable declarations
const BEER_URL = "http://localhost:3000/beers"
const beerListContainer = document.querySelector("#list-group")
const listContainer = document.querySelector(".col-md-4")
const beerDetailContainer = document.querySelector("#beer-detail")


document.addEventListener("DOMContentLoaded", startUpSite())

//callback fn called upon page load
function startUpSite(){
  fetch(BEER_URL)
  .then(resp => resp.json())
  .then(beerObjects => listBeer(beerObjects))
  .then(startupEventListeners())
}

//lists all of the beer names retrieved from the API on DOM
function listBeer(beerObjects){
  beerObjects.forEach(beer => {
    beerListContainer.innerHTML += `
      <li class="list-group-item" id="${beer.id}">${beer.name}</li>
      `
  })
}

//invokes all addEventListeners on page
function startupEventListeners(){
  listContainer.addEventListener('click', (e) => {
    if (e.target.className === "list-group-item") {
      displayBeerItem(e.target.id)
    }
  })
  beerDetailContainer.addEventListener('click', (e) => {
    if (e.target.id === "edit-beer") {
      editBeerDesc(e)
    }
  })
}

//When you click beer name, the application reveals more info about that particular beer on DOM
function displayBeerItem(id) {
  fetch(`${BEER_URL}/${id}`)
  .then(resp => resp.json())
  .then(beerObj => slapBeerOnDom(beerObj))
}

//callback fn to render info about particular beer on DOM
function slapBeerOnDom(beerObj){
  beerDetailContainer.innerHTML = `
    <h1>${beerObj.name}</h1>
    <img src="${beerObj.image_url}">
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <p hidden>${beerObj.id}</p>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>
  `
}

//edit beer description when Save button is clicked
function editBeerDesc(event){
  //previous element is a hidden p tag with innerText of the beer ID
  const beerId = event.target.previousElementSibling.innerText
  const beerDesc = event.target.parentElement.querySelector("textarea")
  const updatedDesc = beerDesc.value
  fetch(`${BEER_URL}/${beerId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      description: updatedDesc
    })
  })
  .then(resp => resp.json())
  .then(updatedBeerObj => beerDesc.innerText = updatedBeerObj.description)
}


// CODE BEFORE REFACTORING:
// document.addEventListener("DOMContentLoaded", () => {
//
//   const beerListContainer = document.querySelector("#list-group")
//   const listContainer = document.querySelector(".col-md-4")
//   const beerDetailContainer = document.querySelector("#beer-detail")
//
//   fetch(BEER_URL)
//   .then(resp => resp.json())
//   .then(json => {
//     json.forEach((beer) => {
//     beerListContainer.innerHTML += `
//     <li class="list-group-item" id="${beer.id}">${beer.name}</li>
//     `})
//   })
//
//   listContainer.addEventListener('click', (e) => {
//     if (e.target.className === "list-group-item") {
//       fetch(`${BEER_URL}/${e.target.id}`)
//       .then(resp => resp.json())
//       .then(json => {
//         beerDetailContainer.innerHTML = `
//         <h1>${json.name}</h1>
//         <img src="${json.image_url}">
//         <h3>${json.tagline}</h3>
//         <textarea>${json.description}</textarea>
//         <p hidden>${json.id}</p>
//         <button id="edit-beer" class="btn btn-info">
//           Save
//         </button>
//         `
//       })//end of fetch & then functions
//     }//end of if statement
//   })//end of eventlistener
//
//   beerDetailContainer.addEventListener('click', (e) => {
//     if (e.target.id === "edit-beer") {
//       const beerId = e.target.previousElementSibling.innerText
//       fetch(`${BEER_URL}/${beerId}`, {
//         method: "PATCH",
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         body: JSON.stringify({
//           description: e.target.parentElement.querySelector("textarea").value
//         })
//       })//end of fetch
//       .then(resp => resp.json())
//       .then(json => {
//         e.target.parentElement.querySelector("textarea").innerText = json.description
//       })
//
//
//     }//end of if statement
//   })//end of eventlistener
//
// })//end of DOMContentLoaded eventlistener
