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


async function getAndaRenderList(){
    try{
        const response = await fetch('/get_operation_care/');
        
        const data = await response.json();
        const inventors = data.operation_care;
        //console.log(inventors)
        inventors.forEach(inventor => {
            console.log(inventor)
            if(inventor.id == 5){
                //console.log(inventor)
                const tbody = document.querySelector('.inventor_table_body');
                tbody.innerHTML = '';
                for(let i=0; i < inventor.Operation_Care_Number_Str; i++){                  
                    
                        const row = '<tr>' +
                            `<td><span>İnventör 1</span></td>` +
                            '<td>' + inventor.Operation_Care_Direction + '</td>' +
                            '<td>' + inventor.Operation_Care_Number_Str + '</td>' +
                            '<td>' + inventor.Operation_Care_Panel_Power + '</td>' +
                            '<td>' + inventor.Operation_Care_VOC + '</td>' +
                            '<td>' + inventor.Operation_Care_Panel_Brand + '</td>' +
                            '<td>' + inventor.Operation_Care_Panel_Number_Str + '</td>' +
                            '<td>OK</td>' +
                            '<td>' + inventor.Operation_Care_Capacity + '</td>' +
                            '<td>' + inventor.Operation_Care_AC_Power + '</td>' +
                            '<td>' + inventor.Operation_Care_DC_Power + '</td>' +
                            '<td>' + inventor.Operation_Care_DC_Power + '</td>' +
                            '<td>0.01</td>' +
                            '<td>500</td>' +                            
                            '</tr>';
                        tbody.insertAdjacentHTML('beforeend', row);
                                   
                }                
            }
        });
       
    }catch(event){
        console.log(event)
    }
}

getAndRenderStrings() 
//------------------------------------------
async function getAndRenderStrings() {
  try {
      const response = await fetch(`/get_inventors/10/`);
      const data = await response.json();
      const inventors = data.inventors;

      console.log("inventors")
      console.log(inventors)
      const tbody = document.querySelector(".inventor_table_body")
      tbody.innerHTML = '';
      let i = 1;
      for ( const inventor of inventors) {
        
          const response2 = await fetch(`/get_strings/${inventor.id}/`);
          const data2 = await response2.json();
          const strings = data2.strings;
          let bool = true;
          console.log(strings)
          console.log(strings.length)
          for (const string of strings) {
            const row = '<tr>' +
          (bool ? `<td class = "rotate" rowspan="${strings.length}"><span>İnventör ${i}</span></td>` : '') +
          '<td>' +
          '<select class="directionSelect">' +
          '<option value="north">Kuzey</option>' +
          '<option value="south">Güney</option>' +
          '<option value="east">Doğu</option>' +
          '<option value="west">Batı</option>' +
          '</select>' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Number + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Panel_Power + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_VOC + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Panel_Brand + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Panel_SY + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + "ok" + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Capacity + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_AC_Power + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_DC_Power + '">' +
          '</td>' +
          '<td>' +
          '<input type="text" value="' + string.String_Percent + '">' +
          '</td>' +
          '</tr>';
            tbody.insertAdjacentHTML('beforeend', row);
            currentDirection(inventor);
            bool = false;
          }
          i++;

      }
  } catch (error) {
      console.error('Error fetching and rendering clients:', error);
  }
}



//                  YÖN KONTROLÜ YAPMA

function currentDirection(inventor){
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