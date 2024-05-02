var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var anketContainer = document.querySelector(".anket-container");
var arizaTakipContainer = document.querySelector(".ariza_takip_container");
var bakimTakipContainer = document.querySelector(".bakim_takip_container");

document.addEventListener("DOMContentLoaded", function () {
  //                  CARD NONE VERİLERİ DÜZELTME

  topMenuLi[0].classList.add("li-hover");
});

//                  TOP MENÜ TIKLAMA

topMenuLi.forEach(function (item) {
  item.addEventListener("click", function () {
    topMenuLi.forEach(function (item) {
      item.classList.remove("li-hover");
    });
    this.classList.add("li-hover");
  });
});

function inventorLiClick() {
  var inventorLi = document.querySelectorAll("#inventors_row li");
  inventorLi.forEach(function (item) {
    item.addEventListener("click", function () {
      inventorLi.forEach(function (item) {
        item.classList.remove("inv-li-hover");
      });
      this.classList.add("inv-li-hover");
    });
  });
}


//                  ANKET YAZDIRMA

const anketDateSelect = document.querySelector(".date_select");
const operationCareId = document.querySelector(".operation_id").id;
anketDateSelect.addEventListener("change", async () => {
  console.log(anketDateSelect.value);
  var data = await apiFunctions("poll", "GET");
  document.querySelectorAll(".row .checkbox").forEach((item)=>{
    item.checked = false;
  })
  document.querySelectorAll('[name^="Note"]').forEach((item)=>{
    item.placeholder = "Not...";
  })
  document.querySelectorAll('[name="Cloumn_Organizer_left"]')[0].value = "";
  document.querySelectorAll('[name="Cloumn_Organize_Date_left"]')[0].value = "";
  document.querySelectorAll('[name="Cloumn_Looker_left"]')[0].value = "";
  document.querySelectorAll('[name="Cloumn_Looker_Date_left"]')[0].value = "";
  document.querySelectorAll('[name="Cloumn_Note_Text"]')[0].value = "";
  console.log("poll");
  console.log(data);
  if(data){
    data.forEach((poll)=>{
      if(poll.Poll_Operation_Care == operationCareId && poll.Poll_Date == anketDateSelect.value){      
        processData(poll);
      }
    })
  } 
});

function processData(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      if (key.startsWith("answer") && value != null) {
        const [note, index1, index2] = key.split("_");

        if (value == true) {
          const element = document.getElementById(
            `checkbox_${index1}_${index2}_1`
          );
          element.checked = true;
          // const element2 = document.getElementById(
          //   `checkbox_${index1}_${index2}_2`
          // );
          // element2.checked = false;

        } else if (value == false) {
          const element2 = document.getElementById(
            `checkbox_${index1}_${index2}_1`
          );
          element2.checked = false;
          // const element = document.getElementById(
          //   `checkbox_${index1}_${index2}_2`
          // );
          // element.checked = true;
        }
      }
      if (key.startsWith("Note") && value != null) {
        const [note, index1, index2] = key.split("_");     
          const element = document.getElementsByName(`Note_${index1}_${index2}`);
          element[0].placeholder = value;
        
      }
      if (key == "Cloumn_Note_Text" && value != null) {      
          const element = document.getElementsByName("Cloumn_Note_Text_Left");
          element[0].value = value;        
      }
      if (key == "Cloumn_Organizer" && value != null) {          
        const element = document.getElementsByName("Cloumn_Organizer_left");
        element[0].value = value;        
      }
      if (key == "Cloumn_Organize_Date" && value != null) {          
        const element = document.getElementsByName("Cloumn_Organize_Date_left");
        element[0].value = value;        
      }
      if (key == "Cloumn_Looker" && value != null) {          
        const element = document.getElementsByName("Cloumn_Looker_left");
        element[0].value = value;        
      }
      if (key == "Cloumn_Looker_Date" && value != null) {          
        const element = document.getElementsByName("Cloumn_Looker_Date_left");
        element[0].value = value;        
      }
    }
  }
}

//                    ANKET TARİH İNPUTU FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);

//                  TOP MENU FONKSİYONLARI

topMenuLi.forEach(function (item) {
  item.addEventListener("click", function () {
    var clickedItemId = this.id;
    handleMenuItemClick(clickedItemId);
  });
});
function handleMenuItemClick(clickedItemId) {
  switch (clickedItemId) {
    case "bakim_kontrol_listesi":
      anketContainer.style.display = "block";
      arizaTakipContainer.style.display = "none";
      bakimTakipContainer.style.display = "none";
      break;
    case "ariza_takip":
      anketContainer.style.display = "none";
      arizaTakipContainer.style.display = "block";
      bakimTakipContainer.style.display = "none";
      break;
    case "bakim_takip":
      anketContainer.style.display = "none";
      arizaTakipContainer.style.display = "none";
      bakimTakipContainer.style.display = "flex";
      break;
    default:
      break;
  }
}

async function getAndaRenderList() {
  try {
    const response = await fetch("/get_operation_care/");

    const data = await response.json();
    const inventors = data.operation_care;
    inventors.forEach((inventor) => {
      if (inventor.id == 5) {
        const tbody = document.querySelector(".inventor_table_body");
        tbody.innerHTML = "";
        for (let i = 0; i < inventor.Operation_Care_Number_Str; i++) {
          const row =
            "<tr>" +
            `<td><span>İnventör 1</span></td>` +
            "<td>" +
            inventor.Operation_Care_Direction +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_Number_Str +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_Panel_Power +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_VOC +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_Panel_Brand +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_Panel_Number_Str +
            "</td>" +
            "<td>OK</td>" +
            "<td>" +
            inventor.Operation_Care_Capacity +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_AC_Power +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_DC_Power +
            "</td>" +
            "<td>" +
            inventor.Operation_Care_DC_Power +
            "</td>" +
            "<td>0.01</td>" +
            "<td>500</td>" +
            "</tr>";
          tbody.insertAdjacentHTML("beforeend", row);
        }
      }
    });
  } catch (event) {
    console.log(event);
  }
}

//------------------------------------------



//-----------------
getAndRenderStrings();
var inventorOwner = "-1";
async function getAndRenderStrings() {
  try {
    const data = await apiFunctions("inventor", "GET")
    console.log("inventor");
    console.log(data);    
    const operation_id = document.querySelector(".operation_id").id;
    const tbody = document.querySelector(".inventor_table_body");
    tbody.innerHTML = "";
    let i = 1;
    for (const inventor of data) {
      inventorOwner = inventor.Inventor_Owner;
      if (inventor.Inventor_Owner == operation_id) {
        const response2 = await fetch(`/get_strings/${inventor.id}/`);
        const data2 = await response2.json();
        const strings = data2.strings;
        let bool = true;
        console.log(strings);
        for (const string of strings) {
          let izalasyonValue = string.String_Izolasion || "OK";
          let izalasyonValue2 = "FAULT";
          if(izalasyonValue == "FAULT"){
            izalasyonValue2 = "OK";
          }

          const row = `
              <tr id="${string.id}">
                ${bool ? `<td class="rotate" rowspan="${strings.length}" onclick="editInventor(${inventor.id})"><span class="inventör${i}">İnventör ${i}</span></td>` : ""}
                <td style="width: 100px;">
                  <select name="String_Direction" data-owner="${string.String_Owner_id}" onchange="xfunction(${string.id}, this)" class="directionSelect">
                    <option disabled selected value="${string.String_Direction}" >${string.String_Direction}</option>
                    <option value="Kuzey">Kuzey</option>
                    <option value="Güney">Güney</option>
                    <option value="Doğu">Doğu</option>
                    <option value="Batı">Batı</option>
                  </select>
                </td>
                <td style="width: 90px;">
                  <input name="String_Number" data-owner="${string.String_Owner_id}" class="strNum" type="text" onblur="xfunction(${string.id}, this)"  value="${string.String_Number}">
                </td>
                <td style="width: 100px;">
                  <input name="String_Panel_Power" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strPnlPwr formatInputs" type="text" value="${string.String_Panel_Power}">
                </td>
                <td>
                  <input name="String_VOC" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strVOC formatInputs" type="text" value="${string.String_VOC}">
                </td>
                <td>
                  <input name="String_Panel_Brand" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strPnlBrnd" type="text" value="${string.String_Panel_Brand}">
                </td>
                <td>
                  <input name="String_Panel_SY" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strPnlSy" type="text" value="${string.String_Panel_SY}">
                </td>
                <td>
                  <select name="String_Izolasion" data-owner="${string.String_Owner_id}" onchange="xfunction(${string.id}, this)" class="izlsyn directionSelect">
                    <option disabled selected value="${string.String_Izolasion}" >${string.String_Izolasion}</option>
                    <option value="OK">OK</option>
                    <option value="FAULT">FAULT</option>
                  </select>
                </td>
                <td>
                  <input name="String_Capacity" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strCpt formatInputs" type="text" value="${string.String_Capacity}">
                </td>
                <td>
                  <input name="String_AC_Power" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strACPwr formatInputs" type="text" value="${string.String_AC_Power}">
                </td>
                <td>
                  <input name="String_DC_Power" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strDCPwr formatInputs" type="text" value="${string.String_DC_Power}">
                </td>
                <td>
                  <input name="String_Percent" data-owner="${string.String_Owner_id}" onblur="xfunction(${string.id}, this)" class="strPrcnt" type="text" value="${string.String_Percent}">
                </td>
                <td>
                  <input class="pnlV" type="text" value="0">
                </td>
              </tr>`;

          tbody.insertAdjacentHTML("beforeend", row);
          currentDirection(inventor);
          bool = false;
        }
        i++;
      }
     
    }
     // INPUT FORMATLAMA
     const formatedInputs = document.querySelectorAll(".formatInputs");
     inputsForFormat(formatedInputs);
     onPageLoads(formatedInputs)
    xxxx();
  } catch (error) {
    console.error("Error", error);
  }
}

async function xfunction(x, y){
  let formDatax = new FormData();
 //console.log(dataOwnerValue);
 formDatax.append(y.name, y.value);
 formDatax.append("String_Owner", y.getAttribute("data-owner"));
 const formDataObject = {};
    formDatax.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    // JavaScript nesnesini JSON formatına dönüştürün
    const formDataJson = JSON.stringify(formDataObject);
    
    // JSON formatındaki formData'yı konsola yazdırın
    console.log(formDataJson);
  await apiFunctions("string", "PUT", formDatax, x);
}
//getAndRenderInventors();
async function getAndRenderInventors() {
  try {
    const response = await fetch(`/get_inventors/10/`);
    const data = await response.json();
    const inventors = data.inventors;
    let inventorsRow = document.querySelector("#inventors_row");
    inventorsRow.innerHTML = "";
    let i = 1;
    for (const inventor of inventors) {
      const inventorName = `İnventör ${inventor.Inventor_Number}`;
      const tdElement = `<li onclick="getAndRenderStrings(${inventor.Inventor_Number})">${inventorName}</li>`;
      inventorsRow.insertAdjacentHTML("beforeend", tdElement);
    }

    //inventorLiClick();
    var inventorLi = document.querySelectorAll("#inventors_row li");
    inventorLi[0].classList.add("inv-li-hover");
  } catch (error) {
    console.error("Error", error);
  }
}

//                  YÖN KONTROLÜ YAPMA

function currentDirection(inventor) {
  var defaultDirection = inventor.Inventor_Direction;
  var directionSelect = document.querySelector(".directionSelect");
  var options = directionSelect.options;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value === defaultDirection) {
      options[i].selected = true;
      break;
    }
  }
}

//                  INVENTOR EDİT
let editMode = false;
let invID = -1;
var inventorEditWindow = document.querySelector(".inventor-edit-window");

async function editInventor(inventorId){
  editMode = true;
  invID = inventorId;
  const data = await apiFunctions("inventor", "GETID", "x", inventorId)
  console.log(data);
  for (var key in data) {
    console.log(key)
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
  setTimeout(() => {
    const formatedInputs = document.querySelectorAll(".formatInputs");
    onPageLoads(formatedInputs)
    inventorEditWindow.style.display = "flex";
  }, 10);
}
var inventorAddBtn = document.querySelector(".inventor_add_btn");
inventorAddBtn.addEventListener("click", ()=>{
  editMode = false;
  setTimeout(() => {    
    inventorEditWindow.style.display = "flex";
  }, 10);
})

/***********************************************************
#                       İNVENTÖR ADD - EDİT
***********************************************************/
const inventorEditForm = document.getElementById("inventor_add_form");
const inventorFormEditBtn = document.getElementById("inventor-edit-btn");
inventorFormEditBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  //if (requiredInputs(reqProjectInputs, reqProjectLabels) && await projectNameControl(projecInput, projectISpan, currentProjectName)) {
   
    var formatInputss = inventorEditWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
      input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })
    const formData = new FormData(inventorEditForm);
    formData.append("Inventor_Owner",inventorOwner)
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    // JavaScript nesnesini JSON formatına dönüştürün
    const formDataJson = JSON.stringify(formDataObject);
    
    // JSON formatındaki formData'yı konsola yazdırın
    console.log(formDataJson);

    if (editMode == false) {
      await apiFunctions("inventor", "POST", formData);
      inventorEditWindow.style.display = "none";
      clearInputAfterSave(inventorEditForm);
      getAndRenderStrings();
    } else {
      await apiFunctions("inventor", "PUT", formData, invID);
      inventorEditWindow.style.display = "none";
      clearInputAfterSave(inventorEditForm);
      getAndRenderStrings();
    }
  //}
});

document.addEventListener("mousedown", (event) => {
  const inventorEditContainer = inventorEditWindow.querySelector(".container");
  if (!inventorEditContainer.contains(event.target)) {
    inventorEditWindow.style.display = "none";
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

//                  ANKET VERİLERİNİ AL

var anketVerileri = {};

function kontrolEt(grupAdi) {
  var secilenDugme;
  var inputs = document.getElementsByName(grupAdi);

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      secilenDugme = inputs[i].value;
      break;
    }
  }

  if (secilenDugme) {
    anketVerileri[grupAdi] = secilenDugme;
    console.log("Anket verileri güncellendi:");
    console.log(anketVerileri);
  } else {
    console.log(grupAdi + " grubundan herhangi bir düğme seçilmedi.");
  }
}

const invFormSubmitBtn = document.querySelector("#invFormSubmitBtn");
function inventorFormSubmit() {
  const invFormSubmitBtn = document.querySelector("#invFormSubmitBtn");
  invFormSubmitBtn.addEventListener("click", () => {});
}

function xxxx() {
  let data = [];
  let tablerows = document.querySelectorAll(".bakim_takip_container tbody tr");

  tablerows.forEach((row) => {
    let cells = row.querySelectorAll("td:not(.rotate)");

    let rowData = {
      ID: row.id,
      YON: cells[0].querySelector("select").value,
      STRG_NUM: cells[1].querySelector("input").value,
      PNL_GUCU: cells[2].querySelector("input").value,
      VOC: cells[3].querySelector("input").value,
      PNL_MRK: cells[4].querySelector("input").value,
      PNL_SY: cells[5].querySelector("input").value,
      IZALASYON: cells[6].querySelector("select").value,
      TOPLAM_V: cells[7].querySelector("input").value,
      AC: cells[8].querySelector("input").value,
      DC: cells[9].querySelector("input").value,
      PERCENT: cells[10].querySelector("input").value,
      PANEL_V: cells[11].querySelector("input").value,
    };
    data.push(rowData);
  });

  //console.log(data);
}
var formData = new FormData();

function kontrolEt(name) {
  var radioButtons = document.getElementsByName(name);
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      var value = radioButtons[i].value;
      var data = {};
      data[name] = value;
      for (var key in data) {
        formData.append(key, data[key]);
      }
      break; // Break the loop since we found the checked radio button
    }
  }
}
function kontrolEtNots(name) {
  var input = document.getElementsByName(name)[0];
  var value = input.value;  
  formData.append(name, value);
}
function kontrolEtDates(date) {
  var input = document.getElementsByName(date)[0];
  var value = input.value;  
  console.log(input);
  console.log(value.length);
  if(value.length == 10){
    value = formatDateForSubmit(value)
    formData.append(date, value);
  }  
}
const anketAddButton = document.querySelector("#anket_submit_btn");
anketAddButton.addEventListener("click", async () => {
  console.log("formData");
  formData.append("Poll_Operation_Care", document.querySelector(".operation_id").id);
  var jsonObject = {};
  formData.forEach(function (value, key) {
    jsonObject[key] = value;
  });
  console.log(JSON.stringify(jsonObject));

  await apiFunctions("poll", "POST", formData);
  location.reload();
});
/******************************************************* */

const getInventor = async () =>{
  const response = await apiFunctions("operation_care", "GETID","x", "1")
  console.log(response)
}
//getInventor();





