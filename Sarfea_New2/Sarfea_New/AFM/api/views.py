from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from AFM.api.serializers import ClientSerializer, SupplierSerializer, ProjectSerializer, ExpensesSerializer, JobHistorySerializer, IncomesSerializer
from AFM.models import Project, Expenses, Incomes, PaymentFirms, CompanyNames, JobHistory, ProjectNames
from AFM.models import SalesOfferCard,SalesOfferCard_Revise, MyCompanyNames, PaymentFirms, Clients ,Details 
from AFM.models import Supplier, Locations,Terrain_Roof, Situations, Banks, Worker, Operation_Care, Fail, Fail_Bill, Inventor, String
from django.contrib.auth.decorators import login_required, user_passes_test

class ProjectListAPIView(APIView):
    def get(self, request):
        projects = Project.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class ProjectDetailAPIView(APIView):
    def get(self, request, project_id):
        project = get_object_or_404(Project,id=project_id)
        serializer= ProjectSerializer(project)
        return Response(serializer.data)
    def put(self, request, project_id):
        project = get_object_or_404(Project,id=project_id)
        serializer= ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, project_id):
        project = get_object_or_404(Project,id=project_id)
        project.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
'''
@api_view(['GET', 'POST'])
@login_required
def api_projects(request):

    if request.method == 'GET':
        projects = Project.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer= ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@login_required
def api_project_detail(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response(
            {
                'errors':{
                    'code':404,
                    'message': f'{project_id} id li proje bulunamadı!' 
                }
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer= ProjectSerializer(project)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''


class ExpensesListAPIView(APIView):
    def get(self, request):
        expenses = Expenses.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= ExpensesSerializer(expenses, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= ExpensesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class ExpenseDetailAPIView(APIView):
    def get(self, request, expenses_id):
        expense = get_object_or_404(Expenses,id=expenses_id)
        serializer= ExpensesSerializer(expense)
        return Response(serializer.data)
    def put(self, request, expenses_id):
        expense = get_object_or_404(Expenses,id=expenses_id)
        serializer= ExpensesSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, expenses_id):
        expense = get_object_or_404(Expenses,id=expenses_id)
        expense.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)


'''@api_view(['GET'])
@login_required
def get_expenses(request):
    expenses = Expenses.objects.all()
    serializer= ExpensesSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@login_required
def get_expenses_id(request, expenses_id):
    expenses = get_object_or_404(Expenses, id=expenses_id)  # Tüm müşterileri JSON formatında al
    serializer= ExpensesSerializer(expenses)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def post_expenses(request):
    serializer= ExpensesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
    
@api_view(['PUT'])
@csrf_exempt
def post_update_expenses(request, expenses_id):
    curr_expenses = get_object_or_404(Expenses, id=expenses_id)

    serializer = ExpensesSerializer(curr_expenses, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
'''

class JobHistoryListAPIView(APIView):
    def get(self, request):
        jobs = JobHistory.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= JobHistorySerializer(jobs, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= JobHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class JobHistoryDetailAPIView(APIView):
    def get(self, request, jobhistory_id):
        job = get_object_or_404(JobHistory,id=jobhistory_id)
        serializer= JobHistorySerializer(job)
        return Response(serializer.data)
    def put(self, request, jobhistory_id):
        job = get_object_or_404(JobHistory,id=jobhistory_id)
        serializer= JobHistorySerializer(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, jobhistory_id):
        job = get_object_or_404(JobHistory,id=jobhistory_id)
        job.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
'''
@api_view(['GET'])
@login_required
def get_job_history(request):
    jobhistory = JobHistory.objects.all()
    serializer= JobHistorySerializer(jobhistory, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def get_job_history_id(request, jobhistory_id):
    job_history = get_object_or_404(JobHistory, id=jobhistory_id)  # Tüm müşterileri JSON formatında al
    serializer= JobHistorySerializer(job_history)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def post_jobhistory(request):
    serializer= JobHistorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@csrf_exempt
@api_view(['PUT'])
def post_update_jobhistory(request, jobhistory_id):
    curr_jobhistory = get_object_or_404(JobHistory, id=jobhistory_id)

    serializer = JobHistorySerializer(curr_jobhistory, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
'''

class IncomesListAPIView(APIView):
    def get(self, request):
        incomes = Incomes.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= IncomesSerializer(incomes, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= IncomesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class IncomeDetailAPIView(APIView):
    def get(self, request, incomes_id):
        income = get_object_or_404(Incomes,id=incomes_id)
        serializer= IncomesSerializer(income)
        return Response(serializer.data)
    def put(self, request, incomes_id):
        income = get_object_or_404(Incomes,id=incomes_id)
        serializer= IncomesSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, incomes_id):
        income = get_object_or_404(Incomes,id=incomes_id)
        income.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

'''
@api_view(['GET'])
@login_required
def get_incomes(request):
    incomes = Incomes.objects.all()
    serializer= IncomesSerializer(incomes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def get_income_id(request, incomes_id):
    income = get_object_or_404(Incomes, id=incomes_id)  # Tüm müşterileri JSON formatında al
    serializer= IncomesSerializer(income)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def post_income(request):
    serializer= IncomesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@api_view(['PUT'])
@csrf_exempt
def post_update_income(request, income_id):
    curr_income = get_object_or_404(Incomes, id=income_id)
    serializer = IncomesSerializer(curr_income, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
'''

class ClientsListAPIView(APIView):
    def get(self, request):
        clients = Clients.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= ClientSerializer(clients, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class ClientDetailAPIView(APIView):
    def get(self, request, client_id):
        client = get_object_or_404(Clients,id=client_id)
        serializer= ClientSerializer(client)
        return Response(serializer.data)
    def put(self, request, client_id):
        client = get_object_or_404(Clients,id=client_id)
        serializer= ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, client_id):
        client = get_object_or_404(Clients,id=client_id)
        client.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
'''
@api_view(['GET'])
def get_clients(request):
    clients = Clients.objects.all() # Tüm müşterileri JSON formatında al
    serializer = ClientSerializer(clients, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def get_client_id(request, client_id):
    client = get_object_or_404(Clients, id=client_id)

    serializer = ClientSerializer(client)

    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def post_client(request):
    serializer= ClientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@csrf_exempt
@api_view(['PUT'])
def post_update_client(request, client_id):
    curr_client = get_object_or_404(Clients, id=client_id)

    serializer = ClientSerializer(curr_client, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
'''


class SuppliersListAPIView(APIView):
    def get(self, request):
        suppliers = Supplier.objects.all()  # Tüm müşterileri JSON formatında al
        serializer= SupplierSerializer(suppliers, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer= SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class SupplierDetailAPIView(APIView):
    def get(self, request, supplier_id):
        supplier = get_object_or_404(Supplier,id=supplier_id)
        serializer= SupplierSerializer(supplier)
        return Response(serializer.data)
    def put(self, request, supplier_id):
        supplier = get_object_or_404(Supplier,id=supplier_id)
        serializer= SupplierSerializer(supplier, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, supplier_id):
        supplier = get_object_or_404(Supplier,id=supplier_id)
        supplier.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
'''
@api_view(['GET'])
@login_required
def get_suppliers(request):
    suppliers = Supplier.objects.all()
    serializer = SupplierSerializer(suppliers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@login_required
def get_supplier_id(request, supplier_id):
    supplier = get_object_or_404(Supplier, id=supplier_id)

    serializer = SupplierSerializer(supplier)

    return Response(serializer.data)

csrf_exempt
@api_view(['POST'])
def post_supplier(request):
    serializer= SupplierSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

@csrf_exempt
@api_view(['PUT'])
def post_update_supplier(request, supplier_id):
    curr_supplier = get_object_or_404(Supplier, id=supplier_id)

    serializer = SupplierSerializer(curr_supplier, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

'''