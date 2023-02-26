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
}


document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
})

loadPhone()