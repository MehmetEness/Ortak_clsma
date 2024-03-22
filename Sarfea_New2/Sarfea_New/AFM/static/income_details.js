//                  EKLEME BUTTONLARI

var incomeAddWindow = document.querySelector('.income-add-window');
var incomeAddWindowButton = document.querySelector('.income-add-btn');
var incomeTable = document.querySelector('#income_table');
var incomeTableBody = incomeTable.querySelector('tbody');
var incomeTableFoot = incomeTable.querySelector('tfoot');
const clientAddWindow = document.querySelector(".client-add-window");

const incomeDateInput = document.querySelector("#id_ChekDate_Incomes");
const incomeLastDateInput = document.querySelector("#id_LastChekDate_Incomes");
const incomeAmountInput = document.querySelector("#id_Amount_Incomes");
const incomePaymentTypeInput = document.getElementById("id_PaymentType_Incomes");

const incomeP = document.querySelector("#income_p")
incomeP.textContent = formatNumber(parseFloat(incomeP.textContent.replace(",", "."), 2)) + " $";
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
            <td>${income.client_incomes.CompanyName_Clients}</td>
            <td>${income.CompanyName_ReceivePayment_Incomes}</td>
            <td>${formattedDate}</td>
            <td>${income.PaymentType_Incomes}</td>
            <td>${income.Amount_Incomes}</td>
            <td>${income.Dollar_Rate_Incomes}</td>            
            <td>${parseFloat(income.Amount_Incomes) / parseFloat(income.Dollar_Rate_Incomes)}</td>
          </tr>`;
            rows += row;
            totalTl += parseFloat(income.Amount_Incomes || 0);
            totalUsd += (parseFloat(income.Amount_Incomes) / parseFloat(income.Dollar_Rate_Incomes)) || 0;
            //console.log(totalTl)
            //console.log(totalUsd)
        }

        if (data.length > currentRows.length || currentRows.length == 1) {
            document.querySelector("#tl_td").innerHTML = "";
            document.querySelector("#tl_td").insertAdjacentHTML("beforeend", formatNumber(totalTl, 2) + "₺");
            document.querySelector("#usd_td").innerHTML = "";
            document.querySelector("#usd_td").insertAdjacentHTML("beforeend", formatNumber(totalUsd, 2) + "$");
            incomeTableBody.innerHTML = "";
            incomeTableBody.insertAdjacentHTML("beforeend", rows);
            document.querySelector("#result_td").textContent = formatNumber(parseFloat(clearForSubmit(incomeP.textContent)) - parseFloat(totalUsd), 2) + "$";
            sortingTable(incomeTable);
            allTableFormat();
            //editButtonsEvents();
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

// TARİH İNPUTLARI FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);

// INPUT FORMATLAMA
//inputForFormat(incomeAmountInput);
const formatedInputs = document.querySelectorAll(".formatInputs");
inputsForFormat(formatedInputs);


/***********************************************************
#                       İNCOME ADD 
***********************************************************/

const incomeAddForm = document.getElementById("income_add_form");
const incomeFormAddBtn = document.querySelector("#income-create-btn");
incomeFormAddBtn.addEventListener("click", async function (event) {

    event.preventDefault();
    dateInputs.forEach(input => {
        input.value = formatDateForSubmit(input.value)
    })
    var formatInputss = incomeAddWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
        input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })
    if (true) {
        const formData = new FormData(incomeAddForm);
        const inputs = document.querySelectorAll(".income-add-window input[data-id]");
        inputs.forEach(input => {
            const dataId = input.getAttribute('data-id');
            formData.set(input.getAttribute('name'), dataId);
        });
        let formDataString = '';

        for (const [name, value] of formData) {
            formDataString += `${name}: ${value}\n`;
        }

        console.log(formDataString);
        await apiFunctions("income", "POST", formData);
        incomeAddWindow.style.display = "none";
        getClients();
        clearInputAfterSave(incomeAddForm);
    }
});

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



