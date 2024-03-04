var topMenuLi = document.querySelectorAll(".top-menu-ul li");
var faturaTable = document.querySelector("#fatura_table");
var isletmeBakimTable = document.querySelector("#isletme_bakim_table");
var arizaTakipTable = document.querySelector("#ariza_takip_table");







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
      console.log(clickedItemId)
      handleMenuItemClick(clickedItemId);
    });
  });
  function handleMenuItemClick(clickedItemId) {
    switch (clickedItemId) {
      case "fatura":
        faturaTable.style.display = "table";
        isletmeBakimTable.style.display = "none";
        arizaTakipTable.style.display = "none";
        break;
      case "isletme_bakim":
        faturaTable.style.display = "none";
        isletmeBakimTable.style.display = "table";
        arizaTakipTable.style.display = "none";
        break;
      case "ariza_takip":
        faturaTable.style.display = "none";
        isletmeBakimTable.style.display = "none";
        arizaTakipTable.style.display = "table";
        break;        
      default:
        break;
    }
  }



var tarihRow = isletmeBakimTable.querySelectorAll("tbody tr")

dateFormatForColor(tarihRow,7);

//----------------------------------------------

const search1 = document.querySelector('.input-group input');

search1.addEventListener('input', searchTable);

sortingTable(document.querySelector("#isletme_bakim_table"))
sortingTable(document.querySelector("#fatura_table"))
sortingTable(document.querySelector("#ariza_takip_table"))


    // 1. Searching for specific data of HTML table

    function searchTable() {
      const table_rows = document.querySelectorAll('tbody tr');
      table_rows.forEach((row, i) => {
          let table_data = row.textContent.toLowerCase(),
              search_data = search1.value.toLowerCase();
              console.log(table_data)
              console.log(search_data)
  
          row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
          row.style.setProperty('--delay', i / 25 + 's');
      })
  
      document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
         visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
      });
  }

  // 2. Sorting | Ordering data of HTML table

  function sortingTable(container){
    const table_headings = container.querySelectorAll('thead th');
    const table_rows = container.querySelectorAll('tbody tr');
    const tableBody = container.querySelector('tbody');
    table_headings.forEach((head, i) => {
      
        let sort_asc = true;
        head.onclick = () => {
          console.log("asdd")
            table_headings.forEach(head => head.classList.remove('active'));
            head.classList.add('active');
    
            container.querySelectorAll('td').forEach(td => td.classList.remove('active'));
            table_rows.forEach(row => {
                row.querySelectorAll('td')[i].classList.add('active');
            })
    
            head.classList.toggle('asc', sort_asc);
            sort_asc = head.classList.contains('asc') ? false : true;
    
            sortTable(i, sort_asc, table_rows, tableBody);
        }
    })
  }


function sortTable(column, sort_asc ,table_rows ,tableBody) {
  [...table_rows].sort((a, b) => {
      let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
          second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

      return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
  })
      .map(sorted_row => tableBody.appendChild(sorted_row));
}

