//                  EKLEME BUTTONLARI

var incomeAddWindow = document.querySelector('.income-add-window');
var incomeAddWindowButton = document.querySelector('.income-add-btn');
var incomeTable = document.querySelector('#income_table');
var incomeTableBody = incomeTable.querySelector('tbody');
var incomeTableFoot = incomeTable.querySelector('tfoot');
const clientAddWindow = document.querySelector(".client-add-window");
//----- İNCOME
incomeAddWindowButton.addEventListener("click", () => {
    getClients();
    setTimeout(() => { incomeAddWindow.style.display = "flex"; }, 30);
});
document.addEventListener('click', (event) => {
    const incomeAddContainer = incomeAddWindow.querySelector(".container");
    if (!incomeAddContainer.contains(event.target) && clientAddWindow.style.display == "none") {
        incomeAddWindow.style.display = "none";
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

//                  TABLO EKLEME

document.addEventListener("DOMContentLoaded", async () => {
    await getIncomes();
    setInterval(async function () {
        await getIncomes();
    }, 5000);
});
async function getIncomes() {
    try {
        let currentRows = incomeTable.querySelectorAll("tbody tr");
        let totalTl = 0;
        let totalUsd = 0;
        const data = await apiFunctions("income", "GET");
        console.log(data);
        let rows = "";
        for (const income of data) {
            let formattedDate;
            if (income.ChekDate_Incomes) {
                const date = new Date(income.ChekDate_Incomes);
                formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            } else {
                formattedDate = "-";
            }
            const row = `
          <tr>
            <td>
              <button id="${income.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">
                <i id="edit-text" class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>${income.CompanyName_Pay_Incomes}</td>
            <td>${income.CompanyName_ReceivePayment_Incomes}</td>
            <td>${formattedDate}</td>
            <td>${income.PaymentType_Incomes}</td>
            <td>${income.Amount_Incomes}</td>
            <td>${income.Dollar_Rate_Incomes}</td>            
            <td>${(income.Amount_Incomes) / (income.Dollar_Rate_Incomes)}</td>
          </tr>`;
            rows += row;
            totalTl += parseFloat(income.Amount_Incomes);
            totalUsd += parseFloat(income.Amount_Incomes) / parseFloat(income.Dollar_Rate_Incomes);
            console.log(totalTl)
            console.log(totalUsd)
        }

        if (data.length > currentRows.length || currentRows.length == 1) {
            document.querySelector("#tl_td").innerHTML = "";
            document.querySelector("#tl_td").insertAdjacentHTML("beforeend", formatNumber(totalTl, 2) + "₺");
            document.querySelector("#usd_td").innerHTML = "";
            document.querySelector("#usd_td").insertAdjacentHTML("beforeend", formatNumber(totalUsd, 2) + "$");
            incomeTableBody.innerHTML = "";
            incomeTableBody.insertAdjacentHTML("beforeend", rows);
            sortingTable(incomeTable);
            allTableFormat();
            // editButtonsEvents();
        }
    } catch (error) {
        console.error("Error fetching and rendering clients:", error);
    }
}

function allTableFormat() {
    var usdCells = incomeTable.querySelectorAll("td:nth-child(8)");
    var tlCells = incomeTable.querySelectorAll("td:nth-child(6), td:nth-child(7)");
    var textCells = incomeTable.querySelectorAll("td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5)");
    tableFormat(usdCells, "usd");
    tableFormat(tlCells, "tl");
    tableFormat(textCells, "text");
}

/***********************************************************
#                       CLİENT SUPPLİER ADD 
***********************************************************/
//                  FİRMA EKLEME

const companyAddBtns = document.querySelectorAll(".paying-company-add-btn");

const companyX = clientAddWindow.querySelector(".close-window");
companyAddBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("fsdas")
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

//                  İNCOME FORM EKLEME

const incomeAddForm = document.getElementById("income_add_form");
const incomeFormAddBtn = document.querySelector("#income-create-btn");
incomeFormAddBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    if (true) {
        const formData = new FormData(income_add_form);
        try {
            const response = await fetch("http://127.0.0.1:8000/post_income/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: formData,
            });
            incomeAddWindow.style.display = "none";
            getIncomes();
            clearInputAfterSave(incomeAddForm);
        } catch (error) {
            console.error("There was an error!", error);
        }
    }
});

//                  DROPDOWN MENÜLER

async function getClients() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/get_clients/`);
        const data = await response.json();
        let rows = "";
        //console.log(data)
        for (const client of data) {
            // console.log(client)
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