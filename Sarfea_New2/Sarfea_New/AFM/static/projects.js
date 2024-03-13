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

async function getProjects() {
  try {
    let currentRows = projectsTable.querySelectorAll("tr");
    const response = await fetch(`/get_projects/`);
    const data = await response.json();
    const projects = data.projects;
    //console.log(projects);
    let rows = "";
    for (const project of projects) {
      const date = new Date(project.StartDate);
      const formattedDate = `${date.getDate()} ${getMonthName(
        date.getMonth()
      )} ${date.getFullYear()}`;
      var projectDetailsUrl = `/project_details/${project.id}/`;
      const row =
        "<tr>" +
        `<td>` +
        `<button id="${project.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">` +
        '<i id="edit-text" class="fa-solid fa-pen-to-square"></i>' +
        "</button>" +
        "</td>" +
        '<td><a href="' +
        projectDetailsUrl +
        '">' +
        project.ProjectName +
        "</a></td>" +
        "<td>" +
        project.Location +
        "</td>" +
        "<td>" +
        project.AC_Power +
        "</td>" +
        "<td>" +
        project.DC_Power +
        "</td>" +
        "<td>" +
        project.CalculatedCost_NotIncludingKDV +
        "</td>" +
        "<td>" +
        project.Terrain_Roof +
        "</td>" +
        "<td>" +
        formattedDate +
        "</td>" +
        "<td>" +
        project.Situation +
        "</td>" +
        "</tr>";
      rows += row;
    }
    if (projects.length > currentRows.length) {
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


async function getClients() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/get_clients/`);
    const data = await response.json();
    let rows = "";
    for (const client of data) {
      console.log(client)
      const row = `<td><a href="${projectDetailsUrl}">${project.ProjectName}</a></td>`;
      rows += row;
    }
    const projectsTableBody = document.querySelector("#projectsTableBody");
    if (projects.length > 0) {
      projectsTableBody.innerHTML = rows;
      sortingTable(projectsTableBody.parentElement);
      allTableFormat();
      editButtonsEvents();
    }
  } catch (error) {
    console.error("Error fetching and rendering projects:", error);
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
const companyX = document.querySelector(".close-company-window");
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
companyX.addEventListener("click", () => {
  setTimeout(() => {
    clientAddWindow.style.display = "none";
  }, 15);
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

//----- PROJECT
projectAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    projectAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("click", (event) => {
  const projectAddContainer = projectAddWindow.querySelector(".container");
  if (
    !projectAddContainer.contains(event.target) &&
    clientAddWindow.style.display == "none"
  ) {
    projectAddWindow.style.display = "none";
  }
});
//----- İNCOME
incomeAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    incomeAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("click", (event) => {
  const incomeAddContainer = incomeAddWindow.querySelector(".container");
  if (
    !incomeAddContainer.contains(event.target) &&
    clientAddWindow.style.display == "none"
  ) {
    incomeAddWindow.style.display = "none";
  }
});
//----- EXPENSES
expensesAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    expensesAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("click", (event) => {
  const expensesAddContainer = expensesAddWindow.querySelector(".container");
  if (
    !expensesAddContainer.contains(event.target) &&
    clientAddWindow.style.display == "none"
  ) {
    expensesAddWindow.style.display = "none";
  }
});
//----- JOBHİSTORY
jobhistoryAddWindowButton.addEventListener("click", () => {
  setTimeout(() => {
    jobhistoryAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("click", (event) => {
  const jobhistoryAddContainer =
    jobhistoryAddWindow.querySelector(".container");
  if (
    !jobhistoryAddContainer.contains(event.target) &&
    clientAddWindow.style.display == "none"
  ) {
    jobhistoryAddWindow.style.display = "none";
  }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    projectAddWindow.style.display = "none";
    incomeAddWindow.style.display = "none";
    expensesAddWindow.style.display = "none";
    jobhistoryAddWindow.style.display = "none";
  });
});

//                  EDİT BUTONLARI

function editButtonsEvents() {
  const editButtons = projectsTable.querySelectorAll(
    "tr td:first-child button"
  );
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let clickedButtonId = btn.id;
      setTimeout(() => {
        projectAddWindow.style.display = "flex";
      }, 10);
    });
  });
}
async function getProjects11() {
  try {
    const response = await fetch(`/get_dollar_rate/2024-03-10`);
    const data = await response.json();
    const projects = data.projects;
    console.log(projects);
  } catch (error) {
    console.error("Error fetching and rendering clients:", error);
  }
}

/***********************************************************
#                       İNCOME ADD - EDİT
***********************************************************/

// TARİH İNPUTLARI FORMATLAMA
incomeDateInput.addEventListener("input", function (event) {
  var userInput = incomeDateInput.value;
  if (event.inputType !== "deleteContentBackward") {
    incomeDateInput.value = formatDate(userInput);
  }
});
incomeLastDateInput.addEventListener("input", function (event) {
  var userInput = incomeLastDateInput.value;
  if (event.inputType !== "deleteContentBackward") {
    incomeLastDateInput.value = formatDate(userInput);
  }
});

// INPUT FORMATLAMA
inputForFormat(incomeAmountInput);

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
jobhistoryDateInput.addEventListener('input', function(event) {
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
