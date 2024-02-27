const projectsTable = document.querySelector('#project_table');  
const thRows = projectsTable.querySelectorAll("th");


getAndRenderList();

//                  LİSTE ÇEKME

async function getAndRenderList(){
    try{
        const response = await fetch('/get_projects/');
        const data = await response.json();
        const projects = data.projects;        

        console.log(projects)

        const tbody = document.querySelector(".business-maintenance tbody");
        tbody.innerHTML = '';

        projects.forEach((project) => {
            console.log(project)
            const date = new Date(project.StartDate);
            console.log(project)
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

