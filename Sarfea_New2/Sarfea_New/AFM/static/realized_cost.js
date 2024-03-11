const jobHistoryTable = document.querySelector('#jobhistory_table');
const jobHistoryTableBody = document.querySelector('#jobhistory_table');
const expensesTable = document.querySelector('#expenses_table');
const expensesTableBody = document.querySelector('#expenses_table');


//                  JOBHISTORY TABLE

getJobhistory()
async function getJobhistory() {
  try {
      let currentRows  = jobHistoryTable.querySelectorAll("tr");
      const response = await fetch(`/get_job_history/`);
      const data = await response.json();
      const jobHistorys = data.jobHistorys; 
      console.log(jobHistorys)
      console.log(response)
      let rows = '';
      // for (const jobHistory of jobHistorys) {           
      //     const row = '<tr>' +
      //         '<td>' + 
      //             `<button id="${jobHistory.id}" type="button" class="edit-supplier-btn" style="background: none; border:none;">` +
      //                 '<i id="edit-text" class="fa-solid fa-pen-to-square"></i>' +
      //             '</button>' +
      //         '</td>'  +
      //         '<td>' + jobHistory.CompanyName_Supplier + '</td>' +
      //         '<td>' + jobHistory.ContactPerson + '</td>' +
      //         '<td>' + jobHistory.PhoneNumber + '</td>' +
      //         '<td>' + jobHistory.Email + '</td>' +
      //         '<td>' + jobHistory.Location + '</td>' +
      //         '</tr>';
      //         rows += row;          
      // }
      // if(jobHistorys.length > currentRows.length){
      //   jobHistoryTableBody.innerHTML = '';
      //   jobHistoryTableBody.insertAdjacentHTML('beforeend', rows);
      //     // sortTableForStart(supplierTable, 1);
      //     // allTableFormat()
      //     // sortingTable(supplierTable)
      // }        
      
  } catch (error) {
      console.error('Error fetching and rendering clients:', error);
  }
}



//                  EKLEME BUTTONLARI

var expensesAddWindow = document.querySelector('.expenses-add-window');  
var expensesAddWindowButton = document.querySelector('.expenses-add-btn');  
var jobhistoryAddWindow = document.querySelector('.jobhistory-add-window');  
var jobhistoryAddWindowButton = document.querySelector('.jobhistory-add-btn');  

//----- EXPENSES
expensesAddWindowButton.addEventListener("click", () =>{    
    setTimeout(() =>{expensesAddWindow.style.display = "flex";}, 10);
}); 
document.addEventListener('click', (event) =>{
    const expensesAddContainer = expensesAddWindow.querySelector(".container");
    if (!expensesAddContainer.contains(event.target)) {
        expensesAddWindow.style.display = "none";
    }
});
//----- JOBHİSTORY
jobhistoryAddWindowButton.addEventListener("click", () =>{    
    setTimeout(() =>{jobhistoryAddWindow.style.display = "flex";}, 10);
}); 
document.addEventListener('click', (event) =>{
    const jobhistoryAddContainer = jobhistoryAddWindow.querySelector(".container");
    if (!jobhistoryAddContainer.contains(event.target)) {
        jobhistoryAddWindow.style.display = "none";
    }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        expensesAddWindow.style.display = "none";
        jobhistoryAddWindow.style.display = "none";
    })
})