var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var anketContainer = document.querySelector(".anket-container");
var santralTakipContainer = document.querySelector(".santral_takip_container");
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
        santralTakipContainer.style.display = "none";
        arizaTakipContainer.style.display = "none";
        bakimTakipContainer.style.display = "none";
        break;
      case "santral_takip":
        anketContainer.style.display = "none";
        santralTakipContainer.style.display = "block";
        arizaTakipContainer.style.display = "none";
        bakimTakipContainer.style.display = "none";
        break;
      case "ariza_takip":
        anketContainer.style.display = "none";
        santralTakipContainer.style.display = "none";
        arizaTakipContainer.style.display = "block";
        bakimTakipContainer.style.display = "none";
        break;  
    case "bakim_takip":
        anketContainer.style.display = "none";
        santralTakipContainer.style.display = "none";
        arizaTakipContainer.style.display = "none";
        bakimTakipContainer.style.display = "flex";
        break;         
      default:
        break;
    }
}