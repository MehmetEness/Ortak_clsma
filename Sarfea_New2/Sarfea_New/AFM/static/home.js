const projectsTable = document.querySelector('#project_table');  
const thRows = projectsTable.querySelectorAll("th");


getAndRenderList();

//                  LİSTE ÇEKME

async function getAndRenderList(){
    try{
        const response = await fetch('/get_projects/');
        const data = await response.json();
        const projects = data.projects;        


        const tbody = document.querySelector(".business-maintenance tbody");
        tbody.innerHTML = '';

        projects.forEach((project) => {
            const date = new Date(project.StartDate);
            const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            if(project.CompanyName){
                const row = 
                    '</tr>'  +
                        '<td>' + project.ProjectName + '</td>' +
                        '<td>' + project.Location + '</td>' +
                        '<td>' + project.Cost_NotIncludingKDV + '</td>' +
                        '<td>' + project.Terrain_Roof + '</td>' +
                        '<td>' + formattedDate + '</td>' +
                        '<td>' + project.Situation + '</td>' +
                    '</tr>';
                tbody.insertAdjacentHTML('beforeend', row);                
            }            
        });  
        formatTableForPlace();
    }catch(error) {
        console.log(error)
    }
}
function getMonthName(monthIndex) {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return months[monthIndex];
}

//                  TABLO SIRALAMA

thRows.forEach(header => {        
    header.addEventListener("click", function() {        
        var columnIndex = Array.from(thRows).indexOf(header);
        sortTable(projectsTable, columnIndex);
    });
});

//                  TABLO FORMATLAMA

function formatTableForPlace(){
    let usdCells = document.querySelectorAll('#project_table td:nth-child(3)');  
    let textCells = document.querySelectorAll('#project_table td:nth-child(1), #project_table td:nth-child(2), #project_table td:nth-child(4), #project_table td:nth-child(5), #project_table td:nth-child(6)');
    tableFormat(usdCells, "usd")
    tableFormat(textCells, "text")
}




//                  LİSTE ÇEKME
getAndRenderCard();
async function getAndRenderCard(){
    try{
        
        const rowsDiv =document.querySelectorAll('.sales_container .rows');            
        const response = await fetch('/get_run_cards/');
        const data = await response.json();
        const cards = data.run_cards;
        console.log(cards);

        cards.forEach((card) => {
            console.log(card)
           console.log(card.M_File_Card)
            const date = new Date(card.Date_Card);
            const formattedDate = `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardContent = `
                <div class="boxes">
                    <p class="bold700">${card.Client_Card_Copy}</p>                        
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
                        ${card.M_File_Card ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card.url}')">M1</button>` : ``}
                        ${card.M_File_Card_2 ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card_2.url}')">M2</button>` : ``}
                        ${card.M_File_Card_3 ? `<button class="mr-3 blue" onclick="openFile('${card.M_File_Card_3.url}')">M3</button>` : ``}                        
                    </div>
                    <div class="buttons">
                    ${card.Offer_File_Card ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card.url}')">T1</button>` : ``}
                    ${card.Offer_File_Card_2 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_2.url}')">T2</button>` : ``}
                    ${card.Offer_File_Card_3 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_3.url}')">T3</button>` : ``}
                    ${card.Offer_File_Card_4 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_4.url}')">T4</button>` : ``}
                    ${card.Offer_File_Card_5 ? `<button class="mr-3 blue" onclick="openFile('${card.Offer_File_Card_5.url}')">T5</button>` : ``}
                    </div>
                </div>
                <div class="flex-row">
                    <p class="eclipse"><span class="bold500">Yorum: </span>${card.Offer_Comment_Card}</p>
                </div>                
            `;
            cardDiv.innerHTML = cardContent; 
            switch (card.Situation_Card) {
                case "Potansiyel Müşteri":
                    rowsDiv[0].appendChild(cardDiv);
                    break;
                case "Maliyet Hesaplama":
                    rowsDiv[1].appendChild(cardDiv);
                    break;
                case "Fiyat Belirleme":
                    rowsDiv[2].appendChild(cardDiv);
                    break;
                case "Teklif Hazırlama":
                    rowsDiv[3].appendChild(cardDiv);
                    break;  
                case "Teklif Hazır":
                    rowsDiv[4].appendChild(cardDiv);
                    break; 
                case "Teklif Sunuldu":
                    rowsDiv[5].appendChild(cardDiv);
                    break;  
                case "Sunum Sonrası Görüşme":
                    rowsDiv[6].appendChild(cardDiv);
                    break;
                default:
                    console.log("df")

              }                  
            
        });

    } catch(error) {
        console.error("Hata oluştu:", error);
    }
}


//                  DOSYA YENİ SEKME AÇMA

function openFile(url) {
    window.open(url, "_blank");
  }
