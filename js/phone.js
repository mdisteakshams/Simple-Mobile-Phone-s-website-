const phoneLoad = async(searchText , limit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, limit);
}

const displayPhones  = (phones, limit) =>{
    const phnContainer = document.getElementById('phone-container');
    phnContainer.textContent = '';

    //diplaying only 10 results 
    const viewall = document.getElementById ('show-all');
    if (limit && phones.length > 10) {
        phones= phones.slice(0, 10);
        viewall.classList.remove('d-none');
    }
    else{
        viewall.classList.add('d-none');
    }

    // showing error for illegal search
    const emptyPhones = document.getElementById('warning-message')

    if (phones.length === 0) {

        emptyPhones.classList.remove('d-none');
    }
    else{
        emptyPhones.classList.add('d-none');
    }

    // displaying phones
    phones.forEach( phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        <div class="card h-100 p-5 rounded">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
        `;
        phnContainer.appendChild(phoneDiv);
    })

    //stop spinner
    toggleSpinner(false);

}

const searchProcess = (limit) => {
    //start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    phoneLoad(searchText , limit);
}
document.getElementById('btn-search').addEventListener('click',  function(){
    
    searchProcess(10);
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(10);
    }
});

const toggleSpinner = loading => {
    const loaderContainer =  document.getElementById('loader');
    if (loading) {
        loaderContainer.classList.remove('d-none');

        
    }
    else{
        loaderContainer.classList.add('d-none');
    }
}

document.getElementById('show-all-button').addEventListener('click', function(){
    searchProcess();
})



//each phone's description

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url);
    const data = await response.json(); 
    displayPhonesDetails(data.data);
}


const displayPhonesDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name
    const phoneSpecaifcation = document.getElementById('phone-specs');
    const sensorsdetails = phone.mainFeatures.sensors.map(x => x);
    phoneSpecaifcation.innerHTML = `
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Display: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Sensors: ${sensorsdetails} </p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth: 'N/A'}</p>
    <p>GPS: ${phone.others ? phone.others.GPS: 'N/A'}</p>
    <p>NFS: ${phone.others ? phone.others.NFS: 'N/A'}</p>
    <p>Radio: ${phone.others ? phone.others.Radio: 'N/A'}</p>
    <p>USB: ${phone.others ? phone.others.USB: 'N/A'}</p>
    <p>WLAN: ${phone.others ? phone.others.WLAN: 'N/A'}</p>

    
    
    
    `
}
// phoneLoad();

{/* <p>Sensors: ${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'N/A'}. ${phone.mainFeatures ? phone.mainFeatures.sensors[1] : 'N/A'}, ${phone.mainFeatures ? phone.mainFeatures.sensors[2] : 'N/A'}, ${phone.mainFeatures ? phone.mainFeatures.sensors[3] : 'N/A'}, ${phone.mainFeatures ? phone.mainFeatures.sensors[4] : 'N/A'}, ${phone.mainFeatures ? phone.mainFeatures.sensors[5] : 'N/A'}</p> */}