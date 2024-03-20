const jobHistoryTable = document.querySelector('#jobhistory_table');
const jobHistoryTableBody = jobHistoryTable.querySelector('tbody');
const expensesTable = document.querySelector('#expenses_table');
const expensesTableBody = expensesTable.querySelector('tbody');
const totalTable = document.querySelector('#total_table');
const totalTableBody = totalTable.querySelector('tbody');

const expensesDateInput = document.querySelector("#id_Date_Expenses");
const expensesAmountInput = document.querySelector("#id_Amount_Expenses");

const jobhistoryDateInput = document.querySelector("#id_Date_JobHistory");
const jobhistoryAmountInput = document.querySelector("#id_Amount_JobHistory");

const projectId = document.querySelector(".table__header p").id;
let supplierId = 0;
//                  JOBHISTORY TABLE

async function getJobhistory(id) {
    try {
        let currentRows = jobHistoryTable.querySelectorAll("tr");
        //const data = await apiFunctions("job_history", "GET")
        //console.log(data)
        const data = await apiFunctions("project", "GETID", "x", projectId)
        let rows = '';
        let totalTlSpan = document.querySelector("#jobhistory_tl_td");
        let totalUSDSpan = document.querySelector("#jobhistory_usd_td");
        let totalTl = 0;
        let totalUSD = 0;
        for (const jobHistory of data.project_jobhistories) {
            if (jobHistory.supplier_jobhistories.id == id) {
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
                totalTl += parseFloat(jobHistory.Amount_JobHistory);
                totalUSD += (parseFloat(jobHistory.Amount_JobHistory) / parseFloat(jobHistory.Dollar_Rate_JobHistory));
            }
        }
        totalTlSpan.textContent = formatNumber(parseFloat(totalTl.toString()), 2);
        totalUSDSpan.textContent = formatNumber(parseFloat(totalUSD.toString()), 2);
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
async function getExpenses(id) {
    try {
        let currentRows = expensesTableBody.querySelectorAll("tr");
        //const data = await apiFunctions("expense", "GET")
        //console.log(data)
        const data = await apiFunctions("project", "GETID", "x", projectId)
        let totalTlSpan = document.querySelector("#expenses_tl_td");
        let totalUSDSpan = document.querySelector("#expenses_usd_td");
        let totalTl = 0;
        let totalUSD = 0;
        let rows = '';
        for (const expenses of data.project_expenses) {
            if (expenses.supplier_expenses.id == id) {
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
                totalTl += parseFloat(expenses.Amount_Expenses);
                totalUSD += (parseFloat(expenses.Amount_Expenses) / parseFloat(expenses.Dollar_Rate_Expenses));
            }
            totalTlSpan.textContent = formatNumber(parseFloat(totalTl.toString()), 2);
            totalUSDSpan.textContent = formatNumber(parseFloat(totalUSD.toString()), 2);
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
async function getTotalTable() {
    try {
        let currentRows = totalTableBody.querySelectorAll("tr");
        //const data = await apiFunctions("expense", "GET")
        //console.log(data)
        const data = await apiFunctions("project", "GETID", "x", projectId)

        let totalTlLeft = 0;
        let totalUSDLeft = 0;
        let totalTlRight = 0;
        let totalUSDRight = 0;
        console.log(data)
        var supplierList = {};

        data.project_expenses.forEach(function (obj) {

            var supplierName = obj.supplier_expenses.CompanyName_Supplier;
            if (!supplierList.hasOwnProperty(supplierName)) {
                supplierList[supplierName] = {
                    id: obj.supplier_expenses.id,
                    name: obj.supplier_expenses.CompanyName_Supplier,
                    expensesTl: parseFloat(obj.Amount_Expenses),
                    expensesUsd: parseFloat(obj.Amount_USD_Expenses)
                };
            } else {
                if (typeof supplierList[supplierName].expensesTl !== 'number') {
                    supplierList[supplierName].expensesTl = 0;
                }
                if (typeof supplierList[supplierName].expensesUsd !== 'number') {
                    supplierList[supplierName].expensesUsd = 0;
                }
                supplierList[supplierName].expensesTl += parseFloat(obj.Amount_Expenses);
                supplierList[supplierName].expensesUsd += parseFloat(obj.Amount_USD_Expenses);
            }
        });
        data.project_jobhistories.forEach(function (obj) {
            var supplierName = obj.supplier_jobhistories.CompanyName_Supplier;

            if (!supplierList.hasOwnProperty(supplierName)) {
                supplierList[supplierName] = {
                    id: obj.supplier_jobhistories.id,
                    name: obj.supplier_jobhistories.CompanyName_Supplier,
                    jobHistoryTl: parseFloat(obj.Amount_JobHistory),
                    jobhistoryUsd: parseFloat(obj.Amount_USD_JobHistory)
                };
            } else {
                if (isNaN(parseFloat(supplierList[supplierName].jobHistoryTl))) {
                    supplierList[supplierName].jobHistoryTl = 0;
                }
                if (isNaN(parseFloat(supplierList[supplierName].jobhistoryUsd))) {
                    supplierList[supplierName].jobhistoryUsd = 0;
                }
                supplierList[supplierName].jobHistoryTl += parseFloat(obj.Amount_JobHistory);
                supplierList[supplierName].jobhistoryUsd += parseFloat(obj.Amount_USD_JobHistory);
            }
        });
        let totalTlSpanLeft = document.querySelector("#total_left_tl_td");
        let totalUSDSpanLeft = document.querySelector("#total_left_usd_td");
        let totalTlSpanRight = document.querySelector("#total_right_tl_td");
        let totalUSDSpanRight = document.querySelector("#total_right_usd_td");
        let rows = '';
        for (var key in supplierList) {
            const row = `
                <tr>              
                    <td></td>      
                    <td>${supplierList[key].name}</td>
                    <td>${supplierList[key].jobHistoryTl}</td>
                    <td>${supplierList[key].jobhistoryUsd}</td>
                    <td>${supplierList[key].expensesTl}</td>
                    <td>${supplierList[key].expensesUsd}</td>
                </tr>`;
            rows += row;
            totalTlLeft += !isNaN(parseFloat(supplierList[key].jobHistoryTl)) ? parseFloat(supplierList[key].jobHistoryTl) : 0;
            
            totalUSDLeft += !isNaN(parseFloat(supplierList[key].jobhistoryUsd)) ? parseFloat(supplierList[key].jobhistoryUsd) : 0;
            
            totalTlRight += !isNaN(parseFloat(supplierList[key].expensesTl)) ? parseFloat(supplierList[key].expensesTl) : 0;
            
            totalUSDRight += !isNaN(parseFloat(supplierList[key].expensesUsd)) ? parseFloat(supplierList[key].expensesUsd) : 0;
            
        }
        totalTlSpanLeft.textContent = formatNumber(parseFloat(totalTlLeft.toString()), 2);
        totalUSDSpanLeft.textContent = formatNumber(parseFloat(totalUSDLeft.toString()), 2);
        totalTlSpanRight.textContent = formatNumber(parseFloat(totalTlRight.toString()), 2);
        totalUSDSpanRight.textContent = formatNumber(parseFloat(totalUSDRight.toString()), 2);
        if (true) {
            totalTableBody.innerHTML = '';
            totalTableBody.insertAdjacentHTML('beforeend', rows);
            sortTableForStart(totalTable, 1);
            expensesTableFormat();
            totalTableFormat()
            sortingTable(totalTable)
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


function expensesTableFormat() {
    var usdCells = expensesTableBody.querySelectorAll("td:nth-child(7)");
    var tlCells = expensesTableBody.querySelectorAll("td:nth-child(5), td:nth-child(6)");
    var textCells = expensesTableBody.querySelectorAll("td:nth-child(2), td:nth-child(3), td:nth-child(4)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
    tableFormat(textCells, "text");
}
function jobhistoryTableFormat() {
    var usdCells = jobHistoryTableBody.querySelectorAll("td:nth-child(7)");
    var tlCells = jobHistoryTableBody.querySelectorAll("td:nth-child(5), td:nth-child(6)");
    var textCells = jobHistoryTableBody.querySelectorAll("td:nth-child(2), td:nth-child(3), td:nth-child(4)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
    tableFormat(textCells, "text");
}
function totalTableFormat() {
    var usdCells = totalTableBody.querySelectorAll("td:nth-child(4),td:nth-child(6)");
    var tlCells = totalTableBody.querySelectorAll("td:nth-child(3), td:nth-child(5)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
}

//                  İNPUT FORMATLAMA
const formatedInputs = document.querySelectorAll(".formatInputs");
inputsForFormat(formatedInputs);

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

// TARİH İNPUTLARI FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);


/***********************************************************
#                       EXPENSES ADD
***********************************************************/

const expensesAddForm = document.getElementById("expenses_add_form");
const expensesFormAddBtn = document.querySelector("#expenses-create-btn");
expensesFormAddBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    dateInputs.forEach(input => {
        input.value = formatDateForSubmit(input.value)
    })
    var formatInputss = expensesAddWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
        input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })
    if (true) {
        const formData = new FormData(expensesAddForm);

        const inputs = document.querySelectorAll(".expenses-add-window input[data-id]");
        inputs.forEach(input => {
            const dataId = input.getAttribute('data-id');
            formData.set(input.getAttribute('name'), dataId);
        });
        await apiFunctions("expense", "POST", formData);
        expensesAddWindow.style.display = "none";
        getCompany()
        getExpenses(supplierId)
        getSuppliers();
        clearInputAfterSave(expensesAddForm);
        getTotalTable();
    }
});
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
#                       JOBHİSTORY ADD
***********************************************************/
const jobhistoryAddForm = document.getElementById("jobhistory_add_form");
const jobhistoryFormAddBtn = document.querySelector("#jobhistory-create-btn");
jobhistoryFormAddBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    dateInputs.forEach(input => {
        input.value = formatDateForSubmit(input.value)
    })
    var formatInputss = jobhistoryAddWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
        input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })
    if (true) {

        const formData = new FormData(jobhistoryAddForm);
        const inputs = document.querySelectorAll(".jobhistory-add-window input[data-id]");
        inputs.forEach(input => {
            const dataId = input.getAttribute('data-id');
            formData.set(input.getAttribute('name'), dataId);
        });
        await apiFunctions("job_history", "POST", formData);
        jobhistoryAddWindow.style.display = "none";
        getCompany()
        getSuppliers();
        getJobhistory(supplierId)
        clearInputAfterSave(jobhistoryAddForm);
        getTotalTable();
    }
});

// TARİH İNPUTLARI FORMATLAMA
jobhistoryDateInput.addEventListener('input', function (event) {
    var userInput = jobhistoryDateInput.value;
    if (event.inputType !== 'deleteContentBackward') {
        jobhistoryDateInput.value = formatDate(userInput);
    }
});

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

//                    SUPPLİER ADD

const supplierAddForm = document.getElementById("supplier_add_form");
const supplerFormAddBtn = document.querySelector("#supplier_add_btn");
supplerFormAddBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    if (true) {
        const formData = new FormData(supplierAddForm);
        await apiFunctions("supplier", "POST", formData)
        supplierAddWindow.style.display = "none";
        getSuppliers();
        clearInputAfterSave(supplierAddForm);
    }
});

async function getSuppliers() {
    try {
        const data = await apiFunctions("supplier", "GET");
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



const totalTableBtn = document.querySelector("#toplam-maliyet");
const twoTableSection = document.querySelector("#two_table_section");
const totalTableSection = document.querySelector("#total_table_section");

totalTableBtn.addEventListener("click", () => {

    if (twoTableSection.style.display == "flex") {
        twoTableSection.style.display = "none";
        getTotalTable();
        totalTableSection.style.display = "flex";
    } else {
        twoTableSection.style.display = "flex";
        totalTableSection.style.display = "none";
    }
})

function getSupplierInfo(id) {
    twoTableSection.style.display = "flex";
    totalTableSection.style.display = "none";
    supplierId = id;
    getExpenses(id)
    getJobhistory(id)
}




const realizedCostCompnay = document.querySelector(".sidebar-links ul")
getCompany();
async function getCompany() {
    try {
        //const response = await apiFunctions("supplier", "GET")

        const data = await apiFunctions("project", "GETID", "x", projectId)
        var supplierList = {};

        data.project_expenses.forEach(function (obj) {
            var supplierName = obj.supplier_expenses.CompanyName_Supplier;
            if (!supplierList.hasOwnProperty(supplierName)) {
                supplierList[supplierName] = { id: obj.supplier_expenses.id, name: obj.supplier_expenses.CompanyName_Supplier };
            }
        });
        data.project_jobhistories.forEach(function (obj) {
            var supplierName = obj.supplier_jobhistories.CompanyName_Supplier;
            if (!supplierList.hasOwnProperty(supplierName)) {
                supplierList[supplierName] = { id: obj.supplier_jobhistories.id, name: obj.supplier_jobhistories.CompanyName_Supplier };
            }
        });
        realizedCostCompnay.innerHTML = "";
        for (var key in supplierList) {
            let li =
                `<li onclick="getSupplierInfo(this.id)" class="tooltip-element" data-tooltip="0" id="${supplierList[key].id}">
            <a href="#" class="active" data-active="0">
                <span class="link hide-for-menu">${supplierList[key].name}</span>
            </a>
        </li>`;
            realizedCostCompnay.insertAdjacentHTML("beforeend", li);
        }


    } catch (error) {
        console.error("Error fetching and rendering projects:", error);
    }
}

