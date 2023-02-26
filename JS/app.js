const loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaPhones(data.data, dataLimit);
}
const displaPhones = (phones, dataLimit) =>{
    console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    // phonesContainer.innerHTML = '';
    phonesContainer.textContent = '';

    // Display 10 phone only
    const showAll = document.getElementById('show-all');
    if(dataLimit > 10 && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // Display no phone found
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove("d-none");
    }
    else{
        noPhone.classList.add("d-none");
    }


    // Display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
           <div class="card h-100">
              <img src="${phone.image}" class="card-img-top p-4 w-75 card-image" alt="...">
                <div class="card-body">
                   <h5 class="card-title">${phone.phone_name}</h5>
                   <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                   to additional content. This content is a little bit longer.</p>
                   <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //Start spinner or loader
    toggleSpinner(false);
}


//Function: Search precess to show data:
const processSearch = (dataLimit) => {
    //Start spinner or loader from here
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// Function: For search button
document.getElementById('btn-search').addEventListener('click', function(){   
    processSearch(10);
})

// Function: For search button by Enter button
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

//Function: For Show All button. Not best way to show all button
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

// Function to load data for details button
const loadPhoneDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

}

// loadPhone()