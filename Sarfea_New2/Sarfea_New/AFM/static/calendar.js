const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const daysOfWeek = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar"
];

var eventsArr = [];

async function getApiEvents(){
  let apiEvents = await apiFunctions("date", "GET");
  eventsArr = apiEvents.map(event => ({
    day: event.Date_Day,
    month: event.Date_Month,
    year: event.Date_Year,
    events: event.date_events.map(evt => ({
      title: evt.Event_Title,
      time: evt.Event_Time
    }))
  }));
  console.log(eventsArr);
  initCalendar(); // API'den veriler geldikten sonra takvimi başlat
}

// API'den verileri çekerken ve takvimi başlatırken 
getApiEvents();

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Pazartesi'den başlamak için güncelleme
    const nextDays = 6 - (lastDay.getDay() === 0 ? 6 : lastDay.getDay() - 1); // Pazartesi'den başlamak için güncelleme
  
    date.innerHTML = months[month] + " " + year;
  
    let days = "";
  
    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
  
    for (let i = 1; i <= lastDate; i++) {
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          event = true;
        }
      });
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        activeDay = i;
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }
  
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      days.forEach((day) => {
        day.classList.remove("active");
      });
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Geçersiz Tarih");
}

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = daysOfWeek[day.getDay() === 0 ? 6 : day.getDay() - 1];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>Etkinlik Yok</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// Etkinlik ekleme işlemi
async function addEvent() {
  const title = addEventTitle.value;
  const fromTime = addEventFrom.value;
  const toTime = addEventTo.value;
  const eventDateStr = `${year}-${month + 1}-${activeDay}`; // YYYY-MM-DD formatında
  const time = fromTime && toTime ? `"${fromTime} - ${toTime}"` : "";

  if (title === "") {
    alert("Etkinlik başlığını girin!");
    return;
  }

  // Gün bilgisini eklemek için API çağrısı
  const dateData = new FormData();
  dateData.append("Date_Year", year);
  dateData.append("Date_Month", month + 1);
  dateData.append("Date_Day", activeDay);
  console.log("Gün verisi:", Object.fromEntries(dateData));

  let dateId;
  try {
    const response = await fetch(`/api_date/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: dateData,
    });
    const responseData = await response.json();
    dateId = responseData.id; // Yeni oluşturulan tarihin ID'sini al
  } catch (error) {
    console.error("Gün oluşturulurken bir hata oluştu!", error);
    return;
  }

  // Etkinlik bilgisini eklemek için API çağrısı
  const eventData = new FormData();
  eventData.append("Event_Title", title);
  eventData.append("Event_Time", time);
  eventData.append("Event_Date", dateId); // Tarih ID'sini kullan

  console.log("Etkinlik verisi:", Object.fromEntries(eventData));
  try {
    await fetch(`/api_events/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: eventData,
    });
  } catch (error) {
    console.error("Etkinlik oluşturulurken bir hata oluştu!", error);
    return;
  }

  // Yerel olaylar dizisine ekleme
  eventsArr.push({
    day: activeDay,
    month: month + 1,
    year: year,
    events: [
      {
        title: title,
        time: time,
      },
    ],
  });
  updateEvents(activeDay);
  addEventWrapper.classList.remove("active");
}

addEventSubmit.addEventListener("click", addEvent);

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}
