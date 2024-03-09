const clientTable = document.querySelector("#client_table");
const clientTableBody = clientTable.querySelector("tbody");
const clientAddBtn = document.querySelector(".client-add-btn");
var reqInputs = document.querySelectorAll("#id_CompanyName_Supplier");
var reqLabels = document.querySelectorAll("#firma_adi_span");
var phoneInput = document.querySelector("#id_PhoneNumber");


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
        console.log(data)
        console.log(clients)
        console.log()
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