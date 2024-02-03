var rowsElements = document.querySelectorAll(
  '.rows[data-situation="Potansiyel Müşteri"], .rows[data-situation="Maliyet Hesaplama"],.rows[data-situation="Fiyat Belirleme"],.rows[data-situation="Teklif Hazırlama"],.rows[data-situation="Teklif Hazır"],.rows[data-situation="Teklif Sunuldu"],.rows[data-situation="Sunum Sonrası Görüşme"]'
);
var numericCells = document.querySelectorAll(
  "#table td:nth-child(5), #table td:nth-child(6), #table td:nth-child(7), #table td:nth-child(8), #table td:nth-child(9), #table td:nth-child(10), #table td:nth-child(12), #table td:nth-child(13), #table td:nth-child(14), #table td:nth-child(15)"
);
var textCells = document.querySelectorAll(
  "#table td:nth-child(3), #table td:nth-child(4), #table td:nth-child(11), #table td:nth-child(16)"
);
var mButtons = document.querySelectorAll(".mb");
var closeModal = document.querySelectorAll(".modal-kapat");
var fileBox = document.querySelector(".file_upload");
var details = document.querySelector(".details");
var detailsSpan = document.querySelector("#details_span");
var rightMenu = document.querySelector(".right-menu");
var leftMenu = document.querySelector("#nav-bar");
var hamburgerMenu1 = document.querySelector("#hamburger_btn1");
var hamburgerMenu2 = document.querySelector("#hamburger_btn2");
var rowcards = document.querySelectorAll(".card");
var cardMenuBtn1 = document.querySelectorAll(".card_menu-btn1");
let rows = document.querySelectorAll(".rows");
var topMenuLi = document.querySelectorAll(".top-menu-ul li");
let maniContainer = document.querySelector(".main-container");
let listContainer = document.querySelector(".list-container");
let lostJobContainer = document.querySelector(".lost-job-container");
let salesContainer = document.querySelector(".sales-container");
let wonContainer = document.querySelector(".won-container");
var tables = document.querySelectorAll(".table");

document.addEventListener("DOMContentLoaded", function () {
  //                  CARD NONE VERİLERİ DÜZELTME

  topMenuLi[2].classList.add("li-hover");

  rowcards.forEach(function (item) {
    let cardTarih = item.querySelector("p:nth-child(3)");
    let araziCati = item.querySelector(
      ".boxes:nth-of-type(2) p:nth-of-type(2)"
    );
    if (araziCati.textContent == "None") {
      araziCati.textContent = "-";
    }
    if (cardTarih.textContent == "None") {
      cardTarih.textContent = "-";
    }
  });

  //                  CARD TARİHE GÖRE SIRALAMA
  cardDateList(rowsElements);

  //                  TABLO FORMATLAMA

  tableFormat(numericCells, "numeric");
  tableFormat(textCells, "text");
});


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
document
  .getElementById("submit_btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    uploadFile(cardId, fileType);
    setTimeout(function () {
      document.querySelector("#file-form").submit();
    }, 10);
  });
function uploadFile(cardId, fileType) {
  var formData = new FormData();
  formData.append("file", document.getElementById("id_file_up").files[0]);
  formData.append("card_id", cardId);
  formData.append("file_type", fileType);

  fetch("/upload_file_view/", {
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

//                  HAMBURGER MENÜ

hamburgerMenu1.addEventListener("click", () => {
  hamburgerMenu1.style.display = "none";
  hamburgerMenu2.style.display = "inline-block";
  leftMenu.style.display = "none";
  rightMenu.style.width = "100%";
});
hamburgerMenu2.addEventListener("click", () => {
  hamburgerMenu2.style.display = "none";
  hamburgerMenu1.style.display = "inline-block";
  leftMenu.style.display = "flex";
  rightMenu.style.width = "calc(100% - 256px)";
});

//                  CARD MENÜ

var cardMenuBtn2;
let cardMenu;
let btn1;
var boolClick = false;

cardMenuBtn1.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = this.closest(".card");
    cardMenuBtn2 = card.querySelector(".card_menu-btn2");
    cardMenu = card.querySelector(".card_menu");
    btn1 = btn;
    boolClick = true;

    cardMenu.style.display = "block";
    btn.style.display = "none";
    cardMenuBtn2.style.display = "block";

    cardMenuBtn2.addEventListener("click", function () {
      cardMenu.style.display = "none";
      cardMenuBtn2.style.display = "none";
      btn.style.display = "block";
      cardMenuBtn2 = null;
      cardMenu = null;
      btn1 = null;
      boolClick = false;
    });
  });
});

//                  CARD FORMATLAMA

cardFormat();
function cardFormat() {
  rows.forEach(function (row) {
    let cards = row.querySelectorAll(".card");
    let totalCashSpan = row.querySelector(".total-cash span:nth-child(1)");
    let customersCountSpan = row.querySelector(".total-cash span:nth-child(2)");
    let totalCash = 0;

    cards.forEach(function (card) {
      let USDSpan = card.querySelector(".boxes:first-of-type p:first-of-type");
      let unitSpan = card.querySelector(
        ".boxes:first-of-type p:nth-of-type(2)"
      );
      let powerSpan = card.querySelector(
        ".boxes:nth-of-type(2) p:nth-of-type(1)"
      );
      let currentUSD =
        parseFloat(USDSpan.textContent.replace(/[^\d.-]/g, "")) || 0;
      let currentUnit =
        parseFloat(unitSpan.textContent.replace(/[^\d.-]/g, "")) || 0;
      let powerCount =
        parseFloat(powerSpan.textContent.replace(/[^\d.-]/g, "")) || 0;

      USDSpan.textContent = "$" + formatNumber(currentUSD, 2);
      unitSpan.textContent = formatNumber(currentUnit, 0) + " USD/kWp";
      powerSpan.textContent = formatNumber(powerCount, 0) + " kWp";

      totalCash += currentUSD;
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

//                    TABLO FİLİTRELEME İŞLEMLERİ

searchInput.addEventListener("input", function(){
  tables.forEach(function(table){
    filterTable(searchInput, table);
  });  
});
clearButton.addEventListener("click", function() {
  tables.forEach(function(table){
    searchInput.value = "";
  showAllRows(table);
  });  
  
});

//                  CARD DRAG İŞLEMLERİ

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
  cardFormat();
}
for (j of rows) {
  j.addEventListener("dragover", dragOver);
  j.addEventListener("dragenter", dragEnter);
  j.addEventListener("dragleave", dragLeave);
  j.addEventListener("drop", Drop);
}
function Drop() {
  this.append(dragItem);
  this.style.border = "none";
  this.style.borderRight = "1px solid rgba(0, 0, 0, 0.2)";

  var targetRowSituation = this.dataset.situation;
  var cardId = dragItem.id;
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "{% url 'update_card_situation' %}", true);
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
  this.style.border = "2px solid rgba(0, 0, 0, 0.3)";
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {
  this.style.border = "none";
  this.style.borderRight = "1px solid rgba(0, 0, 0, 0.2)";
}

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