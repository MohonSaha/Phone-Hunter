const loadPhone = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaPhones(data.data);
}
const displaPhones = (phones) =>{
    console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    // phonesContainer.innerHTML = '';
    phonesContainer.textContent = '';

    // Display 10 phone only
    phones = phones.slice(0, 10);

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
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //Start spinner or loader
    toggleSpinner(false);
}


document.getElementById('btn-search').addEventListener('click', function(){
    //Start spinner or loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
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

// loadPhone()