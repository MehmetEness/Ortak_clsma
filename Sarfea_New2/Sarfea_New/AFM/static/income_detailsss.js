document.getElementById("gelir-ac").addEventListener("click", function(){
  document.querySelector(".gelirWindow").style.display = "flex";    
});
document.getElementById("gelir-modal").addEventListener("click", function(){
  document.querySelector(".gelirWindow").style.display = "none";
});

/* Dosya ekle */ 

// let gelirFileInput = document.getElementById("gelir-file-input");
// let gelirFileList = document.getElementById("gelir-files-list");
// let gelirNumOfFiles = document.getElementById("gelir-num-of-files");
// gelirFileInput.addEventListener("change", () => {
//     gelirFileList.innerHTML = "";
//     gelirNumOfFiles.textContent = `${gelirFileInput.files.length} Files Selected`;
//   for (i of gelirFileInput.files) {
//     let reader = new FileReader();
//     let listItem = document.createElement("li");
//     let fileName = i.name; 
//     let fileSize = (i.size / 1024).toFixed(1);
//     listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
//     if (fileSize >= 1024) {
//       fileSize = (fileSize / 1024).toFixed(1);
//       listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
//     }
//     gelirFileList.appendChild(listItem);
//   }
// });

// income_details.js

// income_details.js
document.addEventListener("DOMContentLoaded", function () {
  
  var numericCells = document.querySelectorAll('.table-row td:nth-child(4), .table-row td:nth-child(6)');  
  
  numericCells.forEach(function (cell) {
    var numericValue = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
    cell.textContent = formatNumber(numericValue);
});
});

function formatNumber(number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(number.toFixed(4));

}

 

//--------------------------------------------------------------------------------
let tableResult;
  let genaralTotalTL = document.getElementById("total-amount-TL");
  let generalTotalUSD = document.getElementById("total-amount-USD");     
  let table = document.querySelector("#table");  




totalShow();
function totalShow(){
setTimeout(function() {fetchDataFromTable();}, 0);

  function fetchDataFromTable() {
      // tabloyu topla ve sonuçları ekrana yaz
   tableResult = tableTopla(table);
  
   genaralTotalTL.textContent = formatNumber(tableResult.totalTLFunction)+" ₺" ; 
   generalTotalUSD.textContent =  formatNumber(tableResult.totalUSDFunction)+" $" ; 
   
  }    
}


function tableTopla(table){
const columnIndex1 = 3;
const columnIndex2 = 5;
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
totalUSDFunction = parseFloat(totalUSDFunction.toFixed(4))
totalTLFunction = parseFloat(totalTLFunction.toFixed(4))

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
    var formattedAmountTL = formatCurrency(amountTLValue, '₺');
    var formattedAmountKur = formatCurrency(amountKurValue, '₺');
    var formattedAmountUSD = formatCurrency(amountUSDValue, '$');

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
function formatCurrency(value, currencySymbol) {
  return value.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' ' + currencySymbol;
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