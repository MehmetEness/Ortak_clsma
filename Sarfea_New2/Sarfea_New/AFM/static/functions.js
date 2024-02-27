var icon = document.querySelector(".icon");
var search = document.querySelector(".search");
var searchInput = document.getElementById("mysearch");
var clearButton = document.querySelector(".clear");

//                  GENEL FUNCTİON

function clear(value){      
  if(value != undefined){
      var cleanString = value.replace(/[^0-9,]/g, '');
      //var cleanString = value.replace(/[^0-9,]/g, '').replace(/,/g, '.');
      return cleanString;
  }else{
      var  cleanString = 0;
      return cleanString;
  } 
}
function clear2(value){      
  if(value != undefined){
      var cleanString = value.replace(/[^0-9,]/g, '').replace(/,/g, '.');
      return cleanString;
  }else{
      var  cleanString = 0;
      return cleanString;
  } 
}

//                  FORMAT NUMBERS

function formatNumber(number, fract) {  
  var value = new Intl.NumberFormat("en-US", {minimumFractionDigits: fract, maximumFractionDigits: fract}).format(number.toFixed(fract));
  return value.replace(/\./g, 'a').replace(/,/g, '.').replace(/a/g, ',');
}
function format(number) {
  var indexOfDot = number.indexOf(',');  
  if (indexOfDot !== -1) {
    var integerPart = number.slice(0, indexOfDot).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var decimalPart = number.slice(indexOfDot + 1);
    return integerPart + ',' + decimalPart;
  } else {
    var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return formattedNumber; 
  }
}

//                  SPAN FORMATLAMA

function formatSpans(span, type) {
  switch (type) {
    case "kWe":        
        var value = parseFloat(clear2(span.textContent));        
        if (!isNaN(parseFloat(value))) {
          span.textContent = formatNumber(value, 0) + " kWe";
          span.title = formatNumber(value, 0) + " kWe";
        } else {
          span.textContent = "0 kWe";
          span.title = "0 kWe";
        }        
      break;
    case "kWp":
      var value = parseFloat(clear2(span.textContent));        
        if (!isNaN(parseFloat(value))) {
          span.textContent = formatNumber(value, 0) + " kWp";
          span.title = formatNumber(value, 0) + " kWp";
        } else {
          span.textContent = "0 kWp";
          span.title = "0 kWp";
        }  
      break;
    case "usd":
      var value = parseFloat(clear2(span.textContent));        
        if (!isNaN(parseFloat(value))) {
          span.textContent = formatNumber(value, 2) + " $";
          span.title = formatNumber(value, 2) + " $";
        } else {
          span.textContent = "0 $";
          span.title = "0 $";
        }  
      break;
    case "text":
      
      break;
    case "numeric":
      var value = parseFloat(clear2(span.textContent));        
        if (!isNaN(parseFloat(value))) {
          span.textContent = formatNumber(value, 2);
          span.title = formatNumber(value, 2);
        } else {
          span.textContent = "0";
          span.title = "0";
        } 
      break;

    default:
  }
}

//                  TABLE FORMAT

function tableFormat(cells, type) {
  switch (type) {
    case "usd":
      cells.forEach(function (cell) {
        //var value = parseFloat(cell.textContent.replace(/,/g, "."));
        var value = parseFloat(clear2(cell.textContent));        
        if (!isNaN(parseFloat(value))) {
          cell.textContent = formatNumber(value, 2) + "$";
          cell.title = formatNumber(value, 2) + "$";
        } else {
          cell.textContent = "0$";
          cell.title = "0$";
        }
      });
      break;
    case "tl":
      cells.forEach(function (cell) {
       // var value = parseFloat(cell.textContent.replace(/,/g, "."));
        var value = parseFloat(clear2(cell.textContent));
        if (!isNaN(parseFloat(value))) {
          cell.textContent = formatNumber(value, 2) + "₺";
          cell.title = formatNumber(value, 2) + "₺";
        } else {
          cell.textContent = "0₺";
          cell.title = "0₺";
        }
      });
      break;
    case "kur":
      cells.forEach(function (cell) {
        var value = parseFloat(clear2(cell.textContent));
        if (!isNaN(parseFloat(value))) {
          cell.textContent = formatNumber(value, 4) + "₺";
          cell.title = formatNumber(value, 4) + "₺";
        } else {
          cell.textContent = "0₺";
          cell.title = "0₺";
        }
      });
      break;
    case "text":
      cells.forEach(function (cell) {
        if (
          cell.textContent.trim() == "None" ||
          cell.textContent.trim() == "" ||
          cell.textContent.trim() == "null" ||
          cell.textContent.trim() == "NaN"
        ) {
          cell.textContent = "-";
        }
      });
      break;
    case "numeric":
      cells.forEach(function (cell) {
        var value = parseFloat(clear2(cell.textContent));
        if (!isNaN(parseFloat(value))) {
          cell.textContent = formatNumber(value, 0);
          cell.title = formatNumber(value, 0);
        } else {
          cell.textContent = "0";
          cell.title = "0";
        }
      });
      break;

    default:
  }
}

//                  SIRALAMA İŞLEMLERİ

function sortTable(table, columnIndex) {
  //const headers = table.querySelectorAll('thead th span');
  var rows, switching, i, x, y, shouldSwitch;
  var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  switching = true;
  
  while (switching) {    
    switching = false;
    var tbody = table.querySelector('tbody');
    rows = tbody.rows;
    
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];     
      console.log(rows[i].textContent)
      console.log(rows[i + 1].textContent)
      if (!isNaN(x.textContent.replace(/[$.₺]/g, "").replace(/,/g, ".").trim())) {
        var xValue = parseFloat(x.textContent.replace(/[$.₺]/g, "").replace(/,/g, ".").trim());
        var yValue = parseFloat(y.textContent.replace(/[$.₺]/g, "").replace(/,/g, ".").trim());
        if (!isNaN(xValue) && !isNaN(yValue) && xValue < yValue) {
          shouldSwitch = true;
          break;
        }
      } else if (datePattern.test(x.textContent)) {
        var date1 = x.textContent.trim();
        var date2 = y.textContent.trim();

        if (compareDates(date1, date2) > 0) {
          shouldSwitch = true;
          break;
        }
      } else {
        var xText = x.textContent.toLowerCase().trim().replace(/-/g, "zzzz");
        var yText = y.textContent.toLowerCase().trim().replace(/-/g, "zzzz");
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

function filterTable(searchInput, table) {
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

function requiredInputs(inputs, labels) {
  var value = 0;
  inputs.forEach(function (input, index) {
    if (input.value == "") {
      labels[index].style.color = "red";
      labels[index].style.fontWeight = "600";
    } else {
      labels[index].style.color = "black";
      labels[index].style.fontWeight = "500";
      value += 1;
    }
  });
  if (value == inputs.length) {
    return true;
  } else {
    return false;
  }
}

//                  SELECTİON VE İNPUT KONTROLÜ

// function controlSelectionInputs(input, label,ddmenu) {
//   var optionCount = 0;
//   ddmenu.forEach(function(option){
//     if(input.value.trim() == option.textContent.trim()){
//       optionCount += 1;
//     }
//   });
//   if (optionCount == 0) {
//     label.style.color = "red";
//     label.style.fontWeight = "600";
//     return false;
//   } else {
//     label.style.color = "black";
//     label.style.fontWeight = "500";
//     return true;
//   }
// }
function controlSelectionInputsReverse(input, label,ddmenu) {
  var optionCount = 0;
  ddmenu.forEach(function(option){
    if(input.value.trim() == option.textContent.trim()){
      optionCount += 1;
    }
  });
  if (optionCount == 0) {    
    label.style.color = "black";
    label.style.fontWeight = "500";
    return true;
  } else {
    label.style.color = "red";
    label.style.fontWeight = "600";
    return false;
  }
}

//                  INPUTLARI FORMATLAMA

function inputForFormat(input){
  input.addEventListener("input", function(event) {
      var inputValue = event.target.value;
      var clearValue = clear(inputValue);
      var formatValue = format(clearValue);
      input.value = formatValue;
  });
}

function onPageLoad(input) {
    var inputValue = parseFloat(input.value); 
    if(!isNaN(inputValue)){
        var formatValue = formatNumber(inputValue , 2);
        input.value = formatValue;
        deger = formatValue;
    }else{
        input.value = "0"
    }
}

//                  FİRMA ADLARI KONTROLÜ

function firmaCount(firmalar, input){
  var firmaCount = 0;
  firmalar.forEach(function(firma){
      if(input.value.trim() == firma.textContent.trim()){
          firmaCount += 1;
      }
  });  
  return firmaCount;
}

//                  TELEFON NUMARASI FORMATLAMA

function formatPhoneNumberByCountryCode(phoneNumber, countryCode) {
  var cleaned = phoneNumber.replace(/[^\d+]/g, "");
  var formatted = cleaned;

  switch (countryCode) {
    case "+90": // Türkiye
      phoneNumber.maxLength = 15;
      if (formatted.length < 4) return formatted;
      if (formatted.length < 7) {
        return `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`;
      }
      if (formatted.length < 7) {
        return `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`;
      }
      if (formatted.length < 9) {
        return `(${formatted.slice(0, 3)}) ${formatted.slice(
          3,
          6
        )} ${formatted.slice(6)}`;
      }
      if (formatted.length < 11) {
        return `(${formatted.slice(0, 3)}) ${formatted.slice(
          3,
          6
        )} ${formatted.slice(6, 8)} ${formatted.slice(8)}`;
      }
      break;
    default:
      break;
  }
}

//                  SEARCH İNPUT

if (icon && search) {
  icon.onclick = function () {
    search.classList.toggle("active");
  };
  function clearSearch() {
    const input = document.getElementById("mysearch");
    input.value = "";
  }
}

//                  12 ocak 2023 FORMATINDAKİ TARİHLERİ SIRALAMA

function parseCardDate(dateString) {
  if (dateString == "-") {
    return null;
  }
  var months = {
    Ocak: 0,
    Şubat: 1,
    Mart: 2,
    Nisan: 3,
    Mayıs: 4,
    Haziran: 5,
    Temmuz: 6,
    Ağustos: 7,
    Eylül: 8,
    Ekim: 9,
    Kasım: 10,
    Aralık: 11,
  };
  var dateParts = dateString.split(" ");
  var day = parseInt(dateParts[0]);
  var month = months[dateParts[1]];
  var year = parseInt(dateParts[2]);

  return new Date(year, month, day);
}

//                  CARDLARI TARİHE GÖRE SIRALAMA

function cardDateList(rows) {
  rows.forEach(function (row) {
    var cards = row.querySelectorAll(".card");
    var sortedCards = Array.from(cards).sort(function (a, b) {
      var dateA = parseCardDate(a.querySelector("p:nth-child(2)").textContent);
      var dateB = parseCardDate(b.querySelector("p:nth-child(2)").textContent);

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
  var cleaned = date.replace(/[^\d+]/g, "");
  var formatted = cleaned;
  var day = "31";
  var month = "12";
  var year = "2999";

  if (formatted.length < 3) {
    if (formatted < day) {
      return formatted;
    } else {
      return "31";
    }
  }
  if (formatted.length < 5) {
    if (formatted.slice(2) < month) {
      return `${formatted.slice(0, 2)}.${formatted.slice(2)}`;
    } else {
      return `${formatted.slice(0, 2)}.12`;
    }
  }
  if (formatted.length < 10) {
    if (formatted.slice(4) < year) {
      return `${formatted.slice(0, 2)}.${formatted.slice(
        2,
        4
      )}.${formatted.slice(4)}`;
    } else {
      return `${formatted.slice(0, 2)}.${formatted.slice(2, 4)}.2999`;
    }
  }
}                
function formatDateForSubmit(date) {
  if(date.length == 10){
    var splits = date.split('.');

var gun = splits[0];
var ay = splits[1];
var yil = splits[2];

var newFormat = yil + '-' + ay + '-' + gun;

return newFormat;
  }
  else{
    return "";
  }

}
function convertDateFormat (tarih){
  var date = tarih.split('.');
  date = `${date[1]}.${date[0]}.${date[2]}`;
  return date;
}   



//                 DOLAR KURU İÇİN TARİH ÇEKME

function tarihFormatiniDegistir(tarih) {
  tarih = convertDateFormat(tarih);
  const dateObj = new Date(tarih);
  dateObj.setDate(dateObj.getDate() + 1);
  if (isWeekend(dateObj)) {
      dateObj.setDate(dateObj.getDate() + 1);
  }
  while (isWeekend(dateObj)) {
      dateObj.setDate(dateObj.getDate() + 1);
  }
  const yil = dateObj.getFullYear();
  const ay = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const gun = dateObj.getDate().toString().padStart(2, '0');
  const yeniFormatliTarih = gun + '-' + ay + '-' + yil;
  return yeniFormatliTarih;
}
function birGunOncekiTarih(dateString) {
  dateString = convertDateFormat(dateString);
  const dateObj = new Date(dateString);
  dateObj.setDate(dateObj.getDate());
  while (isWeekend(dateObj)) {
      dateObj.setDate(dateObj.getDate() + 1);
  }
  const yil = dateObj.getFullYear();
  const ay = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const gun = dateObj.getDate().toString().padStart(2, '0');
  const yeniFormatliTarih = gun + '-' + ay + '-' + yil;
  return yeniFormatliTarih;
}  
function isWeekend(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
}
function dateInputFormat(input) {
  let tarih = input.value;
    if(tarih.length == 10){
      var parcalar = tarih.split('-');

  var yil = parcalar[0];
  var ay = parcalar[1];
  var gun = parcalar[2];

  var yeniFormat = gun + '.' + ay + '.' + yil;

  input.value = yeniFormat;
    }
    else{
      input.value = "";
    }
  
}  


//            ***** DOM EVENTS *****

document.addEventListener("DOMContentLoaded", function () {
  var dropdownInputs = document.querySelectorAll(".myInput");

  //                  DROPDOWN İNPUTS

  if (dropdownInputs) {
    dropdownInputs.forEach((input) => {
      const dropdownId = input.getAttribute("data-dropdown");
      const dropdown = document.getElementById(dropdownId);
      const dropBox = input.parentElement;
      const dropdownItems = dropdown.querySelectorAll(".dropdown-item");

      input.addEventListener("focus", function () {
        dropdown.classList.add("show");
      });

      document.addEventListener("click", function(event) {                 
        var isClickInput = dropBox.contains(event.target);                  
        if(dropdown.classList.contains('show')){
            if(!isClickInput){   
                setTimeout(() => {
                input.value = '';
                dropdownItems.forEach((item)=>{
                      item.style.display = "block";
                });
                      dropdown.classList.remove("show");
                }, 10);
            }        
        }         
      }); 

      input.addEventListener("input", function () {
        const filterText = input.value.toLowerCase();

        dropdownItems.forEach((item) => {
          const itemText = item.textContent.toLowerCase();
          if (itemText.startsWith(filterText)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });

      dropdownItems.forEach((item) => {
        item.addEventListener("click", function () {
          input.value = this.textContent;
          dropdown.classList.remove("show");
        });
      });
    });
  }
});
