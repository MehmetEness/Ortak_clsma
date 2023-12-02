document.getElementById("gelir-ac").addEventListener("click", function(){
  document.querySelector(".gelirWindow").style.display = "flex";    
});
document.getElementById("gelir-modal").addEventListener("click", function(){
  document.querySelector(".gelirWindow").style.display = "none";
});
document.getElementById("last-date-add-btn").addEventListener("click", function () {
document.querySelector(".chek-last-date-box").style.display = "block";
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
  console.log(numericCells);
  numericCells.forEach(function (cell) {
    var numericValue = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
    cell.textContent = formatNumber(numericValue);
});
});

function formatNumber(number) {
return new Intl.NumberFormat('en-US').format(number.toFixed(2));

}

 

//--------------------------------------------------------------------------------
let tableResult;
  let genaralTotalTL = document.getElementById("total-amount-TL");
  let generalTotalUSD = document.getElementById("total-amount-USD");     
  let table = document.querySelector("#table");  




totalShow();
function totalShow(){
  // 1 saniye beklemek için setTimeout kullanılır
setTimeout(function() {
  // Buraya tablodan veri çekme işlemini ekleyin
  fetchDataFromTable();
}, 0); // 1000 milisaniye (1 saniye) beklenir

  function fetchDataFromTable() {
      // tabloyu topla ve sonuçları ekrana yaz
   tableResult = tableTopla(table);
   genaralTotalTL.textContent = "₺" + formatNumber(tableResult.totalTLFunction);
   generalTotalUSD.textContent = "$" + formatNumber(tableResult.totalUSDFunction); 
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
      // columnIndex1 ve columnIndex2 değişkenlerinin tanımlı olduğunu varsayalım
      console.log(cells[columnIndex2].textContent);
      console.log(cells[columnIndex1].textContent);
      if(cells[columnIndex2].textContent != "None$"){
          totalUSDFunction += birimSil(cells[columnIndex2].textContent);
      }
      if(cells[columnIndex1].textContent != "None₺"){
        totalTLFunction += birimSil(cells[columnIndex1].textContent);
    }
  }
});
totalUSDFunction = parseFloat(totalUSDFunction.toFixed(2))
totalTLFunction = parseFloat(totalTLFunction.toFixed(2))
return { totalTLFunction, totalUSDFunction };
}
/* Gelen verinin birimini silip int veren fonksiyon */

function birimSil(inputString) {
const withoutSymbols = inputString.replace(/₺|\$|\,/g, "");
const number = parseFloat(withoutSymbols.replace());
return number;
}