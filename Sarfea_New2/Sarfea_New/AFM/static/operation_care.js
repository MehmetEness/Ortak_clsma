var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var faturaTable = document.querySelector("#fatura_table");
var isletmeBakimTable = document.querySelector("#isletme_bakim_table");
var arizaTakipTable = document.querySelector("#ariza_takip_table");







 document.addEventListener("DOMContentLoaded", function () {
    //                  CARD NONE VERİLERİ DÜZELTME
  
    topMenuLi[0].classList.add("li-hover");
    document.querySelector(".first_sorting_element").click();
    });


//                  TABLO FORMATLAMA
isletmeTableFormat();
function isletmeTableFormat(){
  var numericCells = document.querySelectorAll('#isletme_bakim_table td:nth-child(3)');
  var tlCells = document.querySelectorAll('#isletme_bakim_table td:nth-child(5)');
  var textCells = document.querySelectorAll('#isletme_bakim_table td:nth-child(2), #isletme_bakim_table td:nth-child(4), #isletme_bakim_table td:nth-child(6), #isletme_bakim_table td:nth-child(7)');

  tableFormat(tlCells, "tl")
  tableFormat(numericCells, "numeric")
  tableFormat(textCells, "text")
}
arizaTableFormat();
function arizaTableFormat(){
  var textCells = document.querySelectorAll('#ariza_takip_table tr td:not(:first-child)');
  tableFormat(textCells, "text")
}
faturaTableFormat();
function faturaTableFormat(){
  var textCells = document.querySelectorAll('#ariza_takip_table tr td');
  tableFormat(textCells, "text")
}

//                  TOP MENÜ TIKLAMA

topMenuLi.forEach(function (item) {
    item.addEventListener("click", function () {
      topMenuLi.forEach(function (item) {
        item.classList.remove("li-hover");
      });
      this.classList.add("li-hover");
    });
  });

 //                  TOP MENU FONKSİYONLARI

topMenuLi.forEach(function (item) {
    item.addEventListener("click", function () {
      var clickedItemId = this.id;
      console.log(clickedItemId)
      handleMenuItemClick(clickedItemId);
    });
  });
  function handleMenuItemClick(clickedItemId) {
    switch (clickedItemId) {
      case "fatura":
        faturaTable.style.display = "table";
        isletmeBakimTable.style.display = "none";
        arizaTakipTable.style.display = "none";
        break;
      case "isletme_bakim":
        faturaTable.style.display = "none";
        isletmeBakimTable.style.display = "table";
        arizaTakipTable.style.display = "none";
        break;
      case "ariza_takip":
        faturaTable.style.display = "none";
        isletmeBakimTable.style.display = "none";
        arizaTakipTable.style.display = "table";
        break;        
      default:
        break;
    }
  }



var tarihRow = isletmeBakimTable.querySelectorAll("tbody tr")

dateFormatForColor(tarihRow,7);

//----------------------------------------------



sortingTable(document.querySelector("#isletme_bakim_table"))
sortingTable(document.querySelector("#fatura_table"))
sortingTable(document.querySelector("#ariza_takip_table"))


console.log(apiFunctions("sales_offer", "GET"))


