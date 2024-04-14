
var konumDiv = document.querySelector("#konum_div");
var konumSpan = document.querySelector("#Konum_span");
var typeDiv = document.querySelector("#type_div");
var typeSpan = document.querySelector("#type_span");

var acPowerSpan = document.querySelector("#ac-power-span");
var dcPowerSpan = document.querySelector("#dc-power-span");
var realizedIncomeSpan = document.querySelector("#realized_income_span");
var realizedCostSpan2 = document.querySelector("#realized_cost_span2");
var dateSpans = document.querySelectorAll(".date-span")

dateSpans.forEach(span =>{
  span.textContent = formatDate(span.textContent);
})
getProjects(true)
async function getProjects(isEdit) {
  try {
    const data = await apiFunctions("project", "GET");
    //console.log(data)    
      
  } catch (error) {
    console.error("Error fetching and rendering clients:", error);
  }
}

const getMaliyet = async ()=>{
  const projectId = document.querySelector(".project_id").id;
  let totalMaliyet = 0;
  const respons = await apiFunctions("project", "GETID","ds",projectId);
  console.log(respons);
  respons.project_expenses.forEach((expense) =>{
    let expenseAmount = parseFloat(expense.Amount_USD_Expenses) || 0;
    totalMaliyet += expenseAmount;
  });
  realizedCostSpan2.textContent = formatNumber(totalMaliyet,2) + "$";
}
const getGelir = async ()=>{
  const projectId = document.querySelector(".project_id").id;
  let totalGelir = 0;
  const respons = await apiFunctions("project", "GETID","ds",projectId);
  console.log(respons);
  respons.project_incomes.forEach((income) =>{
    let incomeAmount = parseFloat(income.Amount_Usd_Incomes) || 0;
    totalGelir += incomeAmount;
  });
  realizedIncomeSpan.textContent = formatNumber(totalGelir,2) + "$";
}
getGelir();
getMaliyet();


