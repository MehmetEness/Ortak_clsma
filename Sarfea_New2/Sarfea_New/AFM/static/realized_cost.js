var textCells = document.querySelectorAll(
  "#table tbody td:nth-child(2), #table tbody td:nth-child(3),#table tbody td:nth-child(4), #table-2 tbody td:nth-child(2), #table-2 tbody td:nth-child(3), #table-2 tbody td:nth-child(4)"
);
var tlCells = document.querySelectorAll(
  "#table tbody td:nth-child(5), #table-2 tbody td:nth-child(5), #total-cost-table tbody td:nth-child(2), #total-cost-table tbody td:nth-child(4)"
);
var kurCells = document.querySelectorAll(
  "#table tbody td:nth-child(6), #table-2 tbody td:nth-child(6)"
);
var usdCells = document.querySelectorAll(
  "#table tbody td:nth-child(7), #table-2 tbody td:nth-child(7), #total-cost-table tbody td:nth-child(3), #total-cost-table tbody td:nth-child(5)"
);
var companyLinks = document.querySelectorAll(".company-link");
let view1 = document.querySelectorAll(".view-1");
let view2 = document.querySelectorAll(".view-2");
let leftTotalTL = document.getElementById("solTableToplamTL");
let leftTotalUSD = document.getElementById("solTableToplamUSD");
let rightTotalTL = document.getElementById("sagTableToplamTL");
let rightTotalUSD = document.getElementById("sagTableToplamUSD");
let genaralTotalTL = document.getElementById("genelToplamTL");
let generalTotalUSD = document.getElementById("genelToplamUSD");

let T_leftTotalTL = document.getElementById("solTotalTableToplamTL");
let T_leftTotalUSD = document.getElementById("solTotalTableToplamUSD");
let T_rightTotalTL = document.getElementById("sagTotalTableToplamTL");
let T_rightTotalUSD = document.getElementById("sagTotalTableToplamUSD");

let leftTable = document.querySelector("#table");
let rightTable = document.querySelector("#table-2");
let totalTable = document.querySelector("#total-cost-table");
let thRowsLeft = leftTable.querySelectorAll("th");
let thRowsRight = rightTable.querySelectorAll("th");
let thRowsTotal = totalTable.querySelectorAll("th");
let leftTableResult;
let rightTableResult;

//                  TABLO FORMATLAMA

tableFormat(textCells, "text");
tableFormat(tlCells, "tl");
tableFormat(kurCells, "kur");
tableFormat(usdCells, "usd");

//                  FİRMALARA GÖRE TABLO GÖSTERME

companyLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    var selectedCompany = this.dataset.company;
    var allRows = document.querySelectorAll(".table-row");
    allRows.forEach(function (row) {
      row.style.display = "none";
    });
    var selectedRows = document.querySelectorAll(
      '.table-row[data-company="' + selectedCompany + '"]'
    );
    selectedRows.forEach(function (row) {
      row.style.display = "";
    });
  });
});

//                  FİRMA BUTONLARININ TIKLAMA OLAYI

companyLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    companyLinks.forEach(function (li) {
      li.style.backgroundColor = "";
      li.style.color = "";
    });
    this.style.backgroundColor = "#7597c0";
    this.style.color = "#2c3e50";
    totalShow();
  });
});
function totalShow() {
  for (let index of view1) {
    index.style.display = "flex";
  }
  for (let index of view2) {
    index.style.display = "none";
  }
  setTimeout(function () {
    fetchDataFromTable();
  }, 100);

  function fetchDataFromTable() {
    leftTableResult = tableTopla(leftTable);
    leftTotalTL.textContent =
      formatNumber(leftTableResult.totalTLFunction, 2) + " ₺";
    leftTotalUSD.textContent =
      formatNumber(leftTableResult.totalUSDFunction, 2) + " $";

    rightTableResult = tableTopla(rightTable);
    rightTotalTL.textContent =
      formatNumber(rightTableResult.totalTLFunction, 2) + " ₺";
    rightTotalUSD.textContent =
      formatNumber(rightTableResult.totalUSDFunction, 2) + " $";

    leftTableResult = tableTopla(leftTable);
    rightTableResult = tableTopla(rightTable);
    x = parseFloat(
      (
        leftTableResult.totalTLFunction - rightTableResult.totalTLFunction
      ).toFixed(4)
    );
    y = parseFloat(
      (
        leftTableResult.totalUSDFunction - rightTableResult.totalUSDFunction
      ).toFixed(4)
    );
    genaralTotalTL.textContent = formatNumber(x, 2) + " ₺";
    generalTotalUSD.textContent = formatNumber(y, 2) + " $";
  }
}

//                  İLK FİRMAYA TIKLAMA

if (companyLinks[0]) {
  setTimeout(function () {
    companyLinks[0].click();
  }, 10);
}

//                  TABLOLARI TOPLAMA İŞLEMLERİ

totalTableTopla(totalTable);
function totalTableTopla(table) {
  let leftTotalTLFunction = 0.0;
  let leftTotalUSDFunction = 0.0;
  let rightTotalTLFunction = 0.0;
  let rightTotalUSDFunction = 0.0;

  const dataRows = table.querySelectorAll("tbody tr");
  dataRows.forEach((row) => {
    if (window.getComputedStyle(row).getPropertyValue("display") !== "none") {
      const cells = row.querySelectorAll("td");
      if (cells[1].textContent != "NaN") {
        leftTotalTLFunction += birimSil(cells[1].textContent);
      }
      if (cells[2].textContent != "NaN") {
        leftTotalUSDFunction += birimSil(cells[2].textContent);
      }
      if (cells[3].textContent != "NaN") {
        rightTotalTLFunction += birimSil(cells[3].textContent);
      }
      if (cells[4].textContent != "NaN") {
        rightTotalUSDFunction += birimSil(cells[4].textContent);
      }
    }
  });
  leftTotalUSDFunction = parseFloat(leftTotalUSDFunction.toFixed(4));
  leftTotalTLFunction = parseFloat(leftTotalTLFunction.toFixed(4));
  rightTotalUSDFunction = parseFloat(rightTotalUSDFunction.toFixed(4));
  rightTotalTLFunction = parseFloat(rightTotalTLFunction.toFixed(4));

  T_leftTotalTL.textContent = formatNumber(leftTotalTLFunction, 2) + "₺";
  T_leftTotalUSD.textContent = formatNumber(leftTotalUSDFunction, 2) + "$";
  T_rightTotalTL.textContent = formatNumber(rightTotalTLFunction, 2) + "₺";
  T_rightTotalUSD.textContent = formatNumber(rightTotalUSDFunction, 2) + "$";
}
function tableTopla(table) {
  const columnIndex1 = 4;
  const columnIndex2 = 6;
  let totalTLFunction = 0.0;
  let totalUSDFunction = 0.0;

  const dataRows = table.querySelectorAll("tbody tr");
  dataRows.forEach((row) => {
    if (window.getComputedStyle(row).getPropertyValue("display") !== "none") {
      const cells = row.querySelectorAll("td");
      if (cells[columnIndex2].textContent != "NaN") {
        totalUSDFunction += birimSil(cells[columnIndex2].textContent);
      }
      if (cells[columnIndex1].textContent != "NaN") {
        totalTLFunction += birimSil(cells[columnIndex1].textContent);
      }
    }
  });
  totalUSDFunction = parseFloat(totalUSDFunction.toFixed(4));
  totalTLFunction = parseFloat(totalTLFunction.toFixed(4));
  return { totalTLFunction, totalUSDFunction };
}
function birimSil(inputString) {
  const withoutSymbols = inputString.replace(/₺|\$|\,/g, "");
  const number = parseFloat(withoutSymbols.replace());
  return number;
}

//                  TABLO SIRALAMA

thRowsLeft.forEach(header => {
  header.addEventListener("click", function() {        
      var columnIndex = Array.from(thRowsLeft).indexOf(header);
      sortTable(leftTable, columnIndex);
  });
});
thRowsRight.forEach(header => {
  header.addEventListener("click", function() {        
      var columnIndex = Array.from(thRowsRight).indexOf(header);
      sortTable(rightTable, columnIndex);
  });
});
thRowsTotal.forEach(header => {
  header.addEventListener("click", function() {        
      var columnIndex = Array.from(thRowsTotal).indexOf(header);
      sortTable(totalTable, columnIndex);
  });
});

//                  TOPLAM MALİYET TABLOSU GÖSTERME

document  .getElementById("toplam-maliyet").addEventListener("click", function () {
    for (let index of view1) {
      index.style.display = "none";
    }
    for (let index of view2) {
      index.style.display = "block";
    }
  });

//                  TABLO FİLİTRELEME

searchInput.addEventListener("input", function(){
  filterTable(searchInput, leftTable);
  filterTable(searchInput, rightTable);
  filterTable(searchInput, totalTable);
});
clearButton.addEventListener("click", function() {
  searchInput.value = "";
  showAllRows(leftTable);
  showAllRows(rightTable);
  showAllRows(totalTable);
});

//            ***** DOM EVENTS *****

document.addEventListener("DOMContentLoaded", function () {});
