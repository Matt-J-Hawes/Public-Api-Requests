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
const body = document.querySelector('body');
const errorMessage = document.createElement('h1');
const gallerySection = document.getElementById('gallery');
const modalSelection = document.createElement('div');
const buttonPrev = document.createElement('button');
const buttonNext = document.createElement('button');
const searchContainer = document.querySelector('.search-container');
const noResultsFound = document.createElement('h3');
buttonPrev.className = 'modal-prev';
buttonNext.className = 'modal-next';
modalSelection.className = 'modal-container';
buttonPrev.innerHTML = "Prev";
buttonNext.innerHTML = "Next";
noResultsFound.innerHTML = 'No results found! Please try again.'
body.appendChild(noResultsFound)
noResultsFound.style.display = 'none'

//FETCH API AND PARSE IT TO JSON - SUCCESS : FAILURE
fetch('https://randomuser.me/api/?results=15&nat=us')
.then(response => response.json())
.then(data => {
	generateHTML(data.results);
    generateModal(data.results);
    nextPrevModal(data.results);
})
.catch(systemFail);

//FUNCTION TO DISPLAY ERROR MESSAGE IF THERE IS A SIGNAL PROBLEM 
//FUNCTION CREATED EXTERNALLY FOR POSSIBLE REUSE
function systemFail(error){
	gallerySection.appendChild(errorMessage);
	errorMessage.innerHTML = "Trouble connecting with API! Please try again later.";
	console.log(error, "Trouble connecting with API") 
};

//IF API IS SUCCESSFULLY FETCHED - THIS FUNCTION DISPLAYS IT TO THE PAGE
function generateHTML(data){
const users = data.map(user =>  

		`<div class="card">
			<div class="card-img-container">
			<img class="card-img" src="${user.picture.large}" alt="profile picture">
			</div>
			<div class="card-info-container">
			<h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
			<p class="card-text">${user.email}</p>
			<p class="card-text cap">${user.location.city}, ${user.location.state}</p>
		</div></div>`)

	gallerySection.insertAdjacentHTML('beforeend', users.join('')); 
};

//FORMAT PHONE NUMBER CORRECTLY - (XXX) XXX-XXXX
function phoneNumReplace(user){
	const phoneReplace = user.split('').filter(y => y!== '-' && y!== '(' && y !== ')').join('');
	const phoneOne = `(${phoneReplace.slice(0,3)})`;
	const phoneTwo = `${phoneReplace.slice(4-7)}`;
	const phoneThree = `${phoneReplace.slice(8-12)}`;
	const phone = `${phoneOne} ${phoneTwo}-${phoneThree}`;
    return phone  
};

//CREATE MODAL WINDOWS (HIDDEN BY DEFAULT)
//ITERATE OVER CARDS AND DISPLAY MODAL WINDOW IF CARD MATCHES
function generateModal(data){
    let cards = document.querySelectorAll('.card')   
    for(let x = 0; x < cards.length; x++){
    	cards[x].addEventListener('click', function(e){
    		if(cards[x].html === data.innerHTML){
				body.appendChild(modalSelection)
				modalSelection.insertAdjacentHTML('beforeend', 		       
			       `<div class="modal">
			        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
			        <div class="modal-info-container">
			            <img class="modal-img" src="${data[x].picture.large}" alt="profile picture">
			            <h3 id="name" class="modal-name cap">${data[x].name.first} ${data[x].name.last}</h3>
			            <p class="modal-text">${data[x].email}</p>
			            <p class="modal-text cap">${data[x].location.city}</p>
			            <hr>
			            <p class="modal-text">${phoneNumReplace(data[x].phone)}</p>
			            <p class="modal-text">
			                     ${data[x].location.street.number} ${data[x].location.street.name}, 
			                     ${data[x].location.city} ${data[x].location.postcode} </p>
			            <p class="modal-text">Birthday: ${data[x].dob.date.slice(5,7)}/${data[x].dob.date.slice(8,10)}/${data[x].dob.date.slice(2,4)}</p>
			        </div></div>`)  
				 modalSelection.appendChild(buttonPrev)
				 modalSelection.appendChild(buttonNext) 
	        };
	     });
	 };
};

//HTML TEMPLATE TO REUSE IN NEXT AND PREV MODAL FUNCTIONS
function nextPrevModalHtml(user){
	const html = 
	       `<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
				<img class="modal-img" src="${user.picture.large}" alt="profile picture">
				<h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
				<p class="modal-text">${user.email}</p>
				<p class="modal-text cap">${user.location.city}</p>
				<hr>
				<p class="modal-text">${phoneNumReplace(user.phone)}</p>
				<p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city} ${user.location.postcode}</p>
				<p class="modal-text">Birthday: ${user.dob.date.slice(5,7)}/${user.dob.date.slice(8,10)}/${user.dob.date.slice(2,4)}</p>
		</div></div>`
   return html;
};

//DISPLAY THE NEXT AND PREV MODAL
function nextPrevModal(data, index){
	let cards = document.querySelectorAll('.card');   
	for(let x = 0; x < cards.length; x++){
			cards[x].addEventListener('click', function(){			  
			index = data.indexOf(data[x])   
		 });
	  };       
	modalSelection.addEventListener('click', function(e){
		//EVENT LISTENER FOR PREVIOUS MODAL
		if(e.target.className === 'modal-prev'){
			    index --;
		if(index <= -1){
			    index = -1
		}
		else if(index <= data.length){
			    modalSelection.innerHTML = ''
			    body.appendChild(modalSelection);
			    modalSelection.insertAdjacentHTML('beforeend', nextPrevModalHtml(data[index]));
			    modalSelection.appendChild(buttonPrev);
		        modalSelection.appendChild(buttonNext);
		    };
		};
		//EVENT LISTENER FOR NEXT MODAL
		if(e.target.className === 'modal-next'){
			    index ++;
		if(index >= data.length){
			    index = -1  
		}
		else if(index <= data.length){
				modalSelection.innerHTML = ''
				body.appendChild(modalSelection);
				modalSelection.insertAdjacentHTML('beforeend', nextPrevModalHtml(data[index]));
			    modalSelection.appendChild(buttonPrev);
				modalSelection.appendChild(buttonNext); 
			};
		};	
	});
};		 
	  
//EVENT-LISTENER TO REMOVE MODEL WINDOW 
modalSelection.addEventListener('click', function(e){
	if(e.target.className !== 'modal-info-container'){
		body.removeChild(modalSelection)
		modalSelection.innerHTML = '' 
	}
});

//SET HTML FOR SEARCH CONTAINER
searchContainer.innerHTML = 
		`<button class ='reload-button'>Load Different Employees</button>
		<form action="#" method="get">
			<input type="search" id="search-input" class="search-input" placeholder="Search...">
		</form>`

//FILTER OUT EMPLOYEES WHO DO NOT MATCH SEARCH INPUT VALUE
searchContainer.addEventListener('keyup', function(e){
	let cards = document.querySelectorAll('.card'); 
	let cardsArr = [] 
	const searchInput = searchContainer.querySelector('.search-input');
	    //IF SEARCH BUTTON IS CLICKED
		if(e.target === searchInput){ 
			for(let x = 0; x < cards.length; x++){
				const names = cards[x].querySelector('h3');
		if(!names.textContent.toUpperCase().includes(searchInput.value.toUpperCase())){
				cards[x].style.display = 'none'
				cardsArr.push(cards[x])
	    }
		else if(searchInput.value === ''){
				cards[x].style.display = 'inherit';  
		};
        if(cardsArr.length === 15){
	        	noResultsFound.style.display = 'block'
        } else {
        	noResultsFound.style.display = 'none'
        };
	  };
	}; 
 }); 

//LOAD A NEW SET OF STUDENTS ON BUTTON CLICK
searchContainer.addEventListener('click', e => {
	  if(e.target.className === 'reload-button'){
	  	window.location.reload()
	  };
});
