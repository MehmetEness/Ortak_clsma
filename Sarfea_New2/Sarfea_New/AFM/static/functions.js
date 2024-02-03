
var icon = document.querySelector('.icon');
var search = document.querySelector('.search');






//                  FORMAT NUMBERS

function formatNumber(number, fract) {    
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: fract , maximumFractionDigits: fract }).format(number.toFixed(fract));
}; 

//                  TABLE FORMAT

function tableFormat(cells, type){
    switch (type) {
        case "usd":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2) + "$";
                } else {
                cell.textContent = "0$"
                }   
            });
            break;
        case "tl":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2) + "₺";
                } else {
                cell.textContent = "0₺"
                }   
            });
            break;
        case "text":
            cells.forEach(function (cell) {
                if (cell.textContent == "None" || cell.textContent.trim() == "" || cell.textContent == "NaN") {
                  cell.textContent = "-";
                }
            });
            break;
        case "numeric":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2);
                } else {
                cell.textContent = "0"
                }   
            });
            break;  
            case "kur":
                cells.forEach(function (cell) {    
                    var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                    if (!isNaN(parseFloat(value))) {
                        cell.textContent = formatNumber(value, 4) + "$";
                    } else {
                    cell.textContent = "0$"
                    }   
                });
                break;            
        default:  

    }
};

//                  SIRALAMA İŞLEMLERİ

function sortTable(table, columnIndex) {
    var rows, switching, i, x, y, shouldSwitch;
    var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;    
    switching = true;

    while (switching) {
        switching = false;

        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if(!isNaN(x.textContent.replace(/[$,₺]/g, '').trim())){
                var xValue = parseFloat(x.textContent.replace(/[$,₺]/g, '').trim());
                var yValue = parseFloat(y.textContent.replace(/[$,₺]/g, '').trim());
                if (!isNaN(xValue) && !isNaN(yValue) && xValue > yValue) {
                    shouldSwitch = true;
                    break;
                }                
            }       
            else if(datePattern.test(x.textContent)){
                var date1 = x.textContent.trim();
                var date2 = y.textContent.trim();

                if (compareDates(date1, date2) > 0) {
                    shouldSwitch = true;
                    break;
                }
            }     
            else{
                var xText = x.textContent.toLowerCase().trim().replace(/-/g, 'zzzz'); 
                var yText = y.textContent.toLowerCase().trim().replace(/-/g, 'zzzz');     
                if (xText > yText) {
                    shouldSwitch = true;
                    break;
                }
            }            
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function compareDates(date1, date2) {

    var parts1 = date1.split("/");
    var parts2 = date2.split("/");

    var day1 = parseInt(parts1[0], 10);
    var month1 = parseInt(parts1[1], 10);
    var year1 = parseInt(parts1[2], 10);

    var day2 = parseInt(parts2[0], 10);
    var month2 = parseInt(parts2[1], 10);
    var year2 = parseInt(parts2[2], 10);

    if (year1 !== year2) {
        return year1 - year2;
    }

    if (month1 !== month2) {
        return month1 - month2;
    }

    return day1 - day2;
}
/*xxx.forEach(header => {
    header.addEventListener("click", function() {        
        var columnIndex = Array.from(xxx).indexOf(header);
        sortTable(yyy, columnIndex);
    });
});*/

//                  TABLO SEARCH İŞLEMLERİ

function filterTable(searchInput, table, ) {
    var filter = searchInput.value.toLowerCase();
    var rows = table.getElementsByTagName("tr");

   for (var i = 0; i < rows.length; i++) {
       var row = rows[i];

    if (!row.querySelector("th")) {
       var cells = row.getElementsByTagName("td");
       var shouldShow = false;

       for (var j = 0; j < cells.length; j++) {
           var cell = cells[j];

           if (cell) {
               var text = cell.textContent || cell.innerText;

               if (text.toLowerCase().indexOf(filter) > -1) {
                   shouldShow = true;
                   break;
               }
           }
       }

       if (shouldShow) {
           row.style.display = "";
       } else {
           row.style.display = "none";
       }
    }
}
}
function showAllRows(table) {
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = "";
    }
}

//                  ZORUNLU İNPUT BİLDİRİMLERİ

function requiredInputs(inputs, labels){
    var value = 0;
    inputs.forEach(function(input, index){
        
        if(input.value == ""){
            labels[index].style.color = "red";
            labels[index].style.fontWeight = "700";
        }
        else{
            labels[index].style.color = "black";
            labels[index].style.fontWeight = "500";
            value += 1;
        }
    });
    if(value == inputs.length){
        return true;
    }
    else{
        return false;
    }
}

//                  TELEFON NUMARASI FORMATLAMA

function formatPhoneNumberByCountryCode(phoneNumber, countryCode) {
    var cleaned = phoneNumber.replace(/[^\d+]/g, '');
    var formatted = cleaned;
  
    switch (countryCode) {
        case "+90": // Türkiye
        phoneNumber.maxLength = 15;
        if(formatted.length < 4) return formatted;
        if (formatted.length < 7) {
            return `(${formatted.slice(0,3)}) ${formatted.slice(3)}`;        
        }
        if (formatted.length < 7) {
            return `(${formatted.slice(0,3)}) ${formatted.slice(3)}`;        
        }
        if (formatted.length < 9) {
            return `(${formatted.slice(0,3)}) ${formatted.slice(3,6)} ${formatted.slice(6)}`;        
        }
        if (formatted.length < 11) {
            return `(${formatted.slice(0,3)}) ${formatted.slice(3,6)} ${formatted.slice(6,8)} ${formatted.slice(8)}`;        
        }
            break;
        default:
            break;
    }
}

//                  SEARCH İNPUT

if(icon && search){
    icon.onclick = function(){
        search.classList.toggle('active')
    }
    function clearSearch() {
        const input = document.getElementById('mysearch');
        input.value = '';
    }
}

//                  12 ocak 2023 FORMATINDAKİ TARİHLERİ SIRALAMA



function parseCardDate(dateString) {
    if (dateString == "-") {
        return null;
    }
    var months = {
        "Ocak": 0, "Şubat": 1, "Mart": 2, "Nisan": 3, "Mayıs": 4, "Haziran": 5,
        "Temmuz": 6, "Ağustos": 7, "Eylül": 8, "Ekim": 9, "Kasım": 10, "Aralık": 11
    };
    var dateParts = dateString.split(" ");
    var day = parseInt(dateParts[0]);
    var month = months[dateParts[1]];
    var year = parseInt(dateParts[2]);
  
    return new Date(year, month, day);
}

//                  CARDLARI TARİHE GÖRE SIRALAMA

function cardDateList(rows){
      rows.forEach(function(row){
        var cards = row.querySelectorAll('.card');
        var sortedCards = Array.from(cards).sort(function(a, b) {
            var dateA = parseCardDate(a.querySelector('p:nth-child(3)').textContent);
            var dateB = parseCardDate(b.querySelector('p:nth-child(3)').textContent);
            
            if (dateA === null && dateB !== null) {
                return 1;
            } else if (dateA !== null && dateB === null) {
                return -1;
            }
    
            return dateA - dateB;
        });
        for (var i = 0; i < sortedCards.length; i++) {
        
            row.appendChild(sortedCards[i]);
        }
      });

}

//                  TARİH FORMATLAMA

function formatDate(date) {
    var cleaned = date.replace(/[^\d+]/g, '');
    var formatted = cleaned;
    var day = "31";
    var month = "12";
    var year = "2999";
      
    if(formatted.length < 3) {
        if(formatted < day){
            return formatted;
        }
        else{
            return "31";
        }        
    }
    if (formatted.length < 5) {
        if(formatted.slice(2) < month){
            return `${formatted.slice(0,2)}.${formatted.slice(2)}`;  
        }
        else{
            return `${formatted.slice(0,2)}.12`
        }                  
    }
    if (formatted.length < 10) {
        if(formatted.slice(4) < year){
            return `${formatted.slice(0,2)}.${formatted.slice(2,4)}.${formatted.slice(4)}`; 
        }
        else{
            return `${formatted.slice(0,2)}.${formatted.slice(2,4)}.2999`;
        }                     
    }  
}




//            ***** DOM EVENTS *****

document.addEventListener('DOMContentLoaded', function () {
    var dropdownInputs = document.querySelectorAll('.myInput');

//                  DROPDOWN İNPUTS

    if(dropdownInputs){
        dropdownInputs.forEach(input => {
            const dropdownId = input.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);
            const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        
            input.addEventListener('focus', function () {
              dropdown.classList.add('show');
            });
        
            input.addEventListener('blur', function () {
              setTimeout(() => {
                dropdown.classList.remove('show');
              }, 200);
            });
        
            input.addEventListener('input', function () {
              const filterText = input.value.toLowerCase();
        
              dropdownItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                if (itemText.startsWith(filterText)) {
                  item.style.display = 'block';
                } else {
                  item.style.display = 'none';
                }
              });
            });
        
            dropdownItems.forEach(item => {
              item.addEventListener('click', function () {
                input.value = this.textContent;
                dropdown.classList.remove('show');
              });
            });
          });
    }



  });