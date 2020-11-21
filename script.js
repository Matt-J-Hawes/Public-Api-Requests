/**********************************************************************************
*                                                                                 * 
*                                                                                 *
*                       TREEHOUSE TECHDEGREE - UNIT 5                             *
*                             Public API Requests                                 *
*                                                                                 *
*                                 Matt Hawes                                      *
*                                                                                 *
/**********************************************************************************/


//GLOBAL VARIABLES
const body = document.querySelector('body')
const gallerySection = document.getElementById('gallery')
const modalSelection = document.createElement('div')
modalSelection.className = 'modal-container'
const errorMessage = document.createElement('h1')



//FETCH API AND PARSE IT TO JSON - SUCCESS : FAILURE
fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => {

	generateHTML(data.results)
    generateModal(data.results)


    let modal = modalSelection.querySelectorAll('.modal')
    let cards = document.querySelectorAll('.card')
    

    for(let x = 0; x < cards.length; x++){
    	cards[x].addEventListener('click', function(){
    		gallerySection.appendChild(modalSelection)
    	})
    }
})


.catch(systemFail)

//FUNCTION TO DISPLAY ERROR MESSAGE IF THERE IS A SIGNAL PROBLEM 
//FUNCTION CREATED EXTERNALLY FOR POSSIBLE REUSE
function systemFail(error){
	gallerySection.appendChild(errorMessage)
	errorMessage.innerHTML = "Trouble connecting with API! Please try again later."
	console.log(error, "Trouble connecting with API") }

//IF API IS SUCCESSFULLY FETCHED - THIS FUNCTION DISPLAYS IT TO THE PAGE
function generateHTML(data){
const users = data.map(user =>  

		`<div class="card">
			<div class="card-img-container">
			<img class="card-img" src="${user.picture.large}" alt="profile picture">
			</div>
			<div class="card-info-container">
			<h3 id="name" class="card-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
			<p class="card-text">${user.email}</p>
			<p class="card-text cap">${user.location.city}, ${user.location.state}</p>
		</div></div>`)

gallerySection.insertAdjacentHTML('beforeend', users.join('')) 

}

//CREATE MODAL WINDOWS (HIDDEN BY DEFAULT)
function generateModal(data){
     const html = data.map(person => 

	       `
	       <div class="modal">
	            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
	            <div class="modal-info-container">
	                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
	                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
	                <p class="modal-text">${person.email}</p>
	                <p class="modal-text cap">${person.location.city}</p>
	                <hr>
	                <p class="modal-text">${person.phone}</p>
	                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city} OR ${person.location.postcode}</p>
	                <p class="modal-text">Birthday: ${person.dob.date.slice(5,7)}-${person.dob.date.slice(8,10)}-${person.dob.date.slice(0,4)}</p>
	            </div>
	        </div>`)

     modalSelection.insertAdjacentHTML('beforeend', html)
     
    }


//EVENT-LISTENER TO REMOVE MODEL WINDOW 
modalSelection.addEventListener('click', function(e){
	gallerySection.removeChild(modalSelection)
})














