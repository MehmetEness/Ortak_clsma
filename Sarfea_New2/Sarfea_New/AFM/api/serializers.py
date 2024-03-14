from rest_framework import serializers
from AFM.models import Clients, Supplier, Project, Expenses, JobHistory, Incomes # Make sure to import your Clients model

class ClientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    CompanyName_Clients_New = serializers.CharField(required=True)
    ContactPerson = serializers.CharField(required=False)
    PhoneNumber = serializers.CharField(required=False)
    Email = serializers.CharField(required=False)
    Location = serializers.CharField(required=False)

    
    def create(self, validated_data):
        return Clients.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Clients_New = validated_data.get('CompanyName_Clients_New', instance.CompanyName_Clients_New)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance
    
class SupplierSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    CompanyName_Supplier_New = serializers.CharField(required=True)
    ContactPerson = serializers.CharField(required=False)
    PhoneNumber = serializers.CharField(required=False)
    Email = serializers.CharField(required=False)
    Location = serializers.CharField(required=False)

    
    def create(self, validated_data):
        return Supplier.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Supplier_New = validated_data.get('CompanyName_Supplier_New', instance.CompanyName_Supplier_New)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance
    
class ProjectSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ProjectName = serializers.CharField(required=True)
    ProjectCode = serializers.CharField(required=True)
    CompanyName = serializers.CharField(required=True)
    CompanyUndertakingWork = serializers.CharField(required=False)
    Location = serializers.CharField(required=False)
    Cost_NotIncludingKDV = serializers.FloatField( required=False)
    AC_Power = serializers.IntegerField(required=False)
    DC_Power = serializers.IntegerField(required=False)
    CalculatedCost_NotIncludingKDV = serializers.FloatField(required=False)
    RealizedCost_NotIncludingKDV = serializers.FloatField(required=False)
    CalculatedProfit_Loss = serializers.FloatField(required=False)
    RealizedProfit_Loss = serializers.FloatField(required=False)
    CalculatedProfitRate = serializers.FloatField(required=False)
    RealizedProfitRate = serializers.FloatField(required=False)
    Situation = serializers.CharField(required=False)
    StartDate = serializers.DateField(required=False)
    FinishDate = serializers.DateField(required=False)
    KDV_Rate = serializers.CharField(required=False)
    Terrain_Roof = serializers.CharField(required=False)
    Incentive = serializers.BooleanField(required=False)
    
    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ProjectName = validated_data.get('ProjectName', instance.ProjectName)
        instance.ProjectCode = validated_data.get('ProjectCode', instance.ProjectCode)
        instance.CompanyName = validated_data.get('CompanyName', instance.CompanyName)
        instance.CompanyUndertakingWork = validated_data.get('CompanyUndertakingWork', instance.CompanyUndertakingWork)
        instance.Location = validated_data.get('Location', instance.Location)
        instance.Cost_NotIncludingKDV = validated_data.get('Cost_NotIncludingKDV', instance.Cost_NotIncludingKDV)
        instance.RealizedCost_NotIncludingKDV = validated_data.get('RealizedCost_NotIncludingKDV', instance.RealizedCost_NotIncludingKDV)
        instance.CalculatedProfit_Loss = validated_data.get('CalculatedProfit_Loss', instance.CalculatedProfit_Loss)
        instance.RealizedProfitRate = validated_data.get('RealizedProfitRate', instance.RealizedProfitRate)
        instance.Situation = validated_data.get('Situation', instance.Situation)
        instance.StartDate = validated_data.get('StartDate', instance.StartDate)
        instance.FinishDate = validated_data.get('FinishDate', instance.FinishDate)
        instance.KDV_Rate = validated_data.get('KDV_Rate', instance.KDV_Rate)
        instance.Terrain_Roof = validated_data.get('Terrain_Roof', instance.Terrain_Roof)
        instance.Incentive = validated_data.get('Incentive', instance.Incentive)
        instance.save()
        return instance

class ExpensesSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ProjectName_Expenses_Copy = serializers.CharField(required=True)
    ProjectName_Expenses = serializers.CharField(required=True)
    CompanyName_Expenses = serializers.CharField(required=False)
    CompanyName_FromPaymentMade_Expenses = serializers.CharField(required=False)
    CompanyName_Paying_Expenses = serializers.CharField(required=False)
    ExpensDetails_Expenses = serializers.CharField(required=False)
    Amount_Expenses = serializers.DecimalField(required=False, max_digits=13, decimal_places=2)
    Dollar_Rate_Expenses = serializers.DecimalField(required=False, max_digits=8, decimal_places=4)
    Amount_USD_Expenses = serializers.DecimalField(read_only=True, max_digits=13, decimal_places=2)
    Bank_Expenses = serializers.CharField(required=False)
    Date_Expenses = serializers.DateField(required=False)

    
    def create(self, validated_data):
        return Expenses.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ProjectName_Expenses_Copy = validated_data.get('ProjectName_Expenses_Copy', instance.ProjectName_Expenses_Copy)
        instance.CompanyName_Expenses = validated_data.get('CompanyName_Expenses', instance.CompanyName_Expenses)
        instance.CompanyName_FromPaymentMade_Expenses = validated_data.get('CompanyName_FromPaymentMade_Expenses', instance.CompanyName_FromPaymentMade_Expenses)
        instance.CompanyName_Paying_Expenses = validated_data.get('CompanyName_Paying_Expenses', instance.CompanyName_Paying_Expenses)
        instance.ExpensDetails_Expenses = validated_data.get('ExpensDetails_Expenses', instance.ExpensDetails_Expenses)
        instance.Amount_Expenses = validated_data.get('Amount_Expenses', instance.Amount_Expenses)
        instance.Bank_Expenses = validated_data.get('Bank_Expenses', instance.Bank_Expenses)
        instance.Date_Expenses = validated_data.get('Date_Expenses', instance.Date_Expenses)

        instance.save()
        return instance

class JobHistorySerializer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    ProjectName_JobHistory_Copy = serializers.CharField(required=True)
    CompanyName_JobHistory = serializers.CharField(required=False)
    CompanyName_FromJobMade_JobHistory = serializers.CharField(required=False)
    CompanyName_Job_JobHistory = serializers.CharField(required=False)
    ExpensDetails_JobHistory = serializers.CharField(required=False)
    Invoice_No_JobHistory = serializers.CharField(required=False)
    Amount_JobHistory = serializers.DecimalField(required=False, max_digits=13, decimal_places=2)
    Dollar_Rate_JobHistory = serializers.DecimalField(required=False, max_digits=8, decimal_places=4)
    Amount_USD_JobHistory = serializers.DecimalField(read_only=True, max_digits=13, decimal_places=2)
    Date_JobHistory = serializers.CharField(required=False)

    
    def create(self, validated_data):
        return JobHistory.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ProjectName_JobHistory_Copy = validated_data.get('ProjectName_JobHistory_Copy', instance.ProjectName_JobHistory_Copy)
        instance.CompanyName_JobHistory = validated_data.get('CompanyName_JobHistory', instance.CompanyName_JobHistory)
        instance.CompanyName_FromJobMade_JobHistory = validated_data.get('CompanyName_FromJobMade_JobHistory', instance.CompanyName_FromJobMade_JobHistory)
        instance.CompanyName_Job_JobHistory = validated_data.get('CompanyName_Job_JobHistory', instance.CompanyName_Job_JobHistory)
        instance.ExpensDetails_JobHistory = validated_data.get('ExpensDetails_JobHistory', instance.ExpensDetails_JobHistory)
        instance.Invoice_No_JobHistory = validated_data.get('Invoice_No_JobHistory', instance.Invoice_No_JobHistory)
        instance.Amount_JobHistory = validated_data.get('Amount_JobHistory', instance.Amount_JobHistory)
        instance.Dollar_Rate_JobHistory = validated_data.get('Dollar_Rate_JobHistory', instance.Dollar_Rate_JobHistory)
        instance.Date_JobHistory = validated_data.get('Date_JobHistory', instance.Date_JobHistory)

        instance.save()
        return instance
    
class IncomesSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ProjectName_Incomes_Copy = serializers.CharField(required=True)
    CompanyName_ReceivePayment_Incomes = serializers.CharField(required=False)
    CompanyName_Pay_Incomes = serializers.CharField(required=False)
    Amount_Incomes = serializers.CharField(required=False)
    Dollar_Rate_Incomes = serializers.CharField(required=False)
    PaymentType_Incomes = serializers.CharField(required=False)
    ChekDate_Incomes = serializers.CharField(required=False)
    LastChekDate_Incomes = serializers.CharField(required=False)
    
    def create(self, validated_data):
        return Incomes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ProjectName_Incomes_Copy = validated_data.get('ProjectName_Incomes_Copy', instance.ProjectName_Incomes_Copy)
        instance.CompanyName_ReceivePayment_Incomes = validated_data.get('CompanyName_ReceivePayment_Incomes', instance.CompanyName_ReceivePayment_Incomes)
        instance.CompanyName_Pay_Incomes = validated_data.get('CompanyName_Pay_Incomes', instance.CompanyName_Pay_Incomes)
        instance.Amount_Incomes = validated_data.get('Amount_Incomes', instance.Amount_Incomes)
        instance.Dollar_Rate_Incomes = validated_data.get('Dollar_Rate_Incomes', instance.Dollar_Rate_Incomes)
        instance.PaymentType_Incomes = validated_data.get('PaymentType_Incomes', instance.PaymentType_Incomes)
        instance.ChekDate_Incomes = validated_data.get('ChekDate_Incomes', instance.ChekDate_Incomes)
        instance.LastChekDate_Incomes = validated_data.get('LastChekDate_Incomes', instance.LastChekDate_Incomes)
        instance.save()
        return instance