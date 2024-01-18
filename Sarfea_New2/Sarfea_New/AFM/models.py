from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

class FourDecimalField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 17 # Toplam basamak sayısı (ondalık dahil)
        kwargs['decimal_places'] = 4  # Ondalık basamak sayısı
        super().__init__(*args, **kwargs)

class TwoDecimalField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 12 # Toplam basamak sayısı (ondalık dahil)
        kwargs['decimal_places'] = 2  # Ondalık basamak sayısı
        super().__init__(*args, **kwargs)

def unique_supplier_validator(value):
   ''' existing_suppliers = Supplier.objects.filter(CompanyName_Supplier=value)
    if existing_suppliers.exists():
        raise ValidationError(f"A Supplier with the name '{value}' already exists.")
    
    existing_client = Clients.objects.filter(CompanyName_Clients=value)
    if existing_client.exists():
        raise ValidationError(f"A Client with the name '{value}' already exists.")
    
    existing_project = Project.objects.filter(ProjectName=value)
    if existing_project.exists():
        raise ValidationError(f"A Project with the name '{value}' already exists.")'''

class CompanyNames(models.Model):
    CompanyName = models.CharField(max_length=63) 
    def __str__(self):
        return self.CompanyName

class MyCompanyNames(models.Model):
    MyCompanyName = models.CharField(max_length=63) 
    def __str__(self):
        return self.MyCompanyName

class Locations(models.Model):
    Location = models.CharField(max_length=63) 
    def __str__(self):
        return self.Location

class Terrain_Roof(models.Model):
    Terrain_Roof = models.CharField(max_length=63)
    def __str__(self):
        return self.Terrain_Roof

class Banks(models.Model):
    BankName = models.CharField(max_length=63)
    def __str__(self):
        return self.BankName

class Situations(models.Model):
    Situation = models.CharField(max_length=63)
    def __str__(self):
        return self.Situation

class PaymentFirms(models.Model):
    PaymentFirmsName = models.CharField(max_length=63)
    def __str__(self):
        return self.PaymentFirmsName

class Details(models.Model):
    Detail = models.CharField(max_length=63)
    def __str__(self):
        return self.Detail

class Project(models.Model):
    ProjectName = models.CharField(max_length=63, blank=True, null=True, unique=True)
    ProjectCode = models.CharField(max_length=63, blank=True, null=True)
    CompanyName = models.CharField(max_length=63, blank=True, null=True)
    CompanyUndertakingWork = models.CharField(max_length=63, blank=True, null=True)
    Location = models.CharField(max_length=200, blank=True, null=True)
    Cost_NotIncludingKDV = models.FloatField( blank=True, null=True, default=0)
    AC_Power = models.IntegerField(blank=True, null=True,default=0)
    DC_Power = models.IntegerField(blank=True, null=True,default=0)
    CalculatedCost_NotIncludingKDV = models.FloatField(blank=True, null=True)
    RealizedCost_NotIncludingKDV = models.FloatField(blank=True, null=True)
    CalculatedProfit_Loss = models.FloatField(blank=True, null=True)
    RealizedProfit_Loss = models.FloatField(blank=True, null=True)
    CalculatedProfitRate = models.FloatField(blank=True, null=True)
    RealizedProfitRate = models.FloatField(blank=True, null=True)
    Situation = models.CharField(max_length=63, default="Onay Bekliyor")
    StartDate = models.DateField(blank=True, null=True)
    FinishDate = models.DateField(blank=True, null=True)
    KDV_Rate = models.CharField(default="20", blank=True, null=True, max_length=12)
    Terrain_Roof = models.CharField(max_length=63, blank=True, null=True)
    Incentive = models.BooleanField(default=False)
    
class Expenses(models.Model):
    ProjectName_Expenses_Copy = models.CharField(max_length=63, blank=True, null=True)
    ProjectName_Expenses = models.CharField(max_length=63, blank=True, null=True)
    ProjectCode_Expenses = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Expenses = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_FromPaymentMade_Expenses = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Paying_Expenses = models.CharField(max_length=63, default="Genel Gider",blank=True, null=True)
    ExpensDetails_Expenses = models.CharField(max_length=1000, blank=True, null=True)
    Amount_Expenses = FourDecimalField(blank=True, null=True)
    Amount_TL_Expenses = FourDecimalField(blank=True, null=True)
    Dollar_Rate_Expenses = FourDecimalField(blank=True, null=True)
    Bank_Expenses = models.CharField(max_length=63, blank=True, null=True)
    Date_Expenses = models.DateField(blank=True, null=True)

class JobHistory(models.Model):
    ProjectName_JobHistory_Copy = models.CharField(max_length=63, blank=True, null=True)
    ProjectName_JobHistory = models.CharField(max_length=63,blank=True, null=True)
    CompanyName_JobHistory = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_FromJobMade_JobHistory = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Job_JobHistory = models.CharField(max_length=63, blank=True, null=True)
    ExpensDetails_JobHistory = models.CharField(max_length=1000, blank=True, null=True)
    Invoice_No_JobHistory = models.CharField(max_length=63, blank=True, null=True) 
    Amount_JobHistory = FourDecimalField(blank=True, null=True)
    Amount_TL_JobHistory = FourDecimalField(blank=True, null=True)
    Dollar_Rate_JobHistory = FourDecimalField(blank=True, null=True)
    Date_JobHistory = models.DateField(blank=True, null=True)

class Incomes(models.Model):
    ProjectName_Incomes_Copy = models.CharField(max_length=63, blank=True, null=True)
    ProjectName_Incomes = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_ReceivePayment_Incomes = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Pay_Incomes = models.CharField(max_length=63, blank=True, null=True)
    Amount_Incomes = FourDecimalField(blank=True, null=True)
    Dollar_Rate_Incomes = FourDecimalField(blank=True, null=True)
    PaymentType_Incomes = models.CharField(max_length=63, blank=True, null=True)     
    ChekDate_Incomes = models.DateField(blank=True, null=True)
    LastChekDate_Incomes = models.DateField(blank=True, null=True)
    Amount_Usd_Incomes = FourDecimalField(blank=True, null=True)

class ProjectNames(models.Model):
    ProjectName = models.CharField(max_length=63) 
    ProjectCode = models.CharField(max_length=63,blank=True, null=True)
    def __str__(self):
        return self.ProjectName
    
class Clients(models.Model):
    CompanyName_Clients_New = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Clients = models.CharField(max_length=63, blank=True, null=True, unique=True)
    ContactPerson = models.CharField(max_length=63, blank=True, null=True)
    PhoneNumber = models.CharField(max_length=15, blank=True, null=True)
    Email= models.CharField(max_length=63, blank=True, null=True)
    Location = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.CompanyName_Clients

class Supplier(models.Model):
    CompanyName_Supplier_New = models.CharField(max_length=63, blank=True, null=True)
    CompanyName_Supplier = models.CharField(max_length=63, blank=True, null=True, unique=True)
    ContactPerson = models.CharField(max_length=63, blank=True, null=True)
    PhoneNumber = models.CharField(max_length=15, blank=True, null=True)
    Email= models.CharField(max_length=63, blank=True, null=True)
    Location = models.CharField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return self.CompanyName_Supplier

class SalesOfferCard(models.Model):
    Client_Card_Copy = models.CharField(max_length=63, blank=True, null=True)
    Client_Card=  models.ForeignKey(Clients, on_delete=models.CASCADE, blank=True, null=True)
    Offer_Subject_Card= models.CharField(max_length=63, blank=True, null=True)
    Location_Card = models.CharField(max_length=200, blank=True, null=True)
    Cost_NotIncludingKDV_Card = TwoDecimalField(blank=True, null=True, default="0")
    Offer_Cost_NotIncludingKDV_Card = TwoDecimalField(blank=True, null=True, default="0")
    AC_Power_Card = models.IntegerField(blank=True, null=True,default="0")
    DC_Power_Card = models.IntegerField(blank=True, null=True,default="0")
    UnitCost_NotIncludingKDV = TwoDecimalField(blank=True, null=True, default="0")
    UnitOffer_NotIncludingKDV = TwoDecimalField(blank=True, null=True, default="0")
    Situation_Card = models.CharField(
        max_length=63,blank=True, null=True,
        choices=(
            ('Potansiyel Müşteri', 'Potansiyel Müşteri'),
            ('Maliyet Hesaplama', 'Maliyet Hesaplama'),
            ('Fiyat Belirleme', 'Fiyat Belirleme'),
            ('Teklif Hazırlama', 'Teklif Hazırlama'),
            ('Sunum Sonrası Görüşme', 'Sunum Sonrası Görüşme'),
            ('Teklif Sunuldu', 'Teklif Sunuldu'),
        ),
        default='Potansiyel Müşteri',
    )    
    Date_Card = models.DateField(blank=True, null=True)
    Terrain_Roof_Card = models.CharField(
        max_length=63,blank=True, null=True,
        choices=(
            ('Çatı', 'Çatı'),
            ('Arazi', 'Arazi'),
        ),
    )    
    Roof_Cost_Card = models.IntegerField(blank=True, null=True)
    Comment_Date_Card = models.DateField(blank=True, null=True)
    Offer_Comment_Card= models.CharField(max_length=63, blank=True, null=True)
    Offer_File_Card = models.FileField(upload_to='offer_files', default="", blank=True, null=True)
    Offer_File_Card_2 = models.FileField(upload_to='offer_files', default="", blank=True, null=True)
    Offer_File_Card_3 = models.FileField(upload_to='offer_files', default="", blank=True, null=True)
    Offer_File_Card_4 = models.FileField(upload_to='offer_files', default="", blank=True, null=True)
    Offer_File_Card_5 = models.FileField(upload_to='offer_files', default="", blank=True, null=True)
    M_File_Card = models.FileField(upload_to='m_files', default="", blank=True, null=True)
    M_File_Card_2 = models.FileField(upload_to='m_files', default="", blank=True, null=True)
    M_File_Card_3 = models.FileField(upload_to='m_files', default="", blank=True, null=True)
    Is_Lost = models.BooleanField(default=False, blank=True, null=True)
    Is_Gain = models.BooleanField(default=False, blank=True, null=True)
    

    





 