var textCells = document.querySelectorAll('#table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(5), #table td:nth-child(6)');

var createBtn = document.querySelector("#kaydet_btn");
var form = document.querySelector("#myForm");
var reqInputs = document.querySelectorAll("#id_CompanyName_Clients");
var reqLabels = document.querySelectorAll("#firma_adi_span");

var phoneInput = document.querySelector("#id_PhoneNumber");

var searchInput = document.getElementById("mysearch");
var clearButton = document.querySelector(".clear");
var table = document.getElementById("table");
let thRows = table.querySelectorAll("th");
var companyList = table.querySelectorAll("td:nth-child(2)")
var locationInput = document.querySelector("#id_Location")
var locationSpan = document.querySelector("#konum_span")
var locations = document.querySelectorAll("#dropdown1 .dropdown-item")




//                  MÜŞTERİ EKLE BUTTON

document.getElementById("musteri-ac").addEventListener("click", function(){    
        document.querySelector(".musteriWindow").style.display = "flex";    
});
document.getElementById("musteri-modal").addEventListener("click", function(){
    document.querySelector(".musteriWindow").style.display = "none";
});

//                  ZORUNLU İNPUTLAR  

// createBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     var bool = controlSelectionInputs(locationInput, locationSpan, locations);
//     if(requiredInputs(reqInputs, reqLabels) && controlSelectionInputsReverse(reqInputs[0], reqLabels[0], companyList) && bool){      
//         console.log("dfs")      
//         form.submit();
//     }
// }); 

//                  TELEFON NUMARASI FORMATLAMA

phoneInput.addEventListener('input', function(event) {
    var contryNumber = "+90";
    var inputValue = phoneInput.value;  
    if (event.inputType !== 'deleteContentBackward') {
        phoneInput.value = formatPhoneNumberByCountryCode(inputValue, contryNumber);
    }
});

//                  SEARCH İŞLEMLERİ

searchInput.addEventListener("input", function() {
    filterTable(searchInput, table);
});
clearButton.addEventListener("click", function() {
    searchInput.value = "";
    showAllRows(table);
});

//                  TABLO FİLİTRELEME

searchInput.addEventListener("input", function(){
    filterTable(searchInput, table);
});
clearButton.addEventListener("click", function() {
    searchInput.value = "";
    showAllRows(table);
});

//                  TABLO SIRALAMA

thRows.forEach(header => {
    header.addEventListener("click", function() {        
        var columnIndex = Array.from(thRows).indexOf(header);
        
        sortTable(table, columnIndex);
    });
});


//                  DOM LOADED

document.addEventListener("DOMContentLoaded", function () {

    //Tablo Formatlama
    tableFormat(textCells, "text")
    
});

//------------------------------------------
document.addEventListener("DOMContentLoaded", async () =>{
    await getAndRenderClients();
    setInterval(async function() {
        await getAndRenderClients();
    }, 5000);    
});


async function getAndRenderClients() {
    try{
        const response = await fetch('/get-clients/');
        const data = await response.json();
        const clients = data.clients;

        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        clients.forEach((client) => {
            if (client.CompanyName_Clients) {
                const row = '<tr>' +
                    '<td><button class="edit-client-btn button2" data-client-name="' + client.CompanyName_Clients + '">Edit</button></td>' +
                    '<td>' + client.CompanyName_Clients + '</td>' +
                    '<td>' + client.ContactPerson + '</td>' +
                    '<td>' + client.PhoneNumber + '</td>' +
                    '<td>' + client.Email + '</td>' +
                    '<td>' + client.Location + '</td>' +
                    '</tr>';
                tbody.insertAdjacentHTML('beforeend', row);
            }
        });
        
        const editButtons = document.querySelectorAll('.edit-client-btn');
        editButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const clientName = this.getAttribute('data-client-name');
                window.location.href = '/client_edit/' + clientName + '/';
            });
        });
    }catch (error){
        console.error('Error fetching and rendering clients:', error);
    }
}


form.addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
        const formData = new FormData(form);
        for(item of formData){
            console.log(item[0],item[1])
        }
        // const response = await fetch('/submit-form-url', {
        //     method: 'POST',
        //     body: formData
        // });
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
    } catch (error) {
        console.error("göndrme başarısız");
    }
}); 