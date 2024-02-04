var table = document.querySelector('#table');  
let thRows = table.querySelectorAll("th");
var rows = table.querySelectorAll("tbody")
var usdCells = document.querySelectorAll('#table td:nth-child(8)');  
var tlCells = document.querySelectorAll('#table td:nth-child(6)');
var kurCells = document.querySelectorAll('#table td:nth-child(7)');
var textCells = document.querySelectorAll('#table td:nth-child(2), #table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(5)');



//                  TABLO SIRALAMA

thRows.forEach(header => {
  header.addEventListener("click", function() {        
      var columnIndex = Array.from(thRows).indexOf(header);
      sortTable(table, columnIndex);
  });
});

//                  SEARCH İŞLEMLERİ

searchInput.addEventListener("input", function(){
  filterTable(searchInput, table);
});
clearButton.addEventListener("click", function() {
  searchInput.value = "";
  showAllRows(table);
});




//                  DOM LOADED

document.addEventListener("DOMContentLoaded", function () {

  //Tablo Formatlama
  
  tableFormat(usdCells, "usd")
  tableFormat(kurCells, "kur")
  tableFormat(tlCells, "tl")
  tableFormat(textCells, "text")
  
});





//--------------------------------------------------------------------------------

function formatNumber4(number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits:4 , maximumFractionDigits: 4 }).format(number.toFixed(4));

}
function formatNumber2(number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits:2 , maximumFractionDigits: 2 }).format(number.toFixed(4));

}

 


let tableResult;
  let genaralTotalTL = document.getElementById("total-amount-TL");
  let generalTotalUSD = document.getElementById("total-amount-USD");     
  




totalShow();
function totalShow(){
setTimeout(function() {fetchDataFromTable();}, 0);

  function fetchDataFromTable() {
      // tabloyu topla ve sonuçları ekrana yaz
   tableResult = tableTopla(table);
  
   genaralTotalTL.textContent = formatNumber2(tableResult.totalTLFunction)+" ₺" ; 
   generalTotalUSD.textContent =  formatNumber2(tableResult.totalUSDFunction)+" $" ; 
   
  }    
}


function tableTopla(table){
const columnIndex1 = 4;
const columnIndex2 = 6;
let totalTLFunction=0.0;
let totalUSDFunction=0.0;


const dataRows = table.querySelectorAll("tbody tr");
dataRows.forEach(row => {
  const cells = row.querySelectorAll("td"); 
  if (window.getComputedStyle(row).getPropertyValue('display') !== 'none') {
      const cells = row.querySelectorAll("td");    
     
      
        totalUSDFunction += birimSil(cells[columnIndex2].textContent);         
        totalTLFunction += birimSil(cells[columnIndex1].textContent);    
  }
});
totalUSDFunction = parseFloat(totalUSDFunction.toFixed(2))
totalTLFunction = parseFloat(totalTLFunction.toFixed(2))

return { totalTLFunction, totalUSDFunction };
}
/* Gelen verinin birimini silip int veren fonksiyon */


function birimSil(inputString) {
  let number;
  const withoutSymbols = inputString.replace(/₺|\$|\,/g, "");
  if (!isNaN(parseFloat(withoutSymbols))) {
    number = parseFloat(withoutSymbols);
  } else {
    number = 0;
  }
  
  return number;
}




/*    Tabloyu Formatlama    */
document.addEventListener("DOMContentLoaded", function () {
  // Tablodaki tüm satırları seç
  var rows = document.querySelectorAll(".table-row");

  rows.forEach(function (row) {
    // 4. sütunu al, temizle ve sayıya çevir
    var amountTL = row.querySelector('.amount-column');
    var amountTLValue = parseFloat(removeSymbols(amountTL.textContent));

    // NaN veya None kontrolü ekleyerek sıfır ata
    amountTLValue = isNaN(amountTLValue) || amountTLValue === null ? 0 : amountTLValue;

    // 6. sütunu al, temizle ve sayıya çevir
    var amountUSD = row.querySelector('.amount-column2');
    var amountUSDValue = parseFloat(removeSymbols(amountUSD.textContent));

    // NaN veya None kontrolü ekleyerek sıfır ata
    amountUSDValue = isNaN(amountUSDValue) || amountUSDValue === null ? 0 : amountUSDValue;
    
     // 5. sütunu al, temizle ve sayıya çevir
     var amountKur = row.querySelector('.amount-kur');
     var amountKurValue = parseFloat(removeSymbols(amountKur.textContent));
 
     // NaN veya None kontrolü ekleyerek sıfır ata
     amountKurValue = isNaN(amountKurValue) || amountKurValue === null ? 0 : amountKurValue;
     

    // Temizlenmiş değerleri para birimi şeklinde formatla
    var formattedAmountTL = formatCurrency2(amountTLValue, '₺');
    var formattedAmountKur = formatCurrency4(amountKurValue, '₺');
    var formattedAmountUSD = formatCurrency2(amountUSDValue, '$');

    // Sonuçları ekrana yaz
    amountTL.textContent = formattedAmountTL;
    amountKur.textContent = formattedAmountKur;
    amountUSD.textContent = formattedAmountUSD;
  });

});

// Sembol ve boşlukları temizleyen yardımcı fonksiyon
function removeSymbols(value) {
  return value.replace(/[#,$,\s]/g, '');
}

// Sayıyı para birimi şeklinde formatlayan yardımcı fonksiyon
function formatCurrency4(value, currencySymbol) {
  return value.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ' + currencySymbol;
}
function formatCurrency2(value, currencySymbol) {
  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ' + currencySymbol;
}



/* Dolar Kuru Hesaplama*/

class Currency{
  constructor(){
      this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_xuCNEXC9y3nPruX5UWrRUfxyn5oTSP4ZxH07E6d9&base_currency=";
  }

async  exchange(){
  const response =    await fetch(this.url);
  const result = await response.json();    

  return result.data["TRY"];
  }
}

const amountInput = document.querySelector("#id_Amount_Incomes");
const resultInput = document.querySelector("#id_Dollar_Rate_Incomes"); 

const currency = new Currency();

runEventListeners();

function runEventListeners(){
    amountInput.addEventListener("input",exchange);
    
}


function exchange(){ 

  currency.exchange()
  .then((result) => {
    resultInput.value = result.toFixed(4)
  })

}