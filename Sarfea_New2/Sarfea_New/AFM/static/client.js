const clientTable = document.querySelector("#client_table");
const clientTableBody = clientTable.querySelector("tbody");
const clientAddBtn = document.querySelector(".client-add-btn");
var reqInputs = document.querySelectorAll("#id_CompanyName_Supplier");
var reqLabels = document.querySelectorAll("#firma_adi_span");
var phoneInput = document.querySelector("#id_PhoneNumber");
const clientAddForm = document.getElementById("client_add_form");


document.addEventListener("DOMContentLoaded", async () =>{
    await getSupplier();
    setInterval(async function() {        
        await getSupplier();
    }, 5000);    
});

async function getSupplier() {
    try {
        let currentRows  = clientTableBody.querySelectorAll("tr");
        const response = await fetch(`/get_clients/`);
        const data = await response.json();
        const clients = data.clients; 
        let rows = '';
        for (const client of clients) {           
            const row = '<tr>' +
                '<td>' + 
                    `<button id="${client.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">` +
                        '<i id="edit-text" class="fa-solid fa-pen-to-square"></i>' +
                    '</button>' +
                '</td>'  +
                '<td>' + client.CompanyName_Clients + '</td>' +
                '<td>' + client.ContactPerson + '</td>' +
                '<td>' + client.PhoneNumber + '</td>' +
                '<td>' + client.Email + '</td>' +
                '<td>' + client.Location + '</td>' +
                '</tr>';
                rows += row;          
        }
        if(clients.length > currentRows.length){
            clientTableBody.innerHTML = '';
            clientTableBody.insertAdjacentHTML('beforeend', rows);
            sortTableForStart(clientTable, 1);
            sortingTable(clientTable);
            allTableFormat();

            
        }        
        
    } catch (error) {
        console.error('Error fetching and rendering clients:', error);
    }
}

//                  OPEN ADD WİNDOW

const clientAddWindow = document.querySelector(".client-add-window");
clientAddBtn.addEventListener("click", () =>{    
    setTimeout(() =>{clientAddWindow.style.display = "flex";}, 10);
}); 
document.addEventListener('click', (event) =>{
    const clientAddContainer = document.querySelector(".client-add-window .container");
    if (!clientAddContainer.contains(event.target)) {
        clientAddWindow.style.display = "none";
    }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        clientAddWindow.style.display = "none";
        clientAddForm.reset();
    })
})

//                  TELEFON NUMARASI FORMATLAMA

phoneInput.addEventListener('input', function(event) {
    var contryNumber = "+90";
    var inputValue = phoneInput.value;  
    if (event.inputType !== 'deleteContentBackward') {
        phoneInput.value = formatPhoneNumberByCountryCode(inputValue, contryNumber);
    }
});

//                  TABLO FORMATLAMA

function allTableFormat(){    
    var textCells = clientTable.querySelectorAll('td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6)');
    tableFormat(textCells, "text")
}

//----
// createBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     if(companyNameInput.value != "" && controlSelectionInputsReverse(companyNameInput, companyNameLabel, companyList)){               
//         form.submit();
//     }else{
//         companyNameLabel.style.color = "red"
//         companyNameLabel.style.fontWeight = "600"
//     }
// }); 
//                  SUPPLİER ADD FUNCTİON

const clientFormAddBtn = document.querySelector("#kaydet_btn")

clientFormAddBtn.addEventListener("click", async function(event) {
    event.preventDefault();

    if(requiredInputs(reqInputs, reqLabels)){        
        const formData = new FormData(clientAddForm);
    
        try {
            const response = await fetch('/post_client/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });
            //const responseData = await response.json();
            //console.log(responseData.message);
            getSupplier();
            clientAddWindow.style.display = "none";
            clearInputAfterSave(clientAddForm);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }    
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}