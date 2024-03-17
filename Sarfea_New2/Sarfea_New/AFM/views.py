from django.http.response import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Case, When, Value, IntegerField, F, Count, Sum
from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProjectForm, ExpensesForm, IncomesForm, JobHistoryForm, ClientsForm, SupplierForm, SalesOfferCardForm, Operation_CareForm, FailForm, Fail_BillForm
from .models import Project, Expenses, Incomes, PaymentFirms, CompanyNames, JobHistory, SalesOfferCard,SalesOfferCard_Revise, MyCompanyNames, PaymentFirms, Clients ,Details, Supplier, Locations,Terrain_Roof, Situations, Banks, Worker, Operation_Care, Fail, Fail_Bill, Inventor, String
from django.db.models import Q
from django.views import View
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required, user_passes_test
import evds as e

#Test
def isAdmin(user):
    return user.is_superuser

#Home
@login_required
def home(request):
    sales_offer_card = SalesOfferCard.objects.all()   


    context = {
    'sales_offer_card':sales_offer_card,
    }
    return render(request, "home.html", context)

# Proje Modülü.

@login_required
def expenses_edit(request, expenses_id):
    expenses_edit = get_object_or_404(Expenses, id=expenses_id)
    project = get_object_or_404(Project, ProjectName=expenses_edit.ProjectName_Expenses)
    my_company = MyCompanyNames.objects.all()
    supplier = Supplier.objects.all()
    banks = Banks.objects.all()
    details = Details.objects.all()
   

    if request.method == 'POST':
        edit_form = ExpensesForm(request.POST, instance=expenses_edit)
        
        if edit_form.is_valid():
          
          edit_form.save()
          return redirect('realized_cost', project_name=expenses_edit.ProjectName_Expenses)
    else:
        edit_form = ExpensesForm(instance=expenses_edit)


    context = {
        'edit_form': edit_form,
        'expenses_edit': expenses_edit,
        'my_company': my_company,
        'supplier': supplier,
        'banks': banks,
        'details': details,
        'project':project
    }
    return render(request, "expenses_edit.html", context)

@login_required
def jobhistory_edit(request, jobhistory_id):
    jobhistory_edit = get_object_or_404(JobHistory, id=jobhistory_id)
    my_company = MyCompanyNames.objects.all()
    supplier = Supplier.objects.all()
    

    if request.method == 'POST':
        edit_form = JobHistoryForm(request.POST, instance=jobhistory_edit)

        if edit_form.is_valid():
          
            edit_form.save()
            return redirect('realized_cost', project_name=jobhistory_edit.ProjectName_JobHistory)
    

    else:
        edit_form = JobHistoryForm(instance=jobhistory_edit)


    context = {
        'edit_form': edit_form,
        'jobhistory_edit': jobhistory_edit,
        'my_company': my_company,
        'supplier': supplier,
    }
    return render(request, "jobhistory_edit.html", context)

@login_required
def income_edit(request, income_id):
    income_edit = get_object_or_404(Incomes, id=income_id)
    my_company = MyCompanyNames.objects.all()
    client = Clients.objects.all()
    

    if request.method == 'POST':
        edit_form = IncomesForm(request.POST, instance=income_edit)
        
        if edit_form.is_valid():
          
          edit_form.save()
          return redirect('income_details', project_name=income_edit.ProjectName_Incomes)
    else:
        edit_form = IncomesForm(instance=income_edit)
    context = {
        'edit_form': edit_form,
        'income_edit': income_edit,
        'my_company': my_company,
        'client': client

    }
    return render(request, "income_edit.html", context)

@login_required
def supplier_edit(request, supplier_name):
    supplier_edit = get_object_or_404(Supplier, CompanyName_Supplier=supplier_name)
    locations = Locations.objects.all()

    if request.method == 'POST':
        edit_form = SupplierForm(request.POST, instance=supplier_edit)
        
        if edit_form.is_valid():
          
          edit_form.save()
          return redirect('supplier')
    else:
        edit_form = SupplierForm(instance=supplier_edit)
    context = {
        'edit_form': edit_form,
        'supplier_edit': supplier_edit,
        'locations': locations
    
    }
    return render(request, "supplier_edit.html", context)

@login_required
def client_edit(request, client_name):
    client_edit = get_object_or_404(Clients, CompanyName_Clients=client_name)
    locations = Locations.objects.all()

    if request.method == 'POST':
        edit_form = ClientsForm(request.POST, instance=client_edit)
       
        if edit_form.is_valid():
          
          edit_form.save()
          return redirect('client')
    else:
        edit_form = ClientsForm(instance=client_edit)
    context = {
        'edit_form': edit_form,
        'client_edit': client_edit,
        'locations': locations
    }
    return render(request, "client_edit.html", context)

@login_required
def project_edit(request, project_name):
    project_edit = get_object_or_404(Project, ProjectName=project_name)
    my_company = MyCompanyNames.objects.all()
    client = Clients.objects.all()
    locations = Locations.objects.all()
    terrain_roof = Terrain_Roof.objects.all()
    situations = Situations.objects.all()
   

   
    if request.method == 'POST':
        edit_form = ProjectForm(request.POST, instance=project_edit)
        if edit_form.is_valid():
          edit_form.save()
          return redirect('projects')
    else:
        edit_form = ProjectForm(instance=project_edit)
    context = {
        'edit_form': edit_form,
        'project_edit': project_edit,
        'my_company':my_company,
        'client':client,
        'locations':locations,
        'terrain_roof':terrain_roof,
        'situations':situations,
    }
    return render(request, "project_edit.html", context)

@login_required
def client(request):
    locations = Locations.objects.all()
    if request.method == 'POST':
        client_form = ClientsForm(request.POST)
        if client_form.is_valid():
            client_form.save()
            return redirect('client')
    else:
        client_form = ClientsForm()

    clients = Clients.objects.all()

    context = {
        'clients': clients,
        'client_form': client_form,
        "locations": locations
    }

    return render(request, 'client.html', context)

@login_required
def supplier(request):
    locations = Locations.objects.all()
    if request.method == 'POST':
        supplier_form = SupplierForm(request.POST)
        if supplier_form.is_valid():
            supplier_form.save()
            return redirect('supplier')
    else:
        supplier_form = SupplierForm()

    supplier = Supplier.objects.all()

    context = {
        'supplier': supplier,
        'supplier_form': supplier_form,
        "locations": locations
    }
    return render(request, "supplier.html", context)

@login_required
def project_details(request, project_id):
    project = Project.objects.filter(id=project_id).first()
    return render(request, 'project_details.html', {'project': project})

@login_required
def realized_cost(request, project_id):
    payment_firms = PaymentFirms.objects.all()
    payment_firms_names = [pf.PaymentFirmsName for pf in payment_firms]

    project = get_object_or_404(Project, id=project_id)
    expenses = Expenses.objects.filter(Q(ProjectName_Expenses=project.ProjectName) & Q(CompanyName_Paying_Expenses__in=payment_firms_names))
    jobhistory = JobHistory.objects.filter(ProjectName_JobHistory=project.ProjectName)
    supplier = Supplier.objects.all()
    details = Details.objects.all()



    # Get distinct companies from PaymentFirms
    distinct_payment_firms = PaymentFirms.objects.all().values('PaymentFirmsName').distinct()

    # Get distinct companies from Expenses and JobHistory
    distinct_expenses_companies = Expenses.objects.filter(ProjectName_Expenses=project.ProjectName).values('CompanyName_Paying_Expenses').distinct()
    distinct_job_history_companies = JobHistory.objects.filter(ProjectName_JobHistory=project.ProjectName).values('CompanyName_Job_JobHistory').distinct()

    # Combine the distinct companies from Expenses and JobHistory
    distinct_expenses_companies_names = [expense['CompanyName_Paying_Expenses'] for expense in distinct_expenses_companies]
    distinct_job_history_companies_names = [history['CompanyName_Job_JobHistory'] for history in distinct_job_history_companies]

    # Merge the distinct companies from both models
    merged_distinct_companies = set(distinct_expenses_companies_names) | set(distinct_job_history_companies_names)

    # Filter distinct_payment_firms based on merged_distinct_companies
    filtered_payment_firms = distinct_payment_firms.filter(PaymentFirmsName__in=merged_distinct_companies)

    # Prepare the list of distinct company names
    distinct_company_names = [company['PaymentFirmsName'] for company in filtered_payment_firms]

    '''*******************-TOTAL_AMOUNT-******************'''
    Total_Amount_List = []

    for dcn in distinct_company_names:
        total_amount = {
            "CompanyName": dcn,
            "Expenses_TL": 0,
            "Expenses_USD": 0,
            "Job_TL": 0,
            "Job_USD": 0
        }

        for exp in expenses:
            if exp.CompanyName_Paying_Expenses == dcn and exp.Amount_Expenses is not None and exp.Amount_USD_Expenses is not None:
                total_amount["Expenses_TL"] += exp.Amount_Expenses
                total_amount["Expenses_USD"] += exp.Amount_USD_Expenses

        for job in jobhistory:
            if job.CompanyName_Job_JobHistory == dcn and job.Amount_JobHistory is not None and job.Amount_USD_JobHistory is not None:
                total_amount["Job_TL"] += job.Amount_JobHistory
                total_amount["Job_USD"] += job.Amount_USD_JobHistory

        if any(value != 0 for value in total_amount.values()):
            Total_Amount_List.append(total_amount)


    if request.method == 'POST':
        expenses_form = ExpensesForm(request.POST)
        jobhistory_form = JobHistoryForm(request.POST)
        supplier_form = SupplierForm(request.POST)

        if expenses_form.is_valid():
           
            expenses_form.save()
            return redirect(request.path)

        if jobhistory_form.is_valid():
            # Do something with the valid JobHistoryForm data
            jobhistory_form.save()
            return redirect(request.path)
        
        if supplier_form.is_valid():
            # Do something with the valid JobHistoryForm data
            supplier_form.save()
            return redirect(request.path)
    else:
        expenses_form = ExpensesForm()
        jobhistory_form = JobHistoryForm()
        supplier_form = SupplierForm()

    context = {
        "project": project,
        "expenses": expenses,   
        "jobhistory": jobhistory,
        "expenses_form": expenses_form,
        "jobhistory_form": jobhistory_form,
        "supplier_form": supplier_form,
        "distinct_company_names": distinct_company_names,
        "Total_Amount_List":Total_Amount_List,
        "supplier":supplier,
        "details":details,
    }
    return render(request, "realized_cost.html", context)

@login_required
def income_details(request, project_id):
    project = Project.objects.filter(id=project_id).first()
    incomes = Incomes.objects.filter(ProjectName_Incomes=project.ProjectName)
    incomes_form = IncomesForm()
    client = Clients.objects.all()

    if request.method == 'POST':
        incomes_form = IncomesForm(request.POST)
        if incomes_form.is_valid():
            incomes_form.instance.CompanyName_Incomes = project.CompanyName
            incomes_form.instance.save()
            return redirect('income_details', project_id=project.id)
        else:
            incomes_form = IncomesForm()

    context = {
        "project": project,
        "incomes": incomes,
        "incomes_form": incomes_form,
        "client": client,
    }
    return render(request, "income_details.html", context)

@login_required
def projects(request):
    banks= Banks.objects.all()
    project = Project.objects.annotate(
        custom_order_situation=Case(
            When(Situation="Onay Bekliyor", then=Value(1)),
            When(Situation="Devam Ediyor", then=Value(2)),
            When(Situation="Tamamlandı", then=Value(3)),
            default=Value(4),
            output_field=IntegerField()
        ),
        custom_order_date=F('StartDate')
    ).order_by('custom_order_situation', 'custom_order_date')

    context = {
        "project": project,
        "banks":banks
    }

    return render(request, "projects.html", context)

@login_required
def inverter(request, operation_care_id):
    operation_care=Operation_Care.objects.filter(id=operation_care_id).first()
    client = Clients.objects.all()
    locations = Locations.objects.all()
    if request.method == 'POST':
        form = ProjectForm(request.POST or None )
        client_form = ClientsForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('operation_care')  
          
        elif client_form.is_valid():
           
            client_form.save()
            return redirect('inverter')
    else:
        form = ProjectForm()
        client_form = ClientsForm()
        
    context = {
        "form": form,
        'form_errors': form.errors,
        "client": client,
        "locations": locations,
        "client_form":client_form,
        "operation_care":operation_care,
    }
    return render(request, "inverter.html", context)

@login_required
def project_add(request):
    client = Clients.objects.all()
    locations = Locations.objects.all()
    if request.method == 'POST':
        form = ProjectForm(request.POST or None )
        client_form = ClientsForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('projects')  
          
        elif client_form.is_valid():
           
            client_form.save()
            return redirect('project_add')
    else:
        form = ProjectForm()
        client_form = ClientsForm()
        
    context = {
        "form": form,
        'form_errors': form.errors,
        "client": client,
        "locations": locations,
        "client_form":client_form,
    }
    return render(request, "project_add.html", context)

@login_required
def expenses_add(request):
    details = Details.objects.all()
    supplier = Supplier.objects.all()
    project = Project.objects.all()

    expenses_form = None
    supplier_form= None
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'supplier_form':
            supplier_form = SupplierForm(request.POST)
            if supplier_form.is_valid():
                supplier_form.save()
                return redirect(request.path)
        
        elif form_type == 'expenses_form':
            expenses_form = ExpensesForm(request.POST)
            if expenses_form.is_valid():
                expenses_form.save()
                return redirect('projects')
        
    else:
        supplier_form = SupplierForm()
        expenses_form = ExpensesForm()
        
    context = {
        "expenses_form": expenses_form,
        'supplier_form': supplier_form,
        "details": details,
        "supplier": supplier,
        "project": project,
    }
    return render(request, "expenses_add.html", context)

@login_required
def jobhistory_add(request):

    jobhistory_form = None
    supplier_form= None
    project = Project.objects.all()
    supplier = Supplier.objects.all()


    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'supplier_form':
            supplier_form = SupplierForm(request.POST)
            if supplier_form.is_valid():
                supplier_form.save()
                return redirect(request.path)
        
        elif form_type == 'jobhistory_form':
            jobhistory_form = JobHistoryForm(request.POST)
            if jobhistory_form.is_valid():
                jobhistory_form.save()
                return redirect('projects')
        
    else:
        supplier_form = SupplierForm()
        jobhistory_form = JobHistoryForm()
        
    context = {
        "jobhistory_form": jobhistory_form,
        'supplier_form': supplier_form,
        "project": project,
        "supplier": supplier,
    }
    return render(request, "jobhistory_add.html", context)

@login_required
def income_add(request):   
    income_form = None
    client_form = None

    client = Clients.objects.all()
    project = Project.objects.all()
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'client_form':
            client_form = ClientsForm(request.POST)
            if client_form.is_valid():
                client_form.save()
                return redirect(request.path)
            
        elif form_type == 'income_form':
            income_form = IncomesForm(request.POST)
            if income_form.is_valid():
                income_form.save()
                return redirect('projects')
    else:
        income_form = IncomesForm()
        client_form = ClientsForm()

    context = {
        "incomes_form": income_form,
        "client": client,
        "project":project,
        "client_form":client_form,
    }
    return render(request, "income_add.html", context)

@login_required
def expenses_add_wp(request, project_id):
    details = Details.objects.all()
    supplier = Supplier.objects.all()
    project = get_object_or_404(Project, id=project_id)

    expenses_form = None
    supplier_form= None
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'supplier_form':
            supplier_form = SupplierForm(request.POST)
            if supplier_form.is_valid():
                supplier_form.save()
                return redirect('expenses_add_wp',project_id=project.id )
        
        elif form_type == 'expenses_form':
            expenses_form = ExpensesForm(request.POST)
            if expenses_form.is_valid():
                expenses_form.save()
                return redirect('realized_cost', project_name = project.ProjectName)
        
    else:
        supplier_form = SupplierForm()
        expenses_form = ExpensesForm()
        
    context = {
        "expenses_form": expenses_form,
        'supplier_form': supplier_form,
        "details": details,
        "supplier": supplier,
        "project": project,
    }
    return render(request, "expenses_add_wp.html", context)

@login_required
def jobhistory_add_wp(request, project_id):

    jobhistory_form = None
    supplier_form= None
    project = get_object_or_404(Project, id=project_id)
    supplier = Supplier.objects.all()


    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'supplier_form':
            supplier_form = SupplierForm(request.POST)
            if supplier_form.is_valid():
                supplier_form.save()
                return redirect('jobhistory_add_wp',project_id=project.id )
        
        elif form_type == 'jobhistory_form':
            jobhistory_form = JobHistoryForm(request.POST)
            if jobhistory_form.is_valid():
                jobhistory_form.save()
                return redirect('realized_cost', project_name = project.ProjectName)
        
    else:
        supplier_form = SupplierForm()
        jobhistory_form = JobHistoryForm()
        
    context = {
        "jobhistory_form": jobhistory_form,
        'supplier_form': supplier_form,
        "project": project,
        "supplier": supplier,
    }
    return render(request, "jobhistory_add_wp.html", context)

@login_required
def income_add_wp(request, project_id):
    income_form = None
    client_form = None

    client = Clients.objects.all()
    project = get_object_or_404(Project, id=project_id)
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'income_form':
            income_form = IncomesForm(request.POST)
            if income_form.is_valid():
                income_form.save()
                return redirect('income_details', project_name = project.ProjectName)
            
        elif form_type == 'client_form':
            client_form = ClientsForm(request.POST)
            if client_form.is_valid():
                client_form.save()
                return redirect('income_add_wp',project_id=project.id )

    else:
        income_form = IncomesForm()
        client_form = ClientsForm()

    context = {
        "incomes_form": income_form,
        "client": client,
        "project":project,
        "client_form":client_form,
    }
    return render(request, "income_add_wp.html", context)

# Satış Teklif Modülü

@login_required
def sales_offer_revises(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    revises = SalesOfferCard_Revise.objects.filter(Revise_Owner=card)

    context={
        'card':card,    
        'revises':revises,
    }
    return render(request, "sales_offer_revises.html", context)

@login_required
def sales_offer_edit(request, sales_offer_id):
    client = Clients.objects.all()
    workers = Worker.objects.all()
    locations = Locations.objects.all()
    sales_offer_edit_curr = get_object_or_404(SalesOfferCard, id=sales_offer_id) 
    
    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        sales_form = SalesOfferCardForm(request.POST, request.FILES,instance=sales_offer_edit_curr)
        client_form = ClientsForm(request.POST or None )
        print("form.is_valid")

        if sales_form.is_valid():

            print("sales_form.is_valid")
            sales_form.save()
            return redirect('sales_offer')  
        
        elif  client_form.is_valid():

            print("client_form.is_valid")
            client_form.save()
            return redirect('sales_offer_edit', sales_offer_id=sales_offer_id)
        
    else:  
        print("else.is_valid")

        sales_form = SalesOfferCardForm(instance=sales_offer_edit_curr)
        client_form = ClientsForm()

    context={
        'sales_form':sales_form,
        'client':client,
        'locations':locations,
        'client_form':client_form,
        'sales_offer_edit_curr':sales_offer_edit_curr,
        'workers':workers
    }
    return render(request, "sales_offer_edit.html", context)

@login_required
def sales_offer_add(request):
    client = Clients.objects.all()
    locations = Locations.objects.all()
    workers = Worker.objects.all()

    if request.method == 'POST':
        sales_form = SalesOfferCardForm(request.POST, request.FILES )
        client_form = ClientsForm(request.POST or None )
        if sales_form.is_valid():
            sales_form.save()
            return redirect('sales_offer')  
        elif client_form.is_valid():
            client_form.save()
            return redirect('sales_offer_add')
        
    else:  
        sales_form = SalesOfferCardForm()
        client_form = ClientsForm()

    context={
        'sales_form':sales_form,
        'client':client,
        'locations':locations,
        'client_form':client_form,
        'error': sales_form.errors,
        'workers':workers

    }
    return render(request, "sales_offer_add.html", context)

@user_passes_test(isAdmin, login_url='/home')
def sales_offer(request):
    sales_offer_card = SalesOfferCard.objects.all()
   

    potential_customers = sales_offer_card.filter(Situation_Card='Potansiyel Müşteri', Cost_NotIncludingKDV_Card__isnull=False)
    potential_customers_cost = potential_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    potential_customers_count = potential_customers.count()

    cost_customers = sales_offer_card.filter(Situation_Card='Maliyet Hesaplama', Cost_NotIncludingKDV_Card__isnull=False)
    cost_customers_cost = cost_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    cost_customers_count = cost_customers.count()

    price_customers = sales_offer_card.filter(Situation_Card='Fiyat Belirleme', Cost_NotIncludingKDV_Card__isnull=False)
    price_customers_cost = price_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    price_customers_count = price_customers.count()

    offer_customers = sales_offer_card.filter(Situation_Card='Teklif Hazırlama', Cost_NotIncludingKDV_Card__isnull=False)
    offer_customers_cost = offer_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    offer_customers_count = offer_customers.count()

    presentation_customers = sales_offer_card.filter(Situation_Card='Sunum Sonrası Görüşme', Cost_NotIncludingKDV_Card__isnull=False)
    presentation_customers_cost = presentation_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    presentation_customers_count = presentation_customers.count()

    done_customers = sales_offer_card.filter(Situation_Card='Teklif Sunuldu', Cost_NotIncludingKDV_Card__isnull=False)
    done_customers_cost = done_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    done_customers_count = done_customers.count()




    context = {
        'sales_offer_card':sales_offer_card,
        'potential_customers_cost':potential_customers_cost,
        'potential_customers_count':potential_customers_count,
        'cost_customers_cost':cost_customers_cost,
        'cost_customers_count':cost_customers_count,
        'price_customers_cost':price_customers_cost,
        'price_customers_count':price_customers_count,
        'offer_customers_cost':offer_customers_cost,
        'offer_customers_count':offer_customers_count,
        'presentation_customers_cost':presentation_customers_cost,
        'presentation_customers_count':presentation_customers_count,
        'done_customers_cost':done_customers_cost,
        'done_customers_count':done_customers_count,
    }
    return render(request, "sales_offer.html", context)

#İşletme Bakım Modülü

@login_required
def operation_care(request):
    operations = Operation_Care.objects.all()
    fails = Fail.objects.all()

    for op in operations:
        i = 0  # Her döngü başında i'yi sıfırla
        for fa in fails:
            if fa.Fail_Operation_Care == op:  # Değişiklik yapıldı
                i += 1
        op.Operation_Care_Fail_Number = i
        op.save()

    fail_bills = Fail_Bill.objects.all()

    context = {
        "operations": operations,
        "fails": fails,
        "fail_bills": fail_bills,
    }

    return render(request, "operation_care.html", context)

@login_required
def operation_care_add(request):
    client = Clients.objects.all()
    locations = Locations.objects.all()
    if request.method == 'POST':
        form = Operation_CareForm(request.POST or None )
        client_form = ClientsForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('operation_care')  
          
        elif client_form.is_valid():
           
            client_form.save()
            return redirect('operation_care_add')
    else:
        form = Operation_CareForm()
        client_form = ClientsForm()
        
    context = {
        "form": form,
        'form_errors': form.errors,
        "client": client,
        "locations": locations,
        "client_form":client_form,
    }
    return render(request, "operation_care_add.html", context)

@login_required
def operation_care_edit(request, operation_care_id):
    operation_care = get_object_or_404(Operation_Care, id=operation_care_id)
    client = Clients.objects.all()
    locations = Locations.objects.all()
    if request.method == 'POST':
        form = Operation_CareForm(request.POST, instance=operation_care )

        if form.is_valid():
            form.save()
            return redirect('operation_care')  
    else:
        form = Operation_CareForm()
        
    context = {
        "form": form,
        "client": client,
        "locations": locations,
        "operation_care":operation_care,
    }
    return render(request, "operation_care_edit.html", context)

@login_required
def fault_notification(request):
    operation_cares=Operation_Care.objects.all()

    if request.method == 'POST':
        form = FailForm(request.POST or None )
        bill_form = Fail_BillForm(request.POST, request.FILES )

        if form.is_valid():
            data2 = form.cleaned_data
            fail_instance = Fail.objects.create(
                Fail_Operation_Care_Copy=data2['Fail_Operation_Care_Copy'],
                Fail_Central_Name=data2['Fail_Central_Name'], 
                Fail_Information_Person=data2['Fail_Information_Person'],
                Fail_Guaranteed=data2['Fail_Guaranteed'], 
                Fail_Detection_Date=data2['Fail_Detection_Date'], 
                Fail_Situation=data2['Fail_Situation']
                )
            if bill_form.is_valid():
                data1 = bill_form.cleaned_data
                fail_bill_instance = Fail_Bill.objects.create(
                    Fail_Bill_Owner=fail_instance, 
                    Fail_Bill_Central_Name=data1['Fail_Bill_Central_Name'],
                    Fail_Bill_Process=data1['Fail_Bill_Process'], 
                    Fail_Bill_Date=data1['Fail_Bill_Date'],
                    Fail_Bill_Detail=data1['Fail_Bill_Detail'], 
                    Fail_Bill_File=data1['Fail_Bill_File']
                    )

            return redirect('operation_care')  
    else:
        form = FailForm()
        bill_form = Fail_BillForm()

    context = {
        "form": form,
        "bill_form":bill_form,
        "operation_cares":operation_cares,
    }
    return render(request, "fault_notification.html", context)

@login_required
def fail_edit(request, fail_id):
    fail = get_object_or_404(Fail, id=fail_id)
    operation_cares = Operation_Care.objects.all()
    client = Clients.objects.all()
    locations = Locations.objects.all()
    if request.method == 'POST':
        form = FailForm(request.POST, instance=fail)

        if form.is_valid():
            form.save()
            return redirect('operation_care')  
    else:
        form = ProjectForm()
        
    context = {
        "form": form,
        'form_errors': form.errors,
        "client": client,
        "locations": locations,
        "fail":fail,
        "operation_cares":operation_cares
    }
    return render(request, "fail_edit.html", context)

@login_required
def operation_care_detail(request,operation_care_id):
    operation_care=Operation_Care.objects.filter(id=operation_care_id).first()
    fails= Fail.objects.filter(Fail_Operation_Care=operation_care)
    inventors =Inventor.objects.filter(Inventor_Owner=operation_care)

    inventor_strings = {}

    # Iterate through inventors
    for inv in inventors:
        # Get all strings related to the current inventor
        strings = String.objects.filter(String_Owner=inv)
        inventor_strings[inv] = strings          
    context = {
        'fails':fails,
        "operation_care":operation_care,
        "inventors":inventors,
        "inventor_strings": inventor_strings,
    }

    return render(request, "operation_care_detail.html", context)

#deneme

@login_required
def deneme(request):

    locations = Locations.objects.all()
    if request.method == 'POST':
        client_form = ClientsForm(request.POST)
        if client_form.is_valid():
            client_form.save()
            return redirect('client')
    else:
        client_form = ClientsForm()

    clients = Clients.objects.all()

    context = {
        'clients': clients,
        'client_form': client_form,
        "locations": locations
    }
    return render(request, "deneme.html", context)

@login_required
def deneme2(request):
    sales_offer_card = SalesOfferCard.objects.all()
   

    potential_customers = sales_offer_card.filter(Situation_Card='Potansiyel Müşteri', Cost_NotIncludingKDV_Card__isnull=False)
    potential_customers_cost = potential_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    potential_customers_count = potential_customers.count()

    cost_customers = sales_offer_card.filter(Situation_Card='Maliyet Hesaplama', Cost_NotIncludingKDV_Card__isnull=False)
    cost_customers_cost = cost_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    cost_customers_count = cost_customers.count()

    price_customers = sales_offer_card.filter(Situation_Card='Fiyat Belirleme', Cost_NotIncludingKDV_Card__isnull=False)
    price_customers_cost = price_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    price_customers_count = price_customers.count()

    offer_customers = sales_offer_card.filter(Situation_Card='Teklif Hazırlama', Cost_NotIncludingKDV_Card__isnull=False)
    offer_customers_cost = offer_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    offer_customers_count = offer_customers.count()

    presentation_customers = sales_offer_card.filter(Situation_Card='Sunum Sonrası Görüşme', Cost_NotIncludingKDV_Card__isnull=False)
    presentation_customers_cost = presentation_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    presentation_customers_count = presentation_customers.count()

    done_customers = sales_offer_card.filter(Situation_Card='Teklif Sunuldu', Cost_NotIncludingKDV_Card__isnull=False)
    done_customers_cost = done_customers.aggregate(total_cost=Sum('Cost_NotIncludingKDV_Card'))['total_cost']
    done_customers_count = done_customers.count()




    context = {
        'sales_offer_card':sales_offer_card,
        'potential_customers_cost':potential_customers_cost,
        'potential_customers_count':potential_customers_count,
        'cost_customers_cost':cost_customers_cost,
        'cost_customers_count':cost_customers_count,
        'price_customers_cost':price_customers_cost,
        'price_customers_count':price_customers_count,
        'offer_customers_cost':offer_customers_cost,
        'offer_customers_count':offer_customers_count,
        'presentation_customers_cost':presentation_customers_cost,
        'presentation_customers_count':presentation_customers_count,
        'done_customers_cost':done_customers_cost,
        'done_customers_count':done_customers_count,
    }
    return render(request, "deneme2.html", context)



#***********************************************************
#                       GET METHODLARI
#***********************************************************


@login_required
def get_cards(request):
    cards = SalesOfferCard.objects.all().values()  
    return JsonResponse({'cards': list(cards)})

@login_required
def get_lost_cards(request):
    lost_cards = SalesOfferCard.objects.filter(Is_Lost=True).values()
    return JsonResponse({'lost_cards': list(lost_cards)})

@login_required
def get_gain_cards(request):
    gain_cards = SalesOfferCard.objects.filter(Is_Gain=True).values()
    return JsonResponse({'gain_cards': list(gain_cards)})

@login_required
def get_late_cards(request):
    late_cards = SalesOfferCard.objects.filter(Is_late=True).values()
    return JsonResponse({'late_cards': list(late_cards)})

@login_required
def get_run_cards(request):
    run_cards = SalesOfferCard.objects.filter(Is_late=False, Is_Gain=False, Is_Lost=False).values()
    return JsonResponse({'run_cards': list(run_cards)})


def get_operation_care(request):
    operation_care = Operation_Care.objects.all().values()
    return JsonResponse({'operation_care': list(operation_care)})

def get_fail(request):
    fail = Fail.objects.all().values()
    return JsonResponse({'fail': list(fail)})

def get_fail_bill(request):
    fail_bill = Fail_Bill.objects.all().values()
    return JsonResponse({'fail_bill': list(fail_bill)})

@login_required
def get_inventors(request, operation_care_id):
    operation_care = Operation_Care.objects.filter(id=operation_care_id).first()
    inventors = Inventor.objects.filter(Inventor_Owner=operation_care).values()
    return JsonResponse({'inventors': list(inventors)})

@login_required
def get_strings(request, inventor_id):
    inventor = Inventor.objects.filter(id=inventor_id).first()
    strings = String.objects.filter(String_Owner=inventor).values()
    return JsonResponse({'strings': list(strings)})

@login_required
def get_dollar_rate(request, date):
    api='qYyWXNCbA0'
    evds = e.evdsAPI(api)
    dollar =  evds.get_data(['TP.DK.USD.S.YTL'], startdate=date, enddate=date)
    print(date)
    rate=dollar.TP_DK_USD_S_YTL.values[0]
    rate = round(rate, 4)  # 4 ondalık basamak
    return JsonResponse({'rate': rate})

#***********************************************************
#                       SET METHODLARI
#***********************************************************

@require_POST
def create_revise(request, card_id):
    # Retrieve the existing SalesOfferCard instance
    card = get_object_or_404(SalesOfferCard, id=card_id)

    # Create a new SalesOfferCard_Revise instance
    revise = SalesOfferCard_Revise(
        Revise_Owner=card,
        Client_Card_Copy=card.Client_Card_Copy,
        Client_Card=card.Client_Card,
        Offer_Subject_Card=card.Offer_Subject_Card,
        Location_Card=card.Location_Card,
        Cost_NotIncludingKDV_Card=card.Cost_NotIncludingKDV_Card,
        Offer_Cost_NotIncludingKDV_Card=card.Offer_Cost_NotIncludingKDV_Card,
        AC_Power_Card=card.AC_Power_Card,
        DC_Power_Card=card.DC_Power_Card,
        UnitCost_NotIncludingKDV=card.UnitCost_NotIncludingKDV,
        UnitOffer_NotIncludingKDV=card.UnitOffer_NotIncludingKDV,
        Situation_Card=card.Situation_Card,
        Date_Card=card.Date_Card,
        Terrain_Roof_Card=card.Terrain_Roof_Card,
        Roof_Cost_Card=card.Roof_Cost_Card,
        Comment_Date_Card=card.Comment_Date_Card,
        Offer_Comment_Card=card.Offer_Comment_Card,
        Person_Deal=card.Person_Deal,
        Person_Related=card.Person_Related,
        Offer_File_Card=card.Offer_File_Card,
        Offer_File_Card_2=card.Offer_File_Card_2,
        Offer_File_Card_3=card.Offer_File_Card_3,
        Offer_File_Card_4=card.Offer_File_Card_4,
        Offer_File_Card_5=card.Offer_File_Card_5,
        M_File_Card=card.M_File_Card,
        M_File_Card_2=card.M_File_Card_2,
        M_File_Card_3=card.M_File_Card_3,
        Is_Lost=card.Is_Lost,
        Is_Gain=card.Is_Gain,
        Is_late=card.Is_late,
        Unit_Cost_with_Roof_Cost=card.Unit_Cost_with_Roof_Cost,
        Unit_Offer_with_Roof_Cost=card.Unit_Offer_with_Roof_Cost,
        Profit_Rate_Card=card.Profit_Rate_Card,
    )

    # Save the new SalesOfferCard_Revise instance
    revise.save()

    # Return a JSON response
    return JsonResponse({'success': True})

@require_POST
def set_card_wait(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_late = True
    card.save()
    return JsonResponse({'success': True})

@require_POST
def set_card_rewait(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_late = False
    card.save()
    return JsonResponse({'success': True})

@require_POST
def set_card_gain(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_Gain = True
    card.save()
    return JsonResponse({'success': True})

@require_POST
def set_card_regain(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_Gain = False
    card.save()
    return JsonResponse({'success': True})

@require_POST
def set_card_lost(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_Lost = True
    card.save()
    return JsonResponse({'success': True})

@require_POST
def set_card_relost(request, card_id):
    card = get_object_or_404(SalesOfferCard, id=card_id)
    print("id alındı")
    card.Is_Lost = False
    card.save()
    return JsonResponse({'success': True})

def delete_salesoffercard(request, card_id):
    try:
        card = SalesOfferCard.objects.get(id=card_id)

        # Modeli silme
        card.delete()

        # Başarılı bir silme işlemi sonrasında yapılacak işlemler
        # Örneğin, bir mesaj gösterme veya başka bir sayfaya yönlendirme

    except card.DoesNotExist:
        # Model bulunamadıysa yapılacak işlemler
        # Örneğin, bir hata mesajı gösterme veya başka bir sayfaya yönlendirme
        return HttpResponse("Silme işlemi başarısız")

@csrf_exempt  # Temporarily disable CSRF for simplicity. Add proper CSRF handling in production.
def update_card_situation(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        card_id = data.get('card_id')
        new_situation = data.get('new_situation')

        # Update the card's situation in the database
        try:
            card = SalesOfferCard.objects.get(id=card_id)
            card.Situation_Card = new_situation
            card.save()
            return JsonResponse({'success': True})
        except SalesOfferCard.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Card not found'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

#***********************************************************
#                       POST METHODLARI
#***********************************************************



@csrf_exempt
def post_sales_offer(request):
    if request.method == 'POST':
        Client_Card_Copy = request.POST.get('Client_Card_Copy')
        Offer_Subject_Card = request.POST.get('Offer_Subject_Card')
        Location_Card = request.POST.get('Location_Card')
        Cost_NotIncludingKDV_Card = request.POST.get('Cost_NotIncludingKDV_Card')
        Offer_Cost_NotIncludingKDV_Card = request.POST.get('Offer_Cost_NotIncludingKDV_Card')
        AC_Power_Card = request.POST.get('AC_Power_Card')
        DC_Power_Card = request.POST.get('DC_Power_Card')
        UnitCost_NotIncludingKDV = request.POST.get('UnitCost_NotIncludingKDV')
        UnitOffer_NotIncludingKDV = request.POST.get('UnitOffer_NotIncludingKDV')
        Situation_Card = request.POST.get('Situation_Card')
        Date_Card = request.POST.get('Date_Card')
        Terrain_Roof_Card = request.POST.get('Terrain_Roof_Card')
        Roof_Cost_Card = request.POST.get('Roof_Cost_Card')
        Person_Deal = request.POST.get('Person_Deal')
        Person_Related = request.POST.get('Person_Related')
        Offer_Comment_Card = request.POST.get('Offer_Comment_Card')

        M_File_Card = request.FILES.get('M_File_Card')
        M_File_Card_2 = request.FILES.get('M_File_Card_2')
        M_File_Card_3 = request.FILES.get('M_File_Card_3')
        Offer_File_Card = request.FILES.get('Offer_File_Card')
        Offer_File_Card_2 = request.FILES.get('Offer_File_Card_2')
        Offer_File_Card_3 = request.FILES.get('Offer_File_Card_3')
        Offer_File_Card_4 = request.FILES.get('Offer_File_Card_4')
        Offer_File_Card_5 = request.FILES.get('Offer_File_Card_5')


        if Client_Card_Copy:
            SalesOfferCard.objects.create(
                Client_Card_Copy = Client_Card_Copy,
                Offer_Subject_Card = Offer_Subject_Card ,
                Location_Card = Location_Card,
                Cost_NotIncludingKDV_Card =Cost_NotIncludingKDV_Card ,
                Offer_Cost_NotIncludingKDV_Card = Offer_Cost_NotIncludingKDV_Card,
                AC_Power_Card = AC_Power_Card,
                DC_Power_Card = DC_Power_Card,
                UnitCost_NotIncludingKDV = UnitCost_NotIncludingKDV,
                UnitOffer_NotIncludingKDV =UnitOffer_NotIncludingKDV,
                Situation_Card =Situation_Card,
                Date_Card =Date_Card,
                Terrain_Roof_Card =Terrain_Roof_Card,
                Roof_Cost_Card =Roof_Cost_Card,
                Person_Deal = Person_Deal,
                Person_Related =Person_Related,
                Offer_Comment_Card =Offer_Comment_Card,
                M_File_Card =M_File_Card,
                M_File_Card_2 =M_File_Card_2,
                M_File_Card_3 =M_File_Card_3,
                Offer_File_Card =Offer_File_Card,
                Offer_File_Card_2 =Offer_File_Card_2,
                Offer_File_Card_3 =Offer_File_Card_3,
                Offer_File_Card_4 =Offer_File_Card_4,
                Offer_File_Card_5 =Offer_File_Card_5
            )
            return JsonResponse({'message': 'SalesOfferCard Başarı ile oluşturuldu'})
        return JsonResponse({'message': 'Post alındı ama SalesOfferCard oluşturulamadı'})

    return JsonResponse({'error': 'Geçersiz istek'}, status=400)

@csrf_exempt
def post_update_sales_offer(request, sales_offer_id):
    curr_sales_offer = get_object_or_404(SalesOfferCard, id=sales_offer_id)
    if request.method == 'POST':
        Client_Card_Copy = request.POST.get('Client_Card_Copy')
        Offer_Subject_Card = request.POST.get('Offer_Subject_Card')
        Location_Card = request.POST.get('Location_Card')
        Cost_NotIncludingKDV_Card = request.POST.get('Cost_NotIncludingKDV_Card')
        Offer_Cost_NotIncludingKDV_Card = request.POST.get('Offer_Cost_NotIncludingKDV_Card')
        AC_Power_Card = request.POST.get('AC_Power_Card')
        DC_Power_Card = request.POST.get('DC_Power_Card')
        UnitCost_NotIncludingKDV = request.POST.get('UnitCost_NotIncludingKDV')
        UnitOffer_NotIncludingKDV = request.POST.get('UnitOffer_NotIncludingKDV')
        Situation_Card = request.POST.get('Situation_Card')
        Date_Card = request.POST.get('Date_Card')
        Terrain_Roof_Card = request.POST.get('Terrain_Roof_Card')
        Roof_Cost_Card = request.POST.get('Roof_Cost_Card')
        Person_Deal = request.POST.get('Person_Deal')
        Person_Related = request.POST.get('Person_Related')
        Offer_Comment_Card = request.POST.get('Offer_Comment_Card')

        M_File_Card = request.FILES.get('M_File_Card')
        M_File_Card_2 = request.FILES.get('M_File_Card_2')
        M_File_Card_3 = request.FILES.get('M_File_Card_3')
        Offer_File_Card = request.FILES.get('Offer_File_Card')
        Offer_File_Card_2 = request.FILES.get('Offer_File_Card_2')
        Offer_File_Card_3 = request.FILES.get('Offer_File_Card_3')
        Offer_File_Card_4 = request.FILES.get('Offer_File_Card_4')
        Offer_File_Card_5 = request.FILES.get('Offer_File_Card_5')

        if Client_Card_Copy:
            curr_sales_offer.Client_Card_Copy = Client_Card_Copy,
            curr_sales_offer.Offer_Subject_Card = Offer_Subject_Card ,
            curr_sales_offer.Location_Card = Location_Card,
            curr_sales_offer.Cost_NotIncludingKDV_Card =Cost_NotIncludingKDV_Card ,
            curr_sales_offer.Offer_Cost_NotIncludingKDV_Card = Offer_Cost_NotIncludingKDV_Card,
            curr_sales_offer.AC_Power_Card = AC_Power_Card,
            curr_sales_offer.DC_Power_Card = DC_Power_Card,
            curr_sales_offer.UnitCost_NotIncludingKDV = UnitCost_NotIncludingKDV,
            curr_sales_offer.UnitOffer_NotIncludingKDV =UnitOffer_NotIncludingKDV,
            curr_sales_offer.Situation_Card =Situation_Card,
            curr_sales_offer.Date_Card =Date_Card,
            curr_sales_offer.Terrain_Roof_Card =Terrain_Roof_Card,
            curr_sales_offer.Roof_Cost_Card =Roof_Cost_Card,
            curr_sales_offer.Person_Deal = Person_Deal,
            curr_sales_offer.Person_Related =Person_Related,
            curr_sales_offer.Offer_Comment_Card =Offer_Comment_Card,
            curr_sales_offer.M_File_Card =M_File_Card,
            curr_sales_offer.M_File_Card_2 =M_File_Card_2,
            curr_sales_offer.M_File_Card_3 =M_File_Card_3,
            curr_sales_offer.Offer_File_Card =Offer_File_Card,
            curr_sales_offer.Offer_File_Card_2 =Offer_File_Card_2,
            curr_sales_offer.Offer_File_Card_3 =Offer_File_Card_3,
            curr_sales_offer.Offer_File_Card_4 =Offer_File_Card_4,
            curr_sales_offer.Offer_File_Card_5 =Offer_File_Card_5
            curr_sales_offer.save()
            return JsonResponse({'message': 'SalesOfferCard Başarı ile oluşturuldu'})
        return JsonResponse({'message': 'Post alındı ama SalesOfferCard oluşturulamadı'})

    return JsonResponse({'error': 'Geçersiz istek'}, status=400)


@csrf_exempt
def post_card_file(request):
    if request.method == 'POST':
        card_id = request.POST.get('card_id')
        file_type = request.POST.get('file_type')
        file = request.FILES.get('file')

        try:
            card = SalesOfferCard.objects.get(pk=card_id)
        except SalesOfferCard.DoesNotExist:
            return JsonResponse({'error': 'SalesOfferCard bulunamadı'}, status=404)

        # Dosya tipine göre doğru alanı seçin ve dosyayı kaydedin
        if file_type == 'M_File_Card':
            # Burada birden fazla M_File_Card alanı varsa, hangisini kullanacağınıza karar vermeniz gerekebilir
            card.M_File_Card = file
        elif file_type == 'M_File_Card_2':

            card.M_File_Card_2 = file
        elif file_type == 'M_File_Card_3':

            card.M_File_Card_3 = file
        elif file_type == 'Offer_File_Card':

            card.Offer_File_Card = file
        elif file_type == 'Offer_File_Card_2':

            card.Offer_File_Card_2 = file
        elif file_type == 'Offer_File_Card_3':

            card.Offer_File_Card_3 = file
        elif file_type == 'Offer_File_Card_4':

            card.Offer_File_Card_4 = file
        elif file_type == 'Offer_File_Card_5':

            card.Offer_File_Card_5 = file
        else:
            return JsonResponse({'error': 'Geçersiz dosya tipi'}, status=400)

        card.save()
        return JsonResponse({'message': 'Dosya başarıyla yüklendi'})

    return JsonResponse({'error': 'Geçersiz istek'}, status=400)

@csrf_exempt
def post_fail_bill(request):
    if request.method == 'POST':
        
        Fail_Bill_Owner = request.POST.get('Fail_Bill_Owner')
        Fail_Bill_Central_Name= request.POST.get('Fail_Bill_Central_Name')
        Fail_Bill_Process= request.POST.get('Fail_Bill_Process')
        Fail_Bill_Date= request.POST.get('Fail_Bill_Date')
        Fail_Bill_Detail= request.POST.get('Fail_Bill_Detail')
        Fail_Bill_File = request.FILES.get('Fail_Bill_File')

        Fail_Bill.objects.create(
            Fail_Bill_Owner=Fail_Bill_Owner, 
            Fail_Bill_Central_Name=Fail_Bill_Central_Name, 
            Fail_Bill_Date=Fail_Bill_Date, 
            Fail_Bill_Detail=Fail_Bill_Detail, 
            Fail_Bill_File=Fail_Bill_File, 
            Fail_Bill_Process= Fail_Bill_Process

        )

        return JsonResponse({'message': 'Supplier Başarı ile oluşturuldu'})

    return JsonResponse({'error': 'Geçersiz istek'}, status=400)

@csrf_exempt
def post_update_string(request, string_id):
    string=String.objects.filter(id=string_id).first()
    if string is None:
        return JsonResponse({'error': 'String bulunamadı'}, status=404)
    if request.method == 'POST':
        
        string.String_Number = request.POST.get('String_Number')
        string.String_Panel_Power= request.POST.get('String_Panel_Power')
        string.String_Panel_Brand= request.POST.get('String_Panel_Brand')
        string.String_VOC= request.POST.get('String_VOC')
        string.String_Panel_SY= request.POST.get('String_Panel_SY')
        string.String_Izolasion= request.POST.get('String_Izolasion')
        string.String_AC_Power= request.POST.get('String_AC_Power')
        string.String_DC_Power= request.POST.get('String_DC_Power')
        string.String_Capacity= request.POST.get('String_Capacity')
        string.String_Percent= request.POST.get('String_Percent')

        string.save()

        return JsonResponse({'message': 'String Başarı ile güncellendi'})

    return JsonResponse({'error': 'Geçersiz istek'}, status=400)

