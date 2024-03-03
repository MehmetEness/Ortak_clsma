

var createBtn = document.querySelector("#kaydet_btn");
var form = document.querySelector("#myForm");
var reqInputs = document.querySelectorAll("#id_CompanyName_Clients");
var reqLabels = document.querySelectorAll("#firma_adi_span");

var phoneInput = document.querySelector("#id_PhoneNumber");


var locationInput = document.querySelector("#id_Location")
var locationSpan = document.querySelector("#konum_span")
var locations = document.querySelectorAll("#dropdown1 .dropdown-item")

const search1 = document.querySelector('.input-group input');


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

//                  DOM LOADED

document.addEventListener("DOMContentLoaded", function () {

    //Tablo Formatlama
    
    
});

//------------------------------------------
// document.addEventListener("DOMContentLoaded", async () =>{
//     await getAndRenderStrings();
//     setInterval(async function() {
//         await getAndRenderStrings();
//     }, 5000);    
// });

// async function getAndRenderStrings() {
//     try {
//         const response = await fetch(`/get_inventors/10/`);
//         const data = await response.json();
//         const inventors = data.inventors;
//         console.log(inventors)
//         const tbody = document.getElementById('tbody');
//         tbody.innerHTML = '';

//         for (const inventor of inventors) {
//             const response2 = await fetch(`/get_strings/${inventor.id}/`);
//             const data2 = await response2.json();
//             const strings = data2.strings;

//             for (const string of strings) {
//                 const row = '<tr>' +
//                     '<td>' + 'INVENTOR' + inventor.Inventor_Number + '</td>' +
//                     '<td>' + string.String_Number + '</td>' +
//                     '<td>' + string.String_Panel_Power + '</td>' +
//                     '<td>' + string.String_Panel_Brand + '</td>' +
//                     '<td>' + string.String_VOC + '</td>' +
//                     '<td>' + string.String_Panel_SY + '</td>' +
//                     '</tr>';
//                 tbody.insertAdjacentHTML('beforeend', row);
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching and rendering clients:', error);
//     }
// }



getAndRenderStrings()
async function getAndRenderStrings() {
    try {
        const response = await fetch(`/get_clients/`);
        const data = await response.json();
        const clients = data.clients;
        console.log(clients)
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        clients.forEach(client => {
            console.log(client)
            const row = '<tr>' +
                    '<td>' + client.CompanyName_Clients + '</td>' +
                    '<td>' + client.ContactPerson + '</td>' +
                    '<td>' + client.PhoneNumber + '</td>' +
                    '<td>' + client.Email + '</td>' +
                    '<td>' + client.Location + '</td>' +
                    '</tr>';
                tbody.insertAdjacentHTML('beforeend', row);
        });          
        let textCells = document.querySelectorAll('#table td:nth-child(1), #table td:nth-child(2), #table td:nth-child(4), #table td:nth-child(5)');
        console.log(textCells)
        search1.addEventListener('input', searchTable); 
        tableFormat(textCells, "text")
        sortingTable();
       
    } catch (error) {
        console.error(error);
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
            getAndRenderStrings();
            document.querySelector(".musteriWindow").style.display = "none";
        } catch (error) {
            console.error("Gönderme başarısız:", error);
        }
    }
});




//----------------------------------------------


    // 1. Searching for specific data of HTML table

    function searchTable() {
        let table_rows = document.querySelectorAll('tbody tr');
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search1.value.toLowerCase();
    
            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        })
    
        document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
           visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
        });
    }

    // 2. Sorting | Ordering data of HTML table
function sortingTable(){
    let table_rows = document.querySelectorAll('tbody tr');
    let table_headings = document.querySelectorAll('thead th');
    table_headings.forEach((head, i) => {
    
        let sort_asc = true;
        head.onclick = () => {
            table_headings.forEach(head => head.classList.remove('active'));
            head.classList.add('active');
    
            document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
            table_rows.forEach(row => {
                row.querySelectorAll('td')[i].classList.add('active');
            })
    
            head.classList.toggle('asc', sort_asc);
            sort_asc = head.classList.contains('asc') ? false : true;
    
            sortTable(i, sort_asc);
        }
    })
}

function sortTable(column, sort_asc) {
    let table_rows = document.querySelectorAll('tbody tr');
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}