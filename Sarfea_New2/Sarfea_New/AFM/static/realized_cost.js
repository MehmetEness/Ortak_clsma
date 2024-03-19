const jobHistoryTable = document.querySelector('#jobhistory_table');
const jobHistoryTableBody = jobHistoryTable.querySelector('tbody');
const expensesTable = document.querySelector('#expenses_table');
const expensesTableBody = expensesTable.querySelector('tbody');


//                  JOBHISTORY TABLE

getJobhistory()
async function getJobhistory() {
    try {
        let currentRows = jobHistoryTable.querySelectorAll("tr");
        const data = await apiFunctions("job_history", "GET")
        //console.log(data)
        let rows = '';
        for (const jobHistory of data) {
            const row = `
        <tr>
          <td>
            <button id="${jobHistory.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">
              <i id="edit-text" class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
          <td>${jobHistory.Invoice_No_JobHistory}</td>
          <td>${jobHistory.Date_JobHistory}</td>
          <td>${jobHistory.ExpensDetails_JobHistory}</td>
          <td>${jobHistory.Amount_JobHistory}</td>
          <td>${jobHistory.Dollar_Rate_JobHistory}</td>
          <td>${parseFloat(jobHistory.Amount_JobHistory) / parseFloat(jobHistory.Dollar_Rate_JobHistory)}</td>
        </tr>`;
            rows += row;
        }
        //currentRows.length
        if (true) {
            jobHistoryTableBody.innerHTML = '';
            jobHistoryTableBody.insertAdjacentHTML('beforeend', rows);
            sortTableForStart(jobHistoryTable, 1);
            jobhistoryTableFormat()
            sortingTable(jobHistoryTable)
        }

    } catch (error) {
        console.error('Error fetching and rendering clients:', error);
    }
}
getExpenses()
async function getExpenses() {
    try {
        let currentRows = expensesTableBody.querySelectorAll("tr");
        const data = await apiFunctions("expense", "GET")
        console.log(data)
        let rows = '';
        for (const expenses of data) {
            const row = `
        <tr>
          <td>
            <button id="${expenses.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">
              <i id="edit-text" class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
          <td>${expenses.Date_Expenses}</td>
          <td>${expenses.ExpensDetails_Expenses}</td>
          <td>${expenses.Bank_Expenses}</td>
          <td>${expenses.Amount_Expenses}</td>
          <td>${expenses.Dollar_Rate_Expenses}</td>
          <td>${parseFloat(expenses.Amount_Expenses) / parseFloat(expenses.Dollar_Rate_Expenses)}</td>
        </tr>`;
            rows += row;
        }
        if (true) {
            expensesTableBody.innerHTML = '';
            expensesTableBody.insertAdjacentHTML('beforeend', rows);
            sortTableForStart(expensesTable, 1);
            expensesTableFormat();
            sortingTable(expensesTable)
        }

    } catch (error) {
        console.error('Error fetching and rendering clients:', error);
    }
}

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


function expensesTableFormat(){
    var usdCells = expensesTableBody.querySelectorAll("td:nth-child(7)");
    var tlCells = expensesTableBody.querySelectorAll("td:nth-child(5), td:nth-child(6)");
    var textCells = expensesTableBody.querySelectorAll("td:nth-child(2), td:nth-child(3), td:nth-child(4)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
    tableFormat(textCells, "text");
}

function jobhistoryTableFormat(){
    var usdCells = jobHistoryTableBody.querySelectorAll("td:nth-child(7)");
    var tlCells = jobHistoryTableBody.querySelectorAll("td:nth-child(5), td:nth-child(6)");
    var textCells = jobHistoryTableBody.querySelectorAll("td:nth-child(2), td:nth-child(3), td:nth-child(4)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
    tableFormat(textCells, "text");
}

//                  EKLEME BUTTONLARI

var expensesAddWindow = document.querySelector('.expenses-add-window');
var expensesAddWindowButton = document.querySelector('.expenses-add-btn');
var jobhistoryAddWindow = document.querySelector('.jobhistory-add-window');
var jobhistoryAddWindowButton = document.querySelector('.jobhistory-add-btn');

//----- EXPENSES
expensesAddWindowButton.addEventListener("click", () => {
    setTimeout(() => {
        expensesAddWindow.style.display = "flex";
        getSuppliers()
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

//                    SUPPLİER ADD

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

async function getSuppliers() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_suppliers/`);
        const data = await response.json();
        let rows = "";
        //console.log(data)
        for (const supplier of data) {
            // console.log(client)
            const row = `<span value="${supplier.id}" class="dropdown-item">${supplier.CompanyName_Supplier}</span>`;
            rows += row;
        }
        const supplierDropdowns = document.querySelectorAll(".supplier_dropdown");
        //console.log(supplierDropdowns)
        supplierDropdowns.forEach(async (supplierDropdown) => {
            supplierDropdown.innerHTML = rows;
        })
        dropdownActive();
    } catch (error) {
        console.error("Error fetching and rendering projects:", error);
    }
}






///---------///
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const totalTableBtn = document.querySelector("#toplam-maliyet");
const twoTableSection = document.querySelector("#two_table_section");
const totalTableSection = document.querySelector("#total_table_section");

totalTableBtn.addEventListener("click", () => {

    if (twoTableSection.style.display == "flex") {
        twoTableSection.style.display = "none";
        totalTableSection.style.display = "flex";
    } else {
        twoTableSection.style.display = "flex";
        totalTableSection.style.display = "none";
    }


})


const realizedCostCompnay = document.querySelector(".sidebar-links ul")
getCompany();
async function getCompany() {
    try {
        //const response = await apiFunctions("supplier", "GET")
        const data = await apiFunctions("supplier", "GET")
        realizedCostCompnay.innerHTML = "";
        data.forEach(supplier => {
            let li =
                `<li class="tooltip-element" data-tooltip="0" id="${supplier.id}">
                <a href="#" class="active" data-active="0">
                    <span class="link hide-for-menu">${supplier.CompanyName_Supplier}</span>
                </a>
            </li>`;
            realizedCostCompnay.insertAdjacentHTML("beforeend", li);
        })



    } catch (error) {
        console.error("Error fetching and rendering projects:", error);
    }
}

