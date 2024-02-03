// tablo sıralama    
var table = document.querySelector('#table');  
let thRows = table.querySelectorAll("th");
var rows = table.getElementsByTagName("tr")
var usdCells = document.querySelectorAll('#table td:nth-child(6)');  
var numericCells = document.querySelectorAll('#table td:nth-child(4), #table td:nth-child(5)');
var textCells = document.querySelectorAll('#table td:nth-child(3), #table td:nth-child(7), #table td:nth-child(8)');

var searchInput = document.getElementById("mysearch");
var clearButton = document.querySelector(".clear");

thRows.forEach(header => {
    header.addEventListener("click", function() {        
        var columnIndex = Array.from(thRows).indexOf(header);
        sortTable(table, columnIndex);
    });
});
//tablo filitreleme
searchInput.addEventListener("input", function(){
    filterTable(searchInput, table);
});
clearButton.addEventListener("click", function() {
    searchInput.value = "";
    showAllRows(table);
});


// DOMLoaded
document.addEventListener("DOMContentLoaded", function () {
    // tablo formatlama    
    tableFormat(usdCells, "usd")
    tableFormat(numericCells, "numeric")
    tableFormat(textCells, "text")
});