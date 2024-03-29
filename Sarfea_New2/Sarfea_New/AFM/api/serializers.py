from rest_framework import serializers
from AFM.models import Clients, Supplier, Project, Expenses, JobHistory, Incomes, Fail_Bill, Fail, SalesOfferCard,SalesOfferCard_Revise, Operation_Care, Inventor, String

class ClientSerializer(serializers.ModelSerializer):


    class Meta:
        model = Clients
        fields = '__all__'

    def create(self, validated_data):
        return Clients.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Clients = validated_data.get('CompanyName_Clients', instance.CompanyName_Clients)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

    def create(self, validated_data):
        return Supplier.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Supplier = validated_data.get('CompanyName_Supplier', instance.CompanyName_Supplier)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance
    
class ExpensesSerializer(serializers.ModelSerializer):
    supplier_expenses = SupplierSerializer(source='CompanyName_Paying_Expenses', read_only=True)

    class Meta:
        model = Expenses
        fields = '__all__'

    def create(self, validated_data):
        return Expenses.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Project_Expenses = validated_data.get('Project_Expenses', instance.Project_Expenses)
        instance.CompanyName_FromPaymentMade_Expenses = validated_data.get('CompanyName_FromPaymentMade_Expenses', instance.CompanyName_FromPaymentMade_Expenses)
        instance.CompanyName_Paying_Expenses = validated_data.get('CompanyName_Paying_Expenses', instance.CompanyName_Paying_Expenses)
        instance.ExpensDetails_Expenses = validated_data.get('ExpensDetails_Expenses', instance.ExpensDetails_Expenses)
        instance.Amount_Expenses = validated_data.get('Amount_Expenses', instance.Amount_Expenses)
        instance.Dollar_Rate_Expenses = validated_data.get('Dollar_Rate_Expenses', instance.Dollar_Rate_Expenses)
        instance.Bank_Expenses = validated_data.get('Bank_Expenses', instance.Bank_Expenses)
        instance.Date_Expenses = validated_data.get('Date_Expenses', instance.Date_Expenses)
        instance.save()
        return instance

class JobHistorySerializer(serializers.ModelSerializer):
    supplier_jobhistories = SupplierSerializer(source='CompanyName_Job_JobHistory', read_only=True)

    class Meta:
        model = JobHistory
        fields = '__all__'

    def create(self, validated_data):
        return JobHistory.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Project_JobHistory = validated_data.get('Project_JobHistory', instance.Project_JobHistory)
        instance.CompanyName_FromJobMade_JobHistory = validated_data.get('CompanyName_FromJobMade_JobHistory', instance.CompanyName_FromJobMade_JobHistory)
        instance.CompanyName_Job_JobHistory = validated_data.get('CompanyName_Job_JobHistory', instance.CompanyName_Job_JobHistory)
        instance.ExpensDetails_JobHistory = validated_data.get('ExpensDetails_JobHistory', instance.ExpensDetails_JobHistory)
        instance.Invoice_No_JobHistory = validated_data.get('Invoice_No_JobHistory', instance.Invoice_No_JobHistory)
        instance.Amount_JobHistory = validated_data.get('Amount_JobHistory', instance.Amount_JobHistory)
        instance.Dollar_Rate_JobHistory = validated_data.get('Dollar_Rate_JobHistory', instance.Dollar_Rate_JobHistory)
        instance.Date_JobHistory = validated_data.get('Date_JobHistory', instance.Date_JobHistory)

        instance.save()
        return instance
    
class IncomesSerializer(serializers.ModelSerializer):
    client_incomes = ClientSerializer(source='CompanyName_Pay_Incomes', read_only=True)

    class Meta:
        model = Incomes
        fields = '__all__'
    
    def create(self, validated_data):
        return Incomes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Project_Incomes = validated_data.get('Project_Incomes', instance.Project_Incomes)
        instance.CompanyName_ReceivePayment_Incomes = validated_data.get('CompanyName_ReceivePayment_Incomes', instance.CompanyName_ReceivePayment_Incomes)
        instance.CompanyName_Pay_Incomes = validated_data.get('CompanyName_Pay_Incomes', instance.CompanyName_Pay_Incomes)
        instance.Amount_Incomes = validated_data.get('Amount_Incomes', instance.Amount_Incomes)
        instance.Dollar_Rate_Incomes = validated_data.get('Dollar_Rate_Incomes', instance.Dollar_Rate_Incomes)
        instance.PaymentType_Incomes = validated_data.get('PaymentType_Incomes', instance.PaymentType_Incomes)
        instance.ChekDate_Incomes = validated_data.get('ChekDate_Incomes', instance.ChekDate_Incomes)
        instance.LastChekDate_Incomes = validated_data.get('LastChekDate_Incomes', instance.LastChekDate_Incomes)
        instance.save()
        return instance

class SalesOfferCardReviseSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = SalesOfferCard_Revise
        fields = '__all__'
    
    def create(self, validated_data):
        return SalesOfferCard_Revise.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Revise_Owner = validated_data.get('Revise_Owner', instance.Revise_Owner)
        instance.Client_Card = validated_data.get('Client_Card', instance.Client_Card)
        instance.Offer_Subject_Card = validated_data.get('Offer_Subject_Card', instance.Offer_Subject_Card)
        instance.Location_Card = validated_data.get('Location_Card', instance.Location_Card)
        instance.Cost_NotIncludingKDV_Card = validated_data.get('Cost_NotIncludingKDV_Card', instance.Cost_NotIncludingKDV_Card)
        instance.Offer_Cost_NotIncludingKDV_Card = validated_data.get('Offer_Cost_NotIncludingKDV_Card', instance.Offer_Cost_NotIncludingKDV_Card)
        instance.AC_Power_Card = validated_data.get('AC_Power_Card', instance.AC_Power_Card)
        instance.DC_Power_Card = validated_data.get('DC_Power_Card', instance.DC_Power_Card)
        instance.UnitCost_NotIncludingKDV = validated_data.get('UnitCost_NotIncludingKDV', instance.UnitCost_NotIncludingKDV)
        instance.UnitOffer_NotIncludingKDV = validated_data.get('UnitOffer_NotIncludingKDV', instance.UnitOffer_NotIncludingKDV)
        instance.Situation_Card = validated_data.get('Situation_Card', instance.Situation_Card)
        instance.Date_Card = validated_data.get('Date_Card', instance.Date_Card)
        instance.Terrain_Roof_Card = validated_data.get('Terrain_Roof_Card', instance.Terrain_Roof_Card)
        instance.Roof_Cost_Card = validated_data.get('Roof_Cost_Card', instance.Roof_Cost_Card)
        instance.Comment_Date_Card = validated_data.get('Comment_Date_Card', instance.Comment_Date_Card)
        instance.Person_Deal = validated_data.get('Person_Deal', instance.Person_Deal)
        instance.Person_Related = validated_data.get('Person_Related', instance.Person_Related)
        instance.Offer_Comment_Card = validated_data.get('Offer_Comment_Card', instance.Offer_Comment_Card)
        instance.Offer_File_Card = validated_data.get('Offer_File_Card', instance.Offer_File_Card)
        instance.Offer_File_Card_2 = validated_data.get('Offer_File_Card_2', instance.Offer_File_Card_2)
        instance.Offer_File_Card_3 = validated_data.get('Offer_File_Card_3', instance.Offer_File_Card_3)
        instance.Offer_File_Card_4 = validated_data.get('Offer_File_Card_4', instance.Offer_File_Card_4)
        instance.Offer_File_Card_5 = validated_data.get('Offer_File_Card_5', instance.Offer_File_Card_5)
        instance.M_File_Card = validated_data.get('M_File_Card', instance.M_File_Card)
        instance.M_File_Card_2 = validated_data.get('M_File_Card_2', instance.M_File_Card_2)
        instance.M_File_Card_3 = validated_data.get('M_File_Card_3', instance.M_File_Card_3)
        instance.Is_Lost = validated_data.get('Is_Lost', instance.Is_Lost)
        instance.Is_Gain = validated_data.get('Is_Gain', instance.Is_Gain)
        instance.Is_late = validated_data.get('Is_late', instance.Is_late)
        instance.Unit_Cost_with_Roof_Cost = validated_data.get('Unit_Cost_with_Roof_Cost', instance.Unit_Cost_with_Roof_Cost)
        instance.Unit_Offer_with_Roof_Cost = validated_data.get('Unit_Offer_with_Roof_Cost', instance.Unit_Offer_with_Roof_Cost)
        instance.Profit_Rate_Card = validated_data.get('Profit_Rate_Card', instance.Profit_Rate_Card)
        instance.Revize_created_at = validated_data.get('Revize_created_at', instance.Revize_created_at)
        instance.save()
        return instance

class SalesOfferCardSerializer(serializers.ModelSerializer):
    salesoffer_revises= SalesOfferCardReviseSerializer(many=True, read_only=True)

    class Meta:
        model = SalesOfferCard
        fields = '__all__'
    
    def create(self, validated_data):
        return SalesOfferCard.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Client_Card = validated_data.get('Client_Card', instance.Client_Card)
        instance.Offer_Subject_Card = validated_data.get('Offer_Subject_Card', instance.Offer_Subject_Card)
        instance.Location_Card = validated_data.get('Location_Card', instance.Location_Card)
        instance.Cost_NotIncludingKDV_Card = validated_data.get('Cost_NotIncludingKDV_Card', instance.Cost_NotIncludingKDV_Card)
        instance.Offer_Cost_NotIncludingKDV_Card = validated_data.get('Offer_Cost_NotIncludingKDV_Card', instance.Offer_Cost_NotIncludingKDV_Card)
        instance.AC_Power_Card = validated_data.get('AC_Power_Card', instance.AC_Power_Card)
        instance.DC_Power_Card = validated_data.get('DC_Power_Card', instance.DC_Power_Card)
        instance.UnitCost_NotIncludingKDV = validated_data.get('UnitCost_NotIncludingKDV', instance.UnitCost_NotIncludingKDV)
        instance.UnitOffer_NotIncludingKDV = validated_data.get('UnitOffer_NotIncludingKDV', instance.UnitOffer_NotIncludingKDV)
        instance.Situation_Card = validated_data.get('Situation_Card', instance.Situation_Card)
        instance.Date_Card = validated_data.get('Date_Card', instance.Date_Card)
        instance.Terrain_Roof_Card = validated_data.get('Terrain_Roof_Card', instance.Terrain_Roof_Card)
        instance.Roof_Cost_Card = validated_data.get('Roof_Cost_Card', instance.Roof_Cost_Card)
        instance.Comment_Date_Card = validated_data.get('Comment_Date_Card', instance.Comment_Date_Card)
        instance.Person_Deal = validated_data.get('Person_Deal', instance.Person_Deal)
        instance.Person_Related = validated_data.get('Person_Related', instance.Person_Related)
        instance.Offer_Comment_Card = validated_data.get('Offer_Comment_Card', instance.Offer_Comment_Card)
        instance.Offer_File_Card = validated_data.get('Offer_File_Card', instance.Offer_File_Card)
        instance.Offer_File_Card_2 = validated_data.get('Offer_File_Card_2', instance.Offer_File_Card_2)
        instance.Offer_File_Card_3 = validated_data.get('Offer_File_Card_3', instance.Offer_File_Card_3)
        instance.Offer_File_Card_4 = validated_data.get('Offer_File_Card_4', instance.Offer_File_Card_4)
        instance.Offer_File_Card_5 = validated_data.get('Offer_File_Card_5', instance.Offer_File_Card_5)
        instance.M_File_Card = validated_data.get('M_File_Card', instance.M_File_Card)
        instance.M_File_Card_2 = validated_data.get('M_File_Card_2', instance.M_File_Card_2)
        instance.M_File_Card_3 = validated_data.get('M_File_Card_3', instance.M_File_Card_3)
        instance.Is_Lost = validated_data.get('Is_Lost', instance.Is_Lost)
        instance.Is_Gain = validated_data.get('Is_Gain', instance.Is_Gain)
        instance.Is_late = validated_data.get('Is_late', instance.Is_late)
        instance.Unit_Cost_with_Roof_Cost = validated_data.get('Unit_Cost_with_Roof_Cost', instance.Unit_Cost_with_Roof_Cost)
        instance.Unit_Offer_with_Roof_Cost = validated_data.get('Unit_Offer_with_Roof_Cost', instance.Unit_Offer_with_Roof_Cost)
        instance.Profit_Rate_Card = validated_data.get('Profit_Rate_Card', instance.Profit_Rate_Card)
        instance.save()
        return instance

class ProjectSerializer(serializers.ModelSerializer):
    project_expenses= ExpensesSerializer(many=True, read_only=True)
    project_jobhistories= JobHistorySerializer(many=True, read_only=True)
    project_incomes= IncomesSerializer(many=True, read_only=True)
    client = ClientSerializer(source='Company_id', read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        #exclude = ['Company_id']
    def create(self, validated_data):
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.ProjectName = validated_data.get('ProjectName', instance.ProjectName)
        instance.ProjectCode = validated_data.get('ProjectCode', instance.ProjectCode)
        instance.Company_id = validated_data.get('Company_id', instance.Company_id)
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

class OperationCareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation_Care
        fields = '__all__'
        #exclude = ['Company_id']
    def create(self, validated_data):
        return Operation_Care.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Operation_Care_Company = validated_data.get('Operation_Care_Company', instance.Operation_Care_Company)
        instance.Operation_Care_Location = validated_data.get('Operation_Care_Location', instance.Operation_Care_Location)
        instance.Operation_Care_Inventor_Brand = validated_data.get('Operation_Care_Inventor_Brand', instance.Operation_Care_Inventor_Brand)
        instance.Operation_Care_Panel_Brand = validated_data.get('Operation_Care_Panel_Brand', instance.Operation_Care_Panel_Brand)
        instance.Operation_Care_Address = validated_data.get('Operation_Care_Address', instance.Operation_Care_Address)
        instance.Operation_Care_Terrain_Roof = validated_data.get('Operation_Care_Terrain_Roof', instance.Operation_Care_Terrain_Roof)
        instance.Operation_Care_Direction = validated_data.get('Operation_Care_Direction', instance.Operation_Care_Direction)
        instance.Operation_Care_Inventor_Power = validated_data.get('Operation_Care_Inventor_Power', instance.Operation_Care_Inventor_Power)
        instance.Operation_Care_Panel_Power = validated_data.get('Operation_Care_Panel_Power', instance.Operation_Care_Panel_Power)
        instance.Operation_Care_Inventor_Number = validated_data.get('Operation_Care_Inventor_Number', instance.Operation_Care_Inventor_Number)
        instance.Operation_Care_VOC = validated_data.get('Operation_Care_VOC', instance.Operation_Care_VOC)
        instance.Operation_Care_AC_Power = validated_data.get('Operation_Care_AC_Power', instance.Operation_Care_AC_Power)
        instance.Operation_Care_DC_Power = validated_data.get('Operation_Care_DC_Power', instance.Operation_Care_DC_Power)
        instance.Operation_Care_Panel_Number_Str = validated_data.get('Operation_Care_Panel_Number_Str', instance.Operation_Care_Panel_Number_Str)
        instance.Operation_Care_Number_Str = validated_data.get('Operation_Care_Number_Str', instance.Operation_Care_Number_Str)
        instance.Operation_Care_Capacity = validated_data.get('Operation_Care_Capacity', instance.Operation_Care_Capacity)
        instance.Operation_Care_Start_Date = validated_data.get('Operation_Care_Start_Date', instance.Operation_Care_Start_Date)
        instance.Operation_Care_Finish_Date = validated_data.get('Operation_Care_Finish_Date', instance.Operation_Care_Finish_Date)
        instance.Operation_Care_Has_Fail = validated_data.get('Operation_Care_Has_Fail', instance.Operation_Care_Has_Fail)
        instance.Operation_Care_Fail_Number = validated_data.get('Operation_Care_Fail_Number', instance.Operation_Care_Fail_Number)
        
        instance.save()
        return instance

class InventorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventor
        fields = '__all__'

    def create(self, validated_data):
        return Inventor.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.Inventor_Owner = validated_data.get('Inventor_Owner', instance.Inventor_Owner)
        instance.Inventor_Direction = validated_data.get('Inventor_Direction', instance.Inventor_Direction)
        instance.Inventor_Number = validated_data.get('Inventor_Number', instance.Inventor_Number)
        instance.Inventor_Number_Str = validated_data.get('Inventor_Number_Str', instance.Inventor_Number_Str)
        instance.Inventor_Panel_Power = validated_data.get('Inventor_Panel_Power', instance.Inventor_Panel_Power)
        instance.Inventor_Panel_Brand = validated_data.get('Inventor_Panel_Brand', instance.Inventor_Panel_Brand)
        instance.Inventor_Izolasion = validated_data.get('Inventor_Izolasion', instance.Inventor_Izolasion)
        instance.Inventor_VOC = validated_data.get('Inventor_VOC', instance.Inventor_VOC)
        instance.Inventor_Panel_SY = validated_data.get('Inventor_Panel_SY', instance.Inventor_Panel_SY)
        instance.Inventor_AC_Power = validated_data.get('Inventor_AC_Power', instance.Inventor_AC_Power)
        instance.Inventor_DC_Power = validated_data.get('Inventor_DC_Power', instance.Inventor_DC_Power)
        instance.Inventor_Capacity = validated_data.get('Inventor_Capacity', instance.Inventor_Capacity)
        
        instance.save()
        return instance
    
class StringSerializer(serializers.ModelSerializer):

    class Meta:
        model = String
        fields = '__all__'

    def create(self, validated_data):
        return String.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.String_Owner = validated_data.get('String_Owner', instance.String_Owner)
        instance.String_Number = validated_data.get('String_Number', instance.String_Number)
        instance.String_Panel_Power = validated_data.get('String_Panel_Power', instance.String_Panel_Power)
        instance.String_Panel_Brand = validated_data.get('String_Panel_Brand', instance.String_Panel_Brand)
        instance.String_VOC = validated_data.get('String_VOC', instance.String_VOC)
        instance.String_Panel_SY = validated_data.get('String_Panel_SY', instance.String_Panel_SY)
        instance.String_Izolasion = validated_data.get('String_Izolasion', instance.String_Izolasion)
        instance.String_AC_Power = validated_data.get('String_AC_Power', instance.String_AC_Power)
        instance.String_DC_Power = validated_data.get('String_DC_Power', instance.String_DC_Power)
        instance.String_Capacity = validated_data.get('String_Capacity', instance.String_Capacity)
        instance.String_Percent = validated_data.get('String_Percent', instance.String_Percent)
        
        instance.save()
        return instance

class FailBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fail_Bill
        fields = '__all__'

class FailSerializer(serializers.ModelSerializer):
    fail_bills = FailBillSerializer(many=True, read_only=True)

    class Meta:
        model = Fail
        fields = '__all__'

    def create(self, validated_data):
        fail_bills_data = validated_data.pop('fail_bills', [])
        fail = Fail.objects.create(**validated_data)
        for fail_bill_data in fail_bills_data:
            Fail_Bill.objects.create(Fail_Bill_Owner=fail, **fail_bill_data)
        return fail