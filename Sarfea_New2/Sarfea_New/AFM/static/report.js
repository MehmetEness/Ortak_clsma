
const reportTable = document.querySelector("#report_table")
const reportTableBody = reportTable.querySelector("tbody")


getReports()
async function getReports() {
    try {
      let currentRows = reportTableBody.querySelectorAll("tr");
      var projectData = await apiFunctions("project", "GET");
      console.log("projeler");
      console.log(projectData);
      let rows = "";
      for (const project of projectData) {
        let totalIncome = 0;
        let totalExpense = 0;
        project.project_expenses.forEach(element => {
            totalExpense += parseFloat(element.Amount_USD_Expenses);           
        });
        project.project_incomes.forEach(element => {
            totalIncome += parseFloat(element.Amount_Usd_Incomes);           
        });
        console.log(totalExpense);
        console.log("----");
        const row = `
                  <tr>                      
                      <td>${project.ProjectName}</td>
                      <td>${formatNumber(project.Cost_NotIncludingKDV, 2)}</td>
                      <td>${formatNumber(totalIncome, 2)}</td>
                      <td>${formatNumber(totalExpense, 2)}</td>
                      <td>${formatNumber(project.CalculatedCost_NotIncludingKDV - totalExpense, 2)}</td>
                      <td>${formatNumber(project.Cost_NotIncludingKDV - totalIncome, 2)}</td>
                      <td>${formatNumber(totalIncome - totalExpense)}</td>
                      <td>${formatNumber(project.Cost_NotIncludingKDV * 0.2 * 0.75 , 2)}</td>
                      <td>${formatNumber(project.Cost_NotIncludingKDV - totalExpense)}</td>
                      <td>${formatNumber((project.Cost_NotIncludingKDV - totalExpense) + (project.Cost_NotIncludingKDV * 0.2 * 0.75))}</td>
                  </tr>
              `;
        rows += row;
      }
      if (projectData.length > currentRows.length) {
        reportTableBody.innerHTML = "";
        reportTableBody.insertAdjacentHTML("beforeend", rows);        
        sortTableForStart(reportTable, 1);
        sortingTable(reportTable);
      }
    } catch (error) {
      console.error("Error fetching and rendering clients:", error);
    }
  }
  


  