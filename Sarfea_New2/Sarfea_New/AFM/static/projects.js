const projectsTable = document.querySelector("#project_table");
const projectsTableBody = projectsTable.querySelector("tbody");

var usdCells = document.querySelectorAll("#table td:nth-child(6)");
var numericCells = document.querySelectorAll(
  "#table td:nth-child(4), #table td:nth-child(5)"
);
var textCells = document.querySelectorAll(
  "#table td:nth-child(3), #table td:nth-child(7), #table td:nth-child(8)"
);
const incomeDateInput = document.querySelector("#id_ChekDate_Incomes");
const incomeLastDateInput = document.querySelector("#id_LastChekDate_Incomes");
const incomeAmountInput = document.querySelector("#id_Amount_Incomes");
const incomePaymentTypeInput = document.getElementById(
  "id_PaymentType_Incomes"
);

const expensesDateInput = document.querySelector("#id_Date_Expenses");
const expensesAmountInput = document.querySelector("#id_Amount_Expenses");

const jobhistoryDateInput = document.querySelector("#id_Date_JobHistory");
const jobhistoryAmountInput = document.querySelector("#id_Amount_JobHistory");

document.addEventListener("DOMContentLoaded", async () => {
  await getProjects();
  setInterval(async function () {
    await getProjects();
  }, 5000);
});

async function getProjects(isEdit) {
  try {
    let currentRows = projectsTable.querySelectorAll("tbody tr");

    const data = await apiFunctions("project", "GET");
    console.log(data);
    let formattedDate;
    let rows = "";
    for (const project of data) {
      if (project.StartDate) {
        let date = new Date(project.StartDate);
        formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
      } else { formattedDate = "-" }

      const projectDetailsUrl = `http://127.0.0.1:8000/project_details/${project.id}/`;

      const row = `
        <tr>
          <td>
            <button id="${project.id}" type="button" class="edit-project-btn" style="background: none; border:none;">
              <i id="edit-text" class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
          <td><a href="${projectDetailsUrl}">${project.ProjectName}</a></td>
          <td>${project.Location}</td>
          <td>${project.AC_Power}</td>
          <td>${project.DC_Power}</td>
          <td>${project.CalculatedCost_NotIncludingKDV}</td>
          <td>${project.Terrain_Roof}</td>
          <td>${formattedDate}</td>
          <td>${project.Situation}</td>
        </tr>`;

      rows += row;
    }
    if (data.length > currentRows.length || isEdit) {
      projectsTableBody.innerHTML = "";
      projectsTableBody.insertAdjacentHTML("beforeend", rows);
      sortingTable(projectsTable);
      allTableFormat();
      editButtonsEvents();
    }
  } catch (error) {
    console.error("Error fetching and rendering clients:", error);
  }
}


//                  TABLO FORMATLAMA

function allTableFormat() {
  var usdCells = projectsTable.querySelectorAll("td:nth-child(6)");
  var numericCells = projectsTable.querySelectorAll(
    "td:nth-child(4), td:nth-child(5)"
  );
  var textCells = projectsTable.querySelectorAll(
    "td:nth-child(2), td:nth-child(3), td:nth-child(7), td:nth-child(8), td:nth-child(9)"
  );
  tableFormat(usdCells, "usd");
  tableFormat(numericCells, "numeric");
  tableFormat(textCells, "text");
}

//                  FİRMA EKLEME

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

const supplierAddWindow = document.querySelector(".supplier-add-window");
const supplierAddBtns = document.querySelectorAll(".paying-supplier-add-btn");

const supplierX = supplierAddWindow.querySelector(".close-window");
supplierAddBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      supplierAddWindow.style.display = "flex";
    }, 20);
  });
  document.addEventListener("click", (event) => {
    const supplierAddContainer = supplierAddWindow.querySelector(".container");
    if (!supplierAddContainer.contains(event.target)) {
      setTimeout(() => {
        supplierAddWindow.style.display = "none";
      }, 15);
    }
  });
});


//                  EKLEME BUTTONLARI

var projectAddWindow = document.querySelector(".project-add-window");
const projectAddWindowButton = document.querySelector(".project-add-btn");
var incomeAddWindow = document.querySelector(".income-add-window");
var incomeAddWindowButton = document.querySelector(".income-add-btn");
var expensesAddWindow = document.querySelector(".expenses-add-window");
var expensesAddWindowButton = document.querySelector(".expenses-add-btn");
var jobhistoryAddWindow = document.querySelector(".jobhistory-add-window");
var jobhistoryAddWindowButton = document.querySelector(".jobhistory-add-btn");
let editMode = false;
let projectId;

//----- PROJECT
projectAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    editMode = false;
    projectAddWindow.style.display = "flex";
    getClients();
  }, 10);
});
document.addEventListener("click", (event) => {
  const projectAddContainer = projectAddWindow.querySelector(".container");
  if (!projectAddContainer.contains(event.target) && clientAddWindow.style.display == "none") {
    projectAddWindow.style.display = "none";
  }
});
//----- İNCOME
incomeAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    incomeAddWindow.style.display = "flex";
    getClients();
    getprojectName()
  }, 10);
});
document.addEventListener("click", (event) => {
  const incomeAddContainer = incomeAddWindow.querySelector(".container");
  if (!incomeAddContainer.contains(event.target) && clientAddWindow.style.display == "none") {
    incomeAddWindow.style.display = "none";
  }
});
//----- EXPENSES
expensesAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    expensesAddWindow.style.display = "flex";
    getSuppliers()
    getprojectName()
  }, 10);
});
document.addEventListener("click", (event) => {
  const expensesAddContainer = expensesAddWindow.querySelector(".container");
  if (!expensesAddContainer.contains(event.target) && supplierAddWindow.style.display == "none") {
    expensesAddWindow.style.display = "none";
  }
});
//----- JOBHİSTORY
jobhistoryAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    jobhistoryAddWindow.style.display = "flex";
    getSuppliers()
    getprojectName()
  }, 10);
});
document.addEventListener("click", (event) => {
  const jobhistoryAddContainer =
    jobhistoryAddWindow.querySelector(".container");
  if (!jobhistoryAddContainer.contains(event.target) && supplierAddWindow.style.display == "none") {
    jobhistoryAddWindow.style.display = "none";
  }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnParentDiv = btn.parentElement;
    if (btnParentDiv && btnParentDiv.parentElement) {
      setTimeout(() => { btnParentDiv.parentElement.style.display = "none"; }, 10);
    }
  });
});

//                  EDİT BUTONLARI

// function editButtonsEvents() {
//   const editButtons = projectsTable.querySelectorAll(
//     "tr td:first-child button"
//   );
//   editButtons.forEach((btn) => {
//     btn.addEventListener("click", async () => {
//       projectId = btn.id;
//       const response = await fetch(`http://127.0.0.1:8000/get_project_id/${projectId}`);
//       const data = await response.json();
//       console.log(data)
//       document.querySelector('input[name="CompanyName"]').value = data.CompanyName;
//       document.querySelector('input[name="ProjectName"]').value = data.ProjectName;
//       document.querySelector('input[name="ProjectCode"]').value = data.ProjectCode;
//       document.querySelector('select[name="CompanyUndertakingWork"]').value = data.CompanyUndertakingWork;
//       document.querySelector('input[name="Location"]').value = data.Location;
//       document.querySelector('input[name="Cost_NotIncludingKDV"]').value = data.Cost_NotIncludingKDV;
//       document.querySelector('input[name="AC_Power"]').value = data.AC_Power;
//       document.querySelector('input[name="DC_Power"]').value = data.DC_Power;
//       document.querySelector('input[name="CalculatedCost_NotIncludingKDV"]').value = data.CalculatedCost_NotIncludingKDV;
//       document.querySelector('input[name="StartDate"]').value = data.StartDate;
//       document.querySelector('input[name="FinishDate"]').value = data.FinishDate;
//       document.querySelector('input[name="KDV_Rate"]').value = data.KDV_Rate;
//       document.querySelector('select[name="Terrain_Roof"]').value = data.Terrain_Roof;
//       document.querySelector('select[name="Incentive"]').value = data.Incentive;
//       setTimeout(() => {
//         editMode = true
//         projectAddWindow.style.display = "flex";
//       }, 10);
//     });
//   });
// }

// TARİH İNPUTLARI FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);

// INPUT FORMATLAMA
//inputForFormat(incomeAmountInput);
const formatedInputs = document.querySelectorAll(".formatInputs");
inputsForFormat(formatedInputs);

//                  PROJECT EDİT FUNCTİON

let btnID = -1;
function editButtonsEvents() {
  let editButtons = document.querySelectorAll(".edit-project-btn");
  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTimeout(async () => {
        editMode = true;
        btnID = button.id;
        const data = await apiFunctions("project", "GETID", "x", btnID)
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var element = document.querySelector('input[name="' + key + '"]');
            var selectElement = document.querySelector('select[name="' + key + '"]');
            if (element) {
              element.value = data[key];
            } else if (selectElement) {
              selectElement.value = data[key];
            }
          }
        }
        onPageLoads(formatedInputs)
        formatDateInputsForLoad(dateInputs)
        projectAddWindow.style.display = "flex";
      }, 10);
    })
  });
}

/***********************************************************
#                       İNCOME ADD - EDİT
***********************************************************/



// ÇEK SON KULLANIM İNPUT
if (incomePaymentTypeInput.value == "cek") {
  incomeLastDateInput.disabled = false;
  incomeLastDateInput.value = "";
} else {
  incomeLastDateInput.disabled = true;
}
incomePaymentTypeInput.addEventListener("change", () => {
  const selectedOption =
    incomePaymentTypeInput.options[incomePaymentTypeInput.selectedIndex].text;
  if (selectedOption.startsWith("Çek")) {
    incomeLastDateInput.disabled = false;
  } else {
    incomeLastDateInput.disabled = true;
    incomeLastDateInput.value = "";
  }
});

// KUR HESAPLAMA
var incomeKurInput = document.querySelector("#id_Dollar_Rate_Incomes");
var incomeTimeForKur = document.querySelector("#income-kur-time");

incomeTimeForKur.addEventListener("change", async function () {
  const secilenDeger = incomeTimeForKur.value;
  if (secilenDeger === "secenek1") {
  } else if (secilenDeger === "secenek2") {
    tarih = birGunOncekiTarih(incomeDateInput.value);
    incomeKurInput.value = await getUSDKur(tarih);
    console.log(await getUSDKur(tarih));
  } else if (secilenDeger === "secenek3") {
    console.log("fds");
    tarih = tarihFormatiniDegistir(incomeDateInput.value);
    incomeKurInput.value = await getUSDKur(tarih);
  }
});



/***********************************************************
#                       EXPENSES ADD - EDİT
***********************************************************/

// INPUTLARI FORMATLAMA
inputForFormat(expensesAmountInput);

// TARİH İNPUT FORMATLAMA
expensesDateInput.addEventListener("input", function (event) {
  var userInput = expensesDateInput.value;
  if (event.inputType !== "deleteContentBackward") {
    expensesDateInput.value = formatDate(userInput);
  }
});

// KUR HESAPLAMA
var expensesKurInput = document.querySelector("#id_Dollar_Rate_Expenses");
var expensesTimeForKur = document.querySelector("#expenses-kur-time");

expensesTimeForKur.addEventListener("change", async function () {
  const secilenDeger = expensesTimeForKur.value;
  if (secilenDeger === "secenek1") {
  } else if (secilenDeger === "secenek2") {
    tarih = birGunOncekiTarih(expensesDateInput.value);
    expensesKurInput.value = await getUSDKur(tarih);
  } else if (secilenDeger === "secenek3") {
    tarih = tarihFormatiniDegistir(expensesDateInput.value);
    expensesKurInput.value = await getUSDKur(tarih);
  }
});

/***********************************************************
#                       JOBHİSTORY ADD - EDİT
***********************************************************/

// TARİH İNPUTLARI FORMATLAMA
jobhistoryDateInput.addEventListener('input', function (event) {
  var userInput = jobhistoryDateInput.value;
  if (event.inputType !== 'deleteContentBackward') {
    jobhistoryDateInput.value = formatDate(userInput);
  }
});

// INPUT FORMATLAMA
inputForFormat(jobhistoryAmountInput);

// KUR HESAPLAMA
var jobhistoryKurInput = document.querySelector("#Dollar_Rate_JobHistory");
var jobhistoryTimeForKur = document.querySelector("#jobhistory-kur-time");

jobhistoryTimeForKur.addEventListener("change", async function () {
  const secilenDeger = jobhistoryTimeForKur.value;
  if (secilenDeger === "secenek1") {
  } else if (secilenDeger === "secenek2") {
    tarih = birGunOncekiTarih(jobhistoryDateInput.value);
    jobhistoryKurInput.value = await getUSDKur(tarih);
  } else if (secilenDeger === "secenek3") {
    tarih = tarihFormatiniDegistir(jobhistoryDateInput.value);
    jobhistoryKurInput.value = await getUSDKur(tarih);
  }
});

/***********************************************************
#                       PROJECT ADD - EDİT
***********************************************************/
const projectAddForm = document.getElementById("project_add_form");
const projectFormAddBtn = document.getElementById("project-create-btn");
projectFormAddBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (editMode == false) {
    await apiFunctions("project", "POST", projectAddForm);
    getProjects()
    console.log("asd")
    projectAddWindow.style.display = "none";
    clearInputAfterSave(projectAddForm);
  } else {
    await apiFunctions("project", "PUT", projectAddForm, btnID);
    getProjects("EDİT")
    projectAddWindow.style.display = "none";
    clearInputAfterSave(projectAddForm);
  }
});

/***********************************************************
#                       CLİENT SUPPLİER ADD 
***********************************************************/
const clientAddForm = document.getElementById("firma_add_form");
const clientFormAddBtn = document.querySelector("#firma_submit_btn");
clientFormAddBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (true) {
    const formData = new FormData(firma_add_form);
    try {
      const response = await fetch("http://127.0.0.1:8000/post_client/", {
        method: "POST",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: formData,
      });
      clientAddWindow.style.display = "none";
      getClients();
      clearInputAfterSave(clientAddForm);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
});
const supplierAddForm = document.getElementById("supplier_add_form");
const supplerFormAddBtn = document.querySelector("#supplier_add_btn");
supplerFormAddBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (true) {
    const formData = new FormData(supplier_add_form);
    try {
      const response = await fetch("http://127.0.0.1:8000/post_supplier/", {
        method: "POST",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: formData,
      });
      supplierAddWindow.style.display = "none";
      getSuppliers();
      clearInputAfterSave(supplierAddForm);
    } catch (error) {
      console.error("There was an error!", error);
    }
  }
});










//                  DROPDOWN MENÜLER

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
async function getSuppliers() {
  try {
    const data = await apiFunctions("supplier", "GET")
    let rows = "";
    for (const supplier of data) {
      const row = `<span value="${supplier.id}" class="dropdown-item">${supplier.CompanyName_Supplier}</span>`;
      rows += row;
    }
    const supplierDropdowns = document.querySelectorAll(".supplier_dropdown");
    supplierDropdowns.forEach(async (supplierDropdown) => {
      supplierDropdown.innerHTML = rows;
    })
    dropdownActive();
  } catch (error) {
    console.error("Error fetching and rendering projects:", error);
  }
}
async function getprojectName() {
  try {
    const data = await apiFunctions("project", "GET")
    let rows = "";
    for (const project of data) {
      const row = `<span value="${project.id}" class="dropdown-item">${project.ProjectName}</span>`;
      rows += row;
    }
    const projectDropdowns = document.querySelectorAll(".projects_dropdown");
    projectDropdowns.forEach(async (projectDropdown) => {
      projectDropdown.innerHTML = rows;
    })
    dropdownActive();
  } catch (error) {
    console.error("Error fetching and rendering projects:", error);
  }
}