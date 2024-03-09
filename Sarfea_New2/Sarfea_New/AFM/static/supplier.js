const supplierTable = document.querySelector("#tedarikci_table");
const supplierTableBody = supplierTable.querySelector("tbody");
const supplierAddBtn = document.querySelector(".supplier-add-btn");
var reqInputs = document.querySelectorAll("#id_CompanyName_Supplier");
var reqLabels = document.querySelectorAll("#firma_adi_span");
var textCells = document.querySelectorAll('#table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(5), #table td:nth-child(6)');
var phoneInput = document.querySelector("#id_PhoneNumber");


document.addEventListener("DOMContentLoaded", async () =>{
    await getSupplier();
    setInterval(async function() {        
        await getSupplier();
    }, 5000);    
});

async function getSupplier() {
    try {
        let currentRows  = supplierTableBody.querySelectorAll("tr");
        const response = await fetch(`/get_suppliers/`);
        const data = await response.json();
        const suppliers = data.suppliers; 
        let rows = '';
        for (const supplier of suppliers) {           
            const row = '<tr>' +
                '<td>' + 
                    `<button id="${supplier.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">` +
                        '<i id="edit-text" class="fa-solid fa-pen-to-square"></i>' +
                    '</button>' +
                '</td>'  +
                '<td>' + supplier.CompanyName_Supplier + '</td>' +
                '<td>' + supplier.ContactPerson + '</td>' +
                '<td>' + supplier.PhoneNumber + '</td>' +
                '<td>' + supplier.Email + '</td>' +
                '<td>' + supplier.Location + '</td>' +
                '</tr>';
                rows += row;          
        }
        if(suppliers.length > currentRows.length){
            supplierTableBody.innerHTML = '';
            supplierTableBody.insertAdjacentHTML('beforeend', rows);
            sortTableForStart(supplierTable, 1);
            allTableFormat()
            sortingTable(supplierTable)
        }        
        
    } catch (error) {
        console.error('Error fetching and rendering clients:', error);
    }
}

//                  OPEN ADD WİNDOW

const supplierAddWindow = document.querySelector(".supplier-add-window");

supplierAddBtn.addEventListener("click", () =>{    
    setTimeout(() =>{supplierAddWindow.style.display = "flex";}, 10);
}); 
document.addEventListener('click', (event) =>{
    const supplierAddContainer = document.querySelector(".supplier-add-window .container");
    if (!supplierAddContainer.contains(event.target)) {
        supplierAddWindow.style.display = "none";
    }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        supplierAddWindow.style.display = "none";
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
    var textCells = supplierTable.querySelectorAll('td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6)');
    tableFormat(textCells, "text")
}

//                  SUPPLİER ADD FUNCTİON

const subblierAddBtn = document.querySelector("#kaydet_btn")

subblierAddBtn.addEventListener("click", async function(event) {
    event.preventDefault();

    const myForm = document.getElementById("myForm");
    const formData = new FormData(myForm);

    try {
        const response = await fetch('/post_supplier/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        });
        const responseData = await response.json();
        console.log(responseData.message);
    } catch (error) {
        console.error('There was an error!', error);
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