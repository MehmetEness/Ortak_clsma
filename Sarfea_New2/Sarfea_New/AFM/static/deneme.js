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
        const response = await fetch('/get_operation_care/');
        const data = await response.json();
        const run_cards = data.operation_care;
        

        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        run_cards.forEach((run_card) => {
            if (run_card.Operation_Care_Company) {
                const row = '<tr>' +
                    '<td></td>' +
                    '<td>' + run_card.Operation_Care_Company + '</td>' +
                    '<td>' + run_card.Operation_Care_Inventor_Brand + '</td>' +
                    '<td>' + run_card.Operation_Care_Panel_Brand + '</td>' +
                    '<td>' + run_card.Operation_Care_Panel_Number_Str + '</td>' +
                    '<td>' + run_card.Operation_Care_Start_Date + '</td>' +
                    '</tr>';
                tbody.insertAdjacentHTML('beforeend', row);
            }
        });
        

    }catch (error){
        console.error('Error fetching and rendering clients:', error);
    }
}


form.addEventListener('submit', async function(e) {
    e.preventDefault();
    var bool = controlSelectionInputs(locationInput, locationSpan, locations);
    if(requiredInputs(reqInputs, reqLabels) && controlSelectionInputsReverse(reqInputs[0], reqLabels[0], companyList) && bool){      
        try {
            const formData = new FormData(form);
            for(item of formData){
                console.log(item); 
            }
            const response = await fetch('/post-client/', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); 
            getAndRenderClients();
            document.querySelector(".musteriWindow").style.display = "none";
        } catch (error) {
            console.error("Gönderme başarısız:", error);
        }
    }
});


