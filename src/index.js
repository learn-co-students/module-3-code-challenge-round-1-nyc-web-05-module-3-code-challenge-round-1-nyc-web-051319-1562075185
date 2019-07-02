	const BASE_URL = "http://localhost:3000/beers"
	// const BEER_URL =  `${BASE_URL}/${beerObjects.id}`

	document.addEventListener('DOMContentLoaded', getEverything)

	const listGroup = document.querySelector("#list-group")

	const beerDetail = document.querySelector("#beer-detail")

	function getEverything() {
	  fetch(BASE_URL)
	    .then(resp => resp.json())
	    .then(beerObjects => renderBeers(beerObjects))
	    // .then(addAllEventListenersToPage)
	}

function renderBeers(beers) {
	beers.forEach(beer => addSingleBeerToPage(beer))
	beers.forEach(beer => addBeerDetailToPage(beer))
}
//just called addBeerDetailToPage(beer) fuction so it renders on page cause I ran out of time!!!

function addSingleBeerToPage(beerObject) {
	listGroup.innerHTML += `
	<div class='col-md-4'>
		 <ul class="list-group" id="list-group">
			 <li class="list-group-item">${beerObject.name}</li>
		 </ul>
	 </div>
	`
}

function addAllEventListenersToPage() {
	listGroup.addEventListener('click', (e) => {
		if (e.target.innerText === `${beerObject.name}`) {
			addBeerDetailToPage(e.target.dataset.beerID, e)
		}
//ran out of time ti fix. Need to connect event listener of clicking on beerObject.name to associated beer in addBeerDetailToPage
		if (e.target.innerText === 'Save') {
			saveBeerChanges(e.target.dataset.beerId)
		}
	})
}

document.addEventListener("click", function(){
  console.log("I don't do anything! LOLOLOL");
});

//need eventlistener for <button id="edit-beer" class="btn btn-info"> to save changes to description

function saveBeerChanges(beerObject, e) {
	fetch(`${BASE_URL}/${beerObjects.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({
			description: `${beerObject.description}`
		})
	})
		.then(resp => resp.json())
		.then(beerObject => addBeerDetailToPage(beerObject, e))
		//save not working, probably need to reassign innerHTML of description but out of time
}
//

function addBeerDetailToPage(beerObject) {
	beerDetail.innerHTML += `
	<div id="beer-detail">
		<h1>${beerObject.name}</h1>
		<img src="${beerObject.image_url}" alt="beer image">
		<h3>${beerObject.tagline}</h3>
		<textarea>${beerObject.description}</textarea>
		<button id="edit-beer" class="btn btn-info">
		  Save
		</button>
	</div>
	`
}

// function saveBeerChanges(){
//
// }
