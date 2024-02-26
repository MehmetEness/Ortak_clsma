var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var faturaContainer = document.querySelector(".fatura_container");
var isletmeBakimContainer = document.querySelector(".isletme_bakim_container");
var arizaTakipContainer = document.querySelector(".ariza_takip_container");







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

 //                  TOP MENU FONKSİYONLARI

topMenuLi.forEach(function (item) {
    item.addEventListener("click", function () {
      var clickedItemId = this.id;
      handleMenuItemClick(clickedItemId);
    });
  });
  function handleMenuItemClick(clickedItemId) {
    switch (clickedItemId) {
      case "fatura":
        faturaContainer.style.display = "flex";
        isletmeBakimContainer.style.display = "none";
        arizaTakipContainer.style.display = "none";
        break;
      case "isletme_bakim":
        faturaContainer.style.display = "none";
        isletmeBakimContainer.style.display = "flex";
        arizaTakipContainer.style.display = "none";
        break;
      case "ariza_takip":
        faturaContainer.style.display = "none";
        isletmeBakimContainer.style.display = "none";
        arizaTakipContainer.style.display = "flex";
        break;      
      default:
        break;
    }
  }