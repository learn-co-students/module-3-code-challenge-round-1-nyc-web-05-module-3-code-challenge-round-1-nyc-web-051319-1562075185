const BASE_URL = "http://localhost:3000/beers"
// const BEER_URL =  `${BASE_URL}/${beerObjects.id}`

document.addEventListener('DOMContentLoaded', getEverything)

const listGroup = document.querySelector("#list-group")

const beerDetail = document.querySelector("#beer-detail")

function getEverything() {
  fetch(BASE_URL)
    .then(resp => resp.json())
    .then(beerObjects => renderBeers(beerObjects))
    // .then(addAllEventListenersToPage())
}

function renderBeers(beers) {
	beers.forEach(beer => addSingleBeerToPage(beer))
}

function addSingleBeerToPage(beerObject) {
	listGroup.innerHTML += `
		<li id=${beerObject.id} class="list-group-item">${beerObject.name}</li>
	`
}

listGroup.addEventListener('click', (e) => {
	const beerId = e.target.id
	getSingleBeer(beerId)
})

beerDetail.addEventListener('click', (e) => {
	if (e.target.innerText === 'Save') {
		saveBeerChanges(e)
	}
})

function getSingleBeer(beerId){
	fetch(`${BASE_URL}/${beerId}`)
	.then(resp => resp.json())
	.then(beerData => {
		 beerDetail.innerHTML = `
		<div id="beer-detail">
			<h1>${beerData.name}</h1>
			<img src="${beerData.image_url}" alt="beer image">
			<h3>${beerData.tagline}</h3>
			<textarea>${beerData.description}</textarea>
			<p hidden>${beerData.id}</p>
			<button data-id=${beerData.id} id="edit-beer" class="btn btn-info">
			  Save
			</button>
		</div>
		`
	})
}

function saveBeerChanges(e){
	fetch(`${BASE_URL}/${e.target.previousElementSibling.innerText}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			description: e.target.parentElement.querySelector('textarea').value
		})
	})
		.then(resp => resp.json())
		.then(beerObject => {
			 e.target.parentElement.querySelector('textarea').innerText = beerObject.description
		 })
}

// function addAllEventListenersToPage() {
// 	document.addEventListener('click', (e) => {
// 		const beerId = e.target.id
// 		if (e.target.innerText != "Save") {
// 			getSingleBeer(beerId)
// 			// addBeerDetailToPage(e.target.dataset.beerID, e)
// 		}
// //ran out of time ti fix. Need to connect event listener of clicking on beerObject.name to associated beer in addBeerDetailToPage
// //e.target is save button
// 		else if (e.target.innerText === 'Save') {
// 			saveBeerChanges(e)
// 		}
// 	})
// }

// document.addEventListener("click", function(){
//   console.log("I don't do anything! LOLOLOL");
// });

//need eventlistener for <button id="edit-beer" class="btn btn-info"> to save changes to description

//structure:
//<h1>Beer Name</h1>
// <img src="<add beer img url here>">
// <h3>Beer Tagline</h3>
// <textarea>Beer Description</textarea>
// <button id="edit-beer" class="btn btn-info">
//   Save
// </button>

		//save not working, probably need to reassign innerHTML of description but out of time
//

// function addBeerDetailToPage(beerObject, e) {
// //forgot to pass in e
// 	beerDetail.innerHTML += `
// 		<div id="beer-detail">
// 			<h1>${beerObject.name}</h1>
// 			<img src="${beerObject.image_url}" alt="beer image">
// 			<h3>${beerObject.tagline}</h3>
// 			<textarea>${beerObject.description}</textarea>
// 			<p hidden>${beerObject.id}</p>
// 			<button id="edit-beer" class="btn btn-info">
// 			  Save
// 			</button>
// 		</div>
// 		`
// }

// function saveBeerChanges(){
//
// }
