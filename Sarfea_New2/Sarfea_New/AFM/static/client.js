const clientTable = document.querySelector("#client_table");
const clientTableBody = clientTable.querySelector("tbody");
const clientAddBtn = document.querySelector(".client-add-btn");

var reqInputs = document.querySelectorAll("#id_CompanyName_Supplier");
var reqLabels = document.querySelectorAll("#firma_adi_span");
var phoneInput = document.querySelector("#id_PhoneNumber");
const clientAddForm = document.getElementById("client_add_form");

document.addEventListener("DOMContentLoaded", async () => {
  await getClient();
  setInterval(async function () {
    await getClient();
  }, 5000);
});

async function getClient(isEdit) {

  let currentRows = clientTableBody.querySelectorAll("tr");
  const data = await apiFunctions("client", "GET");
  let rows = "";
  for (const client of data) {
    const row = `
          <tr>
              <td>
                  <button id="${client.id}" type="button" class="edit-client-btn" style="background: none; border:none;">
                      <i id="edit-text" class="fa-solid fa-pen-to-square"></i>
                  </button>
              </td>
              <td>${client.CompanyName_Clients}</td>
              <td>${client.ContactPerson}</td>
              <td>${client.PhoneNumber}</td>
              <td>${client.Email}</td>
              <td>${client.Location}</td>
          </tr>
      `;
    rows += row;
  }
  if (data.length > currentRows.length || isEdit) {
    clientTableBody.innerHTML = "";
    clientTableBody.insertAdjacentHTML("beforeend", rows);
    sortTableForStart(clientTable, 1);
    sortingTable(clientTable);
    allTableFormat();
    editBtns()
  }
}

//                  OPEN ADD WİNDOW

const clientFormAddBtn = document.querySelector("#kaydet_btn");
const formTitle = document.querySelector(".title");
var editMode = false;
let clientId;

const clientAddWindow = document.querySelector(".client-add-window");
clientAddBtn.addEventListener("click", () => {
  setTimeout(() => {
    editMode = false;
    formTitle.textContent = "Tedarikci Ekle";
    clientAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("mousedown", (event) => {
  const clientAddContainer = document.querySelector(
    ".client-add-window .container"
  );
  if (!clientAddContainer.contains(event.target)) {
    clientAddWindow.style.display = "none";
  }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    clientAddWindow.style.display = "none";
    clientAddForm.reset();
  });
});
//                  EDİT BUTONLARI


//                  TELEFON NUMARASI FORMATLAMA

phoneInput.addEventListener("input", function (event) {
  var contryNumber = "+90";
  var inputValue = phoneInput.value;
  if (event.inputType !== "deleteContentBackward") {
    phoneInput.value = formatPhoneNumberByCountryCode(inputValue, contryNumber);
  }
});
//                  TABLO FORMATLAMA

function allTableFormat() {
  var textCells = clientTable.querySelectorAll(
    "td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6)"
  );
  tableFormat(textCells, "text");
}
//                  CLİENT ADD FUNCTİON

let = btnID = -1;
const supplierFormAddBtn = document.querySelector("#kaydet_btn");
supplierFormAddBtn.addEventListener("click", async function (event) {
  var firmaInput = document.querySelector("#id_CompanyName_Supplier")
  var firmaSpan = document.querySelector("#firma_adi_span")
  event.preventDefault();

  if (requiredInputs(reqInputs, reqLabels) && await clientNameControl(firmaInput, firmaSpan)) {
    if (editMode == false) {
      const formData = new FormData(clientAddForm);
      await apiFunctions("client", "POST", formData);
      getClient();
      clientAddWindow.style.display = "none";
      clearInputAfterSave(clientAddForm);
    } else {
      await apiFunctions("client", "PUT", clientAddForm, btnID);
      getClient("EDİT");
      clientAddWindow.style.display = "none";
      clearInputAfterSave(clientAddForm);
    }
  }
});

//                  SUPPLİER EDİT FUNCTİON

function editBtns() {
  let editButtons = document.querySelectorAll(".edit-client-btn");
  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTimeout(async () => {
        editMode = true;
        btnID = button.id;
        formTitle.textContent = "Düzenle";
        const data = await apiFunctions("client", "GETID", "x", btnID)
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var element = document.querySelector('input[name="' + key + '"]');
            if (element) {
              element.value = data[key];
            }
          }
        }
        clientAddWindow.style.display = "flex";
      }, 10);
    })
  });
}