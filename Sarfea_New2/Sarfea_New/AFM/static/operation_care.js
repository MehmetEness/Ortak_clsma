var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var faturaTable = document.querySelector("#fatura_table");
var isletmeBakimTable = document.querySelector("#isletme_bakim_table");
var arizaTakipTable = document.querySelector("#ariza_takip_table");


const reqIncomeInputs = document.querySelectorAll("#id_Operation_Care_Company")
const reqIncomeLabels = document.querySelectorAll("#firma_adi_span")



 document.addEventListener("DOMContentLoaded", function () {
    //                  CARD NONE VERİLERİ DÜZELTME
  
    topMenuLi[0].classList.add("li-hover");
    document.querySelector(".first_sorting_element").click();
    });





// TARİH İNPUTLARI FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);

// INPUT FORMATLAMA
const formatedInputs = document.querySelectorAll(".formatInputs");
inputsForFormat(formatedInputs);

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




//-----               EKLEME SAYFALARI
const operationCareAddWindowButton = document.querySelector("#operation_care_add_btn")
const operationCareAddWindow = document.querySelector(".operation-care-add-window")

//        FİRMA EKLEME
const clientAddWindow = document.querySelector(".client-add-window");
const companyAddBtns = document.querySelectorAll(".paying-company-add-btn");
const companyX = clientAddWindow.querySelector(".close-window");
companyAddBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      clientAddWindow.style.display = "flex";
    }, 20);
  });
  document.addEventListener("click", (event) => {
    const clientAddContainer = clientAddWindow.querySelector(".container");
    if (!clientAddContainer.contains(event.target)) {
      setTimeout(() => {
        clientAddWindow.style.display = "none";
      }, 15);
    }
  });
});

//        BAKIM EKLEME
operationCareAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    operationCareAddWindow.style.display = "flex";
    //getSuppliers()
    //getprojectName()
  }, 10);
});
document.addEventListener("mousedown", (event) => {
  const operationCareAddContainer = operationCareAddWindow.querySelector(".container");
  if (!operationCareAddContainer.contains(event.target)  && clientAddWindow.style.display == "none") {
    operationCareAddWindow.style.display = "none";
  }
});

// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnParentDiv = btn.parentElement;
    if (btnParentDiv && btnParentDiv.parentElement) {
      setTimeout(() => {
        btnParentDiv.parentElement.style.display = "none";
        clearInputAfterSave(btn.nextElementSibling.nextElementSibling);
      }, 10);
    }
  });
});




/***********************************************************
#                       SALES OFFER ADD 
***********************************************************/

const operationCareAddForm = document.getElementById("operation_care_add_form");
const operationCareFormAddBtn = document.querySelector("#operation-care-create-btn");
operationCareFormAddBtn.addEventListener("click", async function (event) {

  event.preventDefault();

  if (requiredInputs(reqIncomeInputs, reqIncomeLabels)) {

    dateInputs.forEach(input => {
      input.value = formatDateForSubmit(input.value)
    })
    var formatInputss = operationCareAddWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
      input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })

    const formData = new FormData(operationCareAddForm);
    const jsonObject = {};

for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
}

console.log(JSON.stringify(jsonObject));
    const inputs = document.querySelectorAll(".operation-care-add-window input[data-id]");
    inputs.forEach(input => {
      const dataId = input.getAttribute('data-id');
      formData.set(input.getAttribute('name'), dataId);
    });

    await apiFunctions("operation_care", "POST", formData);
    operationCareAddWindow.style.display = "none";
    getClients();
    clearInputAfterSave(operationCareAddForm);
  }
});

//                  DROPDOWN MENÜLER
getClients()
async function getClients() {
  try {
    const data = await apiFunctions("client", "GET")
    let rows = "";
    for (const client of data) {
      const row = `<span value="${client.id}" class="dropdown-item">${client.CompanyName_Clients}</span>`;
      rows += row;
    }
    const clientDropdowns = document.querySelectorAll(".client-dropdown");
    clientDropdowns.forEach(async (clientDropdown) => {
      clientDropdown.innerHTML = rows;
    })
    dropdownActive();
  } catch (error) {
    console.error("Error fetching and rendering projects:", error);
  }
}