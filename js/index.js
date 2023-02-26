const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data, dataLimit))
}

const displayPhone = (phones, dataLimit) => {
    console.log(phones);
    const colContainer = document.getElementById('col-container');
    colContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    const error = document.getElementById('error')
    if(phones.length === 0){
        error.classList.remove('d-none');
    }
    else{
        error.classList.add('d-none')
    }
    phones.forEach(phone => {
        console.log(phone);
        const col = document.createElement('div');
        col.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#show-modal">Details</button>
            </div>
        </div>
        `
        colContainer.appendChild(col);
    });
    loadSpinner(false);
}

const showDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('show-phone-title');
    modalTitle.innerText = phone.name;
    const body = document.getElementById('modal-body');
    body.innerHTML =`
    <p>${phone.releaseDate ? phone.releaseDate : 'not found releasedDate'}</p>
    <p>${phone.mainFeatures ? phone.mainFeatures.memory : 'not found'}</p>
    `
}

const processSearch = (dataLimit) =>{
    loadSpinner(true);
    const searchField = document.getElementById('Search-input');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('phone-src').addEventListener('click', function(){
    processSearch(9);
})

document.getElementById('Search-input').addEventListener('keypress', function(e){
    if (e.key === "Enter") {
        processSearch(9);
      }
})

const loadSpinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none')
    }
}

document.getElementById('showall-btn').addEventListener('click', function(){
    processSearch();
})

// loadPhones('iphone');
