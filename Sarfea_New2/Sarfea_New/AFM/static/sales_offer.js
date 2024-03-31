var rowsElements = document.querySelectorAll(
  '.rows[data-situation="Potansiyel Müşteri"] .card-body , .rows[data-situation="Maliyet Hesaplama"] .card-body, .rows[data-situation="Fiyat Belirleme"] .card-body, .rows[data-situation="Teklif Hazırlama"] .card-body, .rows[data-situation="Teklif Hazır"] .card-body, .rows[data-situation="Teklif Sunuldu"] .card-body, .rows[data-situation="Sunum Sonrası Görüşme"] .card-body'
);
var numericCells = document.querySelectorAll(
  "#table td:nth-child(6), #table td:nth-child(7), #table td:nth-child(8), #table td:nth-child(9), #table td:nth-child(10), #table td:nth-child(11), #table td:nth-child(13), #table td:nth-child(14), #table td:nth-child(15), #table td:nth-child(16)"
);
var textCells = document.querySelectorAll(
  "#table td:nth-child(2), #table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(5), #table td:nth-child(12), #table td:nth-child(17)"
);
var mButtons = document.querySelectorAll(".mb");
var closeModal = document.querySelectorAll(".modal-kapat");
var fileBox = document.querySelector(".file_upload");
var details = document.querySelector(".details");
var detailsSpan = document.querySelector("#details_span");
var rightMenu = document.querySelector(".right-menu");
var leftMenu = document.querySelector("#nav-bar");
const reqSalesInputs = document.querySelectorAll("#id_Client_Card, #id_Person_Deal, #id_Location_Card");
const reqSalesLabels = document.querySelectorAll("#firma_adi_span, #ilgilenen_kisi_span, #konum_span");

var cardUlMenus = document.querySelectorAll(".card_menu");
let rows = document.querySelectorAll(".rows");
var topMenuLi = document.querySelectorAll(".top-menu-ul li");
let maniContainer = document.querySelector(".main-container");
let listContainer = document.querySelector(".list-container");
let lostJobContainer = document.querySelector(".lost-job-container");
let salesContainer = document.querySelector(".sales-container");
let wonContainer = document.querySelector(".won-container");
var tables = document.querySelectorAll(".table");

var listTable = document.querySelector('.list-container table');
var lostTable = document.querySelector('.lost-job-container table');
var salesTable = document.querySelector('.sales-container table');
var wonTable = document.querySelector('.won-container table');
let thRowsList = listTable.querySelectorAll("th");
let trRowsList = listTable.querySelectorAll("tr");
let thRowsLost = lostTable.querySelectorAll("th");
let thRowsSales = salesTable.querySelectorAll("th");
let thRowsWon = wonTable.querySelectorAll("th");


document.addEventListener("DOMContentLoaded", function () {
  //                  CARD NONE VERİLERİ DÜZELTME

  topMenuLi[2].classList.add("li-hover");



  //                  LİSTE İŞ RENGİ VERME

  trRowsList.forEach((row) => {
    let span = row.querySelector(".icon-blue")
    switch (row.className) {
      case "gain-job":
        span.style.color = "#38b000"
        break;

      case "lost-job":
        span.style.color = "#bf0603"

        break;

      case "wait-job":
        span.style.color = "#00296b"

        break;
      case "pot-mus":
        span.style.color = "#D0DDFB"

        break;
      case "mal-hes":
        span.style.color = "#9DB8FB"

        break;
      case "fi-be":
        span.style.color = "#ece75f"

        break;
      case "tek-hazırlama":
        span.style.color = "#e5de00"

        break;
      case "tek-hazır":
        span.style.color = "#e6cc00"

        break;
      case "tek-sunuldu":
        span.style.color = "#e69b00"

        break;
      case "sun-son-gor":
        span.style.color = "#e47200"

        break;
      default:
        break;
    }
  });
  //<span class="icon-blue"></span>

  //                  CARD TARİHE GÖRE SIRALAMA
  cardDateList(rowsElements);

  //                  TABLO FORMATLAMA

  tableFormat(numericCells, "numeric");
  tableFormat(textCells, "text");
});


function cardDateFormat() {
  var rowcards = document.querySelectorAll(".card");
  rowcards.forEach(function (item) {
    let cardTarih = item.querySelector("p:nth-child(2)");
    let araziCati = item.querySelector(".boxes:nth-of-type(4) p:nth-of-type(2)");
    if (araziCati.textContent == "None") {
      araziCati.textContent = "-";
    }
    if (cardTarih.textContent == "None" || cardTarih.textContent == "null") {
      cardTarih.textContent = "-";
    }
  });
}

//------------------------------------------------------------------------------------------------------------------

//                  DOSYA YÜKLEME İŞLEMLERİ
var cardId, fileType;

closeModal.forEach(function (item) {
  item.addEventListener("click", function () {
    fileBox.style.display = "none";
  });
});
document.getElementById("id_file_up").addEventListener("change", function () {
  var fileName = this.value.split("\\").pop();
  document.getElementById("details_span").innerText = fileName + " seçildi";
});
document.getElementById("submit_btn").addEventListener("click", function (event) {
  event.preventDefault();
  uploadFile(cardId, fileType);
  setTimeout(function () {
    document.querySelector("#file-form").submit();
  }, 50);
});
function uploadFile(cardId, fileType) {
  var formData = new FormData();
  formData.append("file", document.getElementById("id_file_up").files[0]);
  formData.append("card_id", cardId);
  formData.append("file_type", fileType);

  fetch("/post_card_file/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
mButtons.forEach(function (item) {
  item.addEventListener("click", function () {
    cardId = this.closest(".card").id; // card ID'sini set eder

    switch (item.textContent) {
      case "M1":
        details.textContent = "Maliyet Dosyası";
        detailsSpan.textContent = "M1 Dosyası Seçiniz...";
        fileType = "M_File_Card";

        break;

      case "M2":
        details.textContent = "Maliyet Dosyası";
        detailsSpan.textContent = "M2 Dosyası Seçiniz...";
        fileType = "M_File_Card_2";

        break;

      case "M3":
        details.textContent = "Maliyet Dosyası";
        detailsSpan.textContent = "M3 Dosyası Seçiniz...";
        fileType = "M_File_Card_3";

        break;
      case "T1":
        details.textContent = "Teklif Dosyası";
        detailsSpan.textContent = "T1 Dosyası Seçiniz...";
        fileType = "Offer_File_Card";

        break;
      case "T2":
        details.textContent = "Teklif Dosyası";
        detailsSpan.textContent = "T2 Dosyası Seçiniz...";
        fileType = "Offer_File_Card_2";

        break;
      case "T3":
        details.textContent = "Teklif Dosyası";
        detailsSpan.textContent = "T3 Dosyası Seçiniz...";
        fileType = "Offer_File_Card_3";

        break;
      case "T4":
        details.textContent = "Teklif Dosyası";
        detailsSpan.textContent = "T4 Dosyası Seçiniz...";
        fileType = "Offer_File_Card_4";

        break;
      case "T5":
        details.textContent = "Teklif Dosyası";
        detailsSpan.textContent = "T5 Dosyası Seçiniz...";
        fileType = "Offer_File_Card_5";

        break;
      default:
        break;
    }
    fileBox.style.display = "block";
  });
});



//                  CARD MENÜ
function cardMenuFunctions() {

  var cardMenuBtn = document.querySelectorAll(".card_menu-btn");
  let cardMenu;
  // let btn1;
  // var boolClick = false;
  cardMenuBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let card = this.closest(".card");
      cardMenu = card.querySelector(".card_menu");
      if (cardMenu.style.display == "none") {
        cardMenu.style.display = "block";
      }
      else {
        cardMenu.style.display = "none";
      }
    });
    document.addEventListener("click", function (event) {
      var isClickInsideDiv = btn.contains(event.target);
      let card = btn.closest(".card");
      let cardMenu1 = card.querySelector(".card_menu");
      if (!isClickInsideDiv) {
        cardMenu1.style.display = "none";
      }
    });
  });

}

// TARİH İNPUTLARI FORMATLAMA
const dateInputs = document.querySelectorAll(".date-inputs");
formatDateInputs(dateInputs);

// INPUT FORMATLAMA
const formatedInputs = document.querySelectorAll(".formatInputs");
inputsForFormat(formatedInputs);

//                  CARD FORMATLAMA


function cardFormat() {
  rows.forEach(function (row) {
    let cards = row.querySelectorAll(".card");
    let totalCashSpan = row.querySelector(".total-cash span:nth-child(1)");
    let customersCountSpan = row.querySelector(".total-cash span:nth-child(2)");
    let totalCash = 0;

    cards.forEach(function (card) {
      let totalTeklif = card.querySelector(".boxes:nth-of-type(2) p:first-of-type");
      let unitTeklif = card.querySelector(".boxes:nth-of-type(2) p:nth-of-type(2)");
      let totalMaliyet = card.querySelector(".boxes:nth-of-type(3) p:first-of-type");
      let unitMaliyet = card.querySelector(".boxes:nth-of-type(3) p:nth-of-type(2)");
      let powerSpan = card.querySelector(".boxes:nth-of-type(4) p:nth-of-type(1)");
      let totalTeklifCount = parseFloat(totalTeklif.textContent.replace(/,/g, ".")) || 0;
      let unitTeklifCount = parseFloat(unitTeklif.textContent.replace(/,/g, ".")) || 0;
      let totalMaliyetCount = parseFloat(totalMaliyet.textContent.replace(/,/g, ".")) || 0;
      let unitMaliyetCount = parseFloat(unitMaliyet.textContent.replace(/,/g, ".")) || 0;
      let powerCount = parseFloat(powerSpan.textContent.replace(/,/g, ".")) || 0;

      totalTeklif.textContent = "$ " + formatNumber(totalTeklifCount, 2);
      unitTeklif.textContent = formatNumber(unitTeklifCount, 0) + " USD/kWp";
      totalMaliyet.textContent = "$ " + formatNumber(totalMaliyetCount, 2);
      unitMaliyet.textContent = formatNumber(unitMaliyetCount, 0) + " USD/kWp";
      powerSpan.textContent = formatNumber(powerCount, 0) + " kWp";

      totalCash += totalMaliyetCount;
    });

    totalCashSpan.textContent = "$" + formatNumber(totalCash, 2);
    customersCountSpan.textContent = `(${String(cards.length)})`;
  });
}
function totalSpanFormatForDrag() {
  rows.forEach(function (row) {
    let cards = row.querySelectorAll(".card");
    let totalCashSpan = row.querySelector(".total-cash span:nth-child(1)");
    let customersCountSpan = row.querySelector(".total-cash span:nth-child(2)");
    let totalCash = 0;

    cards.forEach(function (card) {
      let totalMaliyet = card.querySelector(".boxes:nth-of-type(3) p:first-of-type");
      let totalMaliyetCount = parseFloat(clear(totalMaliyet.textContent)) || 0;
      totalCash += totalMaliyetCount;
    });
    totalCashSpan.textContent = "$" + formatNumber(totalCash, 2);
    customersCountSpan.textContent = `(${String(cards.length)})`;
  });
}

//                  TOP MENU FONKSİYONLARI

topMenuLi.forEach(function (item) {
  item.addEventListener("click", function () {
    var clickedItemId = this.id;
    handleMenuItemClick(clickedItemId);
  });
});
function handleMenuItemClick(clickedItemId) {
  switch (clickedItemId) {
    case "list":
      listContainer.style.display = "flex";
      maniContainer.style.display = "none";
      salesContainer.style.display = "none";
      lostJobContainer.style.display = "none";
      wonContainer.style.display = "none";
      break;
    case "sale_time":
      listContainer.style.display = "none";
      maniContainer.style.display = "flex";
      salesContainer.style.display = "none";
      lostJobContainer.style.display = "none";
      wonContainer.style.display = "none";
      break;
    case "waiting_job":
      listContainer.style.display = "none";
      maniContainer.style.display = "none";
      salesContainer.style.display = "flex";
      lostJobContainer.style.display = "none";
      wonContainer.style.display = "none";
      break;
    case "losing_job":
      listContainer.style.display = "none";
      maniContainer.style.display = "none";
      salesContainer.style.display = "none";
      lostJobContainer.style.display = "flex";
      wonContainer.style.display = "none";
      break;
    case "won_job":
      listContainer.style.display = "none";
      maniContainer.style.display = "none";
      salesContainer.style.display = "none";
      lostJobContainer.style.display = "none";
      wonContainer.style.display = "flex";
      break;
    default:
      break;
  }
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



//                  TABLO SIRALAMA

thRowsList.forEach(header => {
  header.addEventListener("click", function () {
    var columnIndex = Array.from(thRowsList).indexOf(header);
    sortTable(listTable, columnIndex);
  });
});
thRowsLost.forEach(header => {
  header.addEventListener("click", function () {
    var columnIndex = Array.from(thRowsLost).indexOf(header);
    sortTable(lostTable, columnIndex);
  });
});
thRowsSales.forEach(header => {
  header.addEventListener("click", function () {
    var columnIndex = Array.from(thRowsSales).indexOf(header);
    sortTable(salesTable, columnIndex);
  });
});
thRowsWon.forEach(header => {
  header.addEventListener("click", function () {
    var columnIndex = Array.from(thRowsWon).indexOf(header);
    sortTable(wonTable, columnIndex);
  });
});

//                  SİLME İŞLEMİ

// CSRF token'ını al
const csrfCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("csrftoken="));
const csrfToken = csrfCookie ? csrfCookie.split("=")[1] : null;

function deleteCard(cardId) {
  if (!csrfToken) {
    console.error("CSRF token bulunamadı.");
    return;
  }
  fetch(`AFM/delete_salesoffercard/${cardId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        location.reload();
        throw new Error("Silme işlemi başarısız");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Silme başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}

//                  LOST İŞLEMLERİ

function lostCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_lost/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
function reLostCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_relost/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("00Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

//                  GAİN İŞLEMLERİ

function gainCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_gain/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
function reGainCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_regain/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("00Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}

//                  WAİT İŞLEMLERİ

function waitCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_wait/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
function reWaitCard(cardId) {
  const csrftoken = getCookie("csrftoken");

  if (!csrftoken) {
    console.error("CSRF token bulunamadı.");
    return;
  }

  fetch(`AFM/set_card_rewait/${cardId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Kaybedildi işlemi başarısızz");
      }
      return response.json();
    })
    .then((data) => {
      console.log("00Kaybedildi işlemi başarılı", data);
      location.reload();
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}



//                  DOSYA YENİ SEKME AÇMA

function openFile(url) {
  window.open(url, "_blank");
}

//                  LİSTEDEN CARDA GİTME

trRowsList.forEach((tr) => {
  musteriName = tr.querySelector("td:nth-child(3)");
  if (musteriName) {
    musteriName.style.cursor = "pointer";
    musteriName.addEventListener("click", () => {
      const card = document.getElementById(tr.dataset.id);
      if (card) {
        topMenuLi[2].classList.add("li-hover");
        topMenuLi[0].classList.remove("li-hover");
        handleMenuItemClick("sale_time");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});


//                  OPEN ADD WİNDOW

const salesOfferAddWindow = document.querySelector(".sales-offer-add-window");
const salesOfferAddBtn = document.querySelector(".project-add-btn");
const salesOfferAddForm = document.getElementById("sales_offer_add_form");

salesOfferAddBtn.addEventListener("click", () => {
  setTimeout(() => {
    editMode = false;
    salesOfferAddWindow.style.display = "flex";
  }, 10);
});
document.addEventListener("mousedown", (event) => {
  const salesOfferAddContainer = document.querySelector(".sales-offer-add-window .container");
  if (!salesOfferAddContainer.contains(event.target)) {
    salesOfferAddWindow.style.display = "none";
  }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    salesOfferAddWindow.style.display = "none";
    salesOfferAddForm.reset();
  });
});


/***********************************************************
#                       SALES OFFER ADD
***********************************************************/
const addForm = document.getElementById("sales_offer_add_form");
const formAddBtn = document.querySelector("#sales-offer-create-btn");
formAddBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  if (requiredInputs(reqSalesInputs, reqSalesLabels)) {
    dateInputs.forEach(input => {
      input.value = formatDateForSubmit(input.value)
    })
    var formatInputss = salesOfferAddWindow.querySelectorAll(".formatInputs")
    formatInputss.forEach(input => {
      input.value = input.value.replace(/\./g, "").replace(/,/g, ".");
    })
    const formData = new FormData(addForm);

    const inputs = document.querySelectorAll(".sales-offer-add-window input[data-id]");
    inputs.forEach(input => {
      const dataId = input.getAttribute('data-id');
      formData.set(input.getAttribute('name'), dataId);
    });
    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    await apiFunctions("sales_offer", "POST", formData);
  }
});

// TARİH İNPUTLARI FORMATLAMA
// jobhistoryDateInput.addEventListener('input', function (event) {
//   var userInput = jobhistoryDateInput.value;
//   if (event.inputType !== 'deleteContentBackward') {
//     jobhistoryDateInput.value = formatDate(userInput);
//   }
// });


// Form elemanını seçme






// const addForm = document.getElementById('sales_offer_add_form');

// // FormData nesnesi oluşturma
// const formData = new FormData(addForm);

// // FormData'daki tüm alanları döngü ile al ve konsola yazdır
// for (const [key, value] of formData.entries()) {
//   console.log(key)
//   console.log(key + ':', value);
//}
getSalesCards("edit");
async function getSalesCards(isEdit) {
  try {
    let Rows = document.querySelector(".card-body");
    const data = await apiFunctions("sales_offer", "GET");
    console.log(data)
    let rows = "";

    for (const card of data) {
      let cardHTML = generateCard(card);
      cardPlaceRows(cardHTML, card.Situation_Card)
    }
    dragCards()
    totalSpanFormatForDrag()
    cardFormat();
    cardMenuFunctions()
    // if (data.length > currentRows.length || isEdit) {
    //   supplierTableBody.innerHTML = "";
    //   supplierTableBody.insertAdjacentHTML("beforeend", rows);
    //   editBtns();
    //   sortTableForStart(supplierTable, 1);
    //   allTableFormat();
    //   sortingTable(supplierTable);
    // }
  } catch (error) {
    console.error("Error fetching and rendering clients:", error);
  }
}
function cardPlaceRows(card, situation) {
  var row = document.querySelector(`[data-situation="${situation}"] .card-body `);
  if (row) {
    row.insertAdjacentHTML("beforeend", card)
  }

}
function generateCard(card) {
  let formattedDate;
  if (card.Date_Card) {
    let date = new Date(card.Date_Card);
    formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
  } else { formattedDate = "-" }
  return `
  <div id="${card.id}" class="card" draggable="true" data-situation="${card.Situation_Card}">
      <div class="boxes">
          <p class="bold700">${card.Client_Card}</p>
      </div>
      <p>${formattedDate}</p>
      <div class="boxes">
          <p>${card.Offer_Cost_NotIncludingKDV_Card}</p>
          <p>${card.UnitOffer_NotIncludingKDV} USD/kWp</p>
      </div>
      <div class="boxes">
          <p>${card.Cost_NotIncludingKDV_Card}</p>
          <p>${card.UnitCost_NotIncludingKDV}</p>
      </div>
      <div class="boxes">
          <p>5000kwp</p>
          <p>Çatı</p>
      </div>
      <div class="boxes">
          <div class="buttons">
              ${card.M_File_Card ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card}')">M1</button>` : `<button class="mb mr-3">M1</button>`}
              ${card.M_File_Card_2 ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card_2}')">M2</button>` : `<button class="mb mr-3">M2</button>`}
              ${card.M_File_Card_3 ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card_3}')">M3</button>` : `<button class="mb mr-3">M3</button>`}
          </div>
          <div class="buttons">
              ${card.Offer_File_Card ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card}')">T1</button>` : `<button class="mb mr-3">T1</button>`}
              ${card.Offer_File_Card_2 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_2}')">T2</button>` : `<button class="mb mr-3">T2</button>`}
              ${card.Offer_File_Card_3 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_3}')">T3</button>` : `<button class="mb mr-3">T3</button>`}
              ${card.Offer_File_Card_4 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_4}')">T4</button>` : `<button class="mb mr-3">T4</button>`}
              ${card.Offer_File_Card_5 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_5}')">T5</button>` : `<button class="mb mr-3">T5</button>`}
          </div>
      </div>
      <div class="flex-row">
          <p class="eclipse"><span class="bold500">Yorum: </span>${card.Offer_Comment_Card}</p>
      </div>
      <div class="card-menu">
          <i class="fa-solid fa-ellipsis card_menu-btn"></i>
          <ul class="card_menu">
              <li><a href="{% url 'sales_offer_edit' sales_offer_id=card.id %}">Düzenle</a></li>
              <li onclick="lostCard(${card.id})">Kaybedildi</li>
              <li onclick="gainCard(${card.id})">Kazanıldı</li>
              <li onclick="waitCard(${card.id})">Bekleyen</li>
              <li onclick="reviseCard(${card.id})"><a href="{% url 'sales_offer_edit' sales_offer_id=card.id %}">Revize </a></li>
          </ul>
      </div>
  </div>
  `;
}

//                  CARD DRAG İŞLEMLERİ
function dragCards() {

  var rowcards = document.querySelectorAll(".card");

  var dragItem = null;
  for (var i of rowcards) {
    i.addEventListener("dragstart", dragStart);
    i.addEventListener("dragend", dragEnd);
  }
  function dragStart() {
    dragItem = this;
    setTimeout(() => (this.style.display = "none"), 0);
  }
  function dragEnd() {
    setTimeout(() => (this.style.display = "flex"), 0);
  }
  for (j of rows) {
    j.addEventListener("dragover", dragOver);
    j.addEventListener("dragenter", dragEnter);
    j.addEventListener("dragleave", dragLeave);
    j.addEventListener("drop", Drop);
  }
  function Drop() {
    this.append(dragItem);
    cardDateList(rowsElements);
    totalSpanFormatForDrag();
    //this.style.border = "none";
    //this.style.borderRight = "1px solid rgba(0, 0, 0, 0.2)";

    var targetRowSituation = this.dataset.situation;
    var cardId = dragItem.id;
    var xhr = new XMLHttpRequest();
    var updateCardSituationUrl = "/update_card_situation/";

    xhr.open("POST", updateCardSituationUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        dragItem.dataset.situation = targetRowSituation;
      }
    };
    xhr.send(
      JSON.stringify({ card_id: cardId, new_situation: targetRowSituation })
    );
  }
  function dragOver(e) {
    e.preventDefault();
    //this.style.border = "2px solid rgba(0, 0, 0, 0.3)";
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave() {
    // this.style.border = "none";
    // this.style.borderRight = "6px solid rgba(41, 60, 73,0.9)";
  }

}


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