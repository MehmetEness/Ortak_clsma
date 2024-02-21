var table = document.querySelector('#table');  
let thRows = table.querySelectorAll("th");
var rows = table.querySelectorAll("tbody")
var usdCells = document.querySelectorAll('#table td:nth-child(8)');  
var tlCells = document.querySelectorAll('#table td:nth-child(6)');
var kurCells = document.querySelectorAll('#table td:nth-child(7)');
var textCells = document.querySelectorAll('#table td:nth-child(2), #table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(5)');
let genaralTotalTL = document.getElementById("total-amount-TL");
let generalTotalUSD = document.getElementById("total-amount-USD");    
let tableResult;  


//                  TABLO SIRALAMA

thRows.forEach(header => {
  header.addEventListener("click", function() {        
      var columnIndex = Array.from(thRows).indexOf(header);
      sortTable(table, columnIndex);
  });
});

//                  TABLO TOPLAMA FONKSİYONLARI

function tableSum(table, columnIndex1, columnIndex2){
  let totalTLFunction=0.0;
  let totalUSDFunction=0.0;
  
  const dataRows = table.querySelectorAll("tbody tr");
  dataRows.forEach(row => {
    if (window.getComputedStyle(row).getPropertyValue('display') !== 'none') {
        const cells = row.querySelectorAll("td");         
        totalUSDFunction += parseFloat(clear2(cells[columnIndex2].textContent));         
        totalTLFunction += parseFloat(clear2(cells[columnIndex1].textContent));    
    }
  });
  return { totalTLFunction, totalUSDFunction };
}
function totalShow(){
    setTimeout(function() {fetchDataFromTable();}, 10);
    function fetchDataFromTable() {
        tableResult = tableSum(table, 5, 7);
        genaralTotalTL.textContent = formatNumber(tableResult.totalTLFunction, 2)+" ₺" ; 
        generalTotalUSD.textContent =  formatNumber(tableResult.totalUSDFunction, 2)+" $" ; 
        
    }    
}

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
  totalShow();  
});












