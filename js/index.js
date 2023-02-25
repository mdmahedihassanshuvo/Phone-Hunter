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
            </div>
        </div>
        `
        colContainer.appendChild(col);
    });
    loadSpinner(false);
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
