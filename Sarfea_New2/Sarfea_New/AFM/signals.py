from django.db.models.signals import pre_save 
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Project, CompanyNames, PaymentFirms, ProjectNames, Expenses, JobHistory, Incomes, Supplier, Clients, SalesOfferCard, Operation_Care, Fail, Inventor, String
from django.db import models
from django.utils.text import slugify
from decimal import Decimal

@receiver(pre_save, sender=Project)
def update_related_models(sender, instance, **kwargs):
    company_name = instance.CompanyName
    project_name = instance.ProjectName
    project_code = instance.ProjectCode
    # MyCompanyNames kontrolü
    my_company_names = CompanyNames.objects.filter(CompanyName=company_name)
    if not my_company_names.exists():
        CompanyNames.objects.create(CompanyName=company_name)

    # PaymentFirms kontrolü
    payment_firms = PaymentFirms.objects.filter(PaymentFirmsName=company_name)
    if not payment_firms.exists():
        PaymentFirms.objects.create(PaymentFirmsName=company_name)
    
    project_names = ProjectNames.objects.filter(ProjectName=project_name)
    if not project_names.exists():
        ProjectNames.objects.create(ProjectName=project_name,ProjectCode=project_code )

@receiver(pre_save, sender=Expenses)
def update_payment_firms(sender, instance, **kwargs):
    company_name_paying = instance.CompanyName_Paying_Expenses


    if company_name_paying:
        # PaymentFirms kontrolü
        payment_firms = PaymentFirms.objects.filter(PaymentFirmsName=company_name_paying)
        if not payment_firms.exists():
            PaymentFirms.objects.create(PaymentFirmsName=company_name_paying)

@receiver(pre_save, sender=Expenses)
def update_expenses_company_name(sender, instance, **kwargs):
    project_name_copy = instance.ProjectName_Expenses_Copy

    if project_name_copy:
        try:
            project = Project.objects.get(ProjectName=project_name_copy)
            # Expenses modelinin CompanyName alanını Project'in CompanyName ile güncelle
            instance.ProjectName_Expenses = project.ProjectName
        except Project.DoesNotExist:
            # Eğer ilgili Project bulunamazsa, hata mesajı yazdırabilirsiniz.
            print(f"Project with ProjectName {instance.ProjectName_Expenses} not found.")
        

    # Eğer Expenses modelinde ProjectName doluysa
    if instance.ProjectName_Expenses:
        # İlgili Project'i bul
        try:
            project = Project.objects.get(ProjectName=instance.ProjectName_Expenses)
            # Expenses modelinin CompanyName alanını Project'in CompanyName ile güncelle
            instance.CompanyName_Expenses = project.CompanyName
        except Project.DoesNotExist:
            # Eğer ilgili Project bulunamazsa, hata mesajı yazdırabilirsiniz.
            print(f"Project with ProjectName {instance.ProjectName_Expenses} not found.")
    
    if instance.Amount_Expenses is not None and instance.Dollar_Rate_Expenses is not None:
        # Calculate the new value for Amount_TL_Expenses
        amount_tl_expenses = instance.Amount_Expenses / instance.Dollar_Rate_Expenses
        # Update the instance with the new value
        instance.Amount_TL_Expenses = amount_tl_expenses

@receiver(pre_save, sender=JobHistory)
def update_jobhistory_company_name(sender, instance, **kwargs):

    project_name_copy = instance.ProjectName_JobHistory_Copy

    if project_name_copy:
        try:
            project = Project.objects.get(ProjectName=project_name_copy)
            # Expenses modelinin CompanyName alanını Project'in CompanyName ile güncelle
            instance.ProjectName_JobHistory = project.ProjectName
        except Project.DoesNotExist:
            # Eğer ilgili Project bulunamazsa, hata mesajı yazdırabilirsiniz.
            print(f"Project with ProjectName {instance.ProjectName_JobHistory} not found.")
    # Eğer Expenses modelinde ProjectName ve CompanyName doluysa
    if instance.ProjectName_JobHistory:
        # İlgili Project'i bul
        try:
            project = Project.objects.get(ProjectName=instance.ProjectName_JobHistory)
            # Expenses modelinin CompanyName alanını Project'in CompanyName ile güncelle
            instance.CompanyName_JobHistory = project.CompanyName
        except Project.DoesNotExist:
            # Eğer ilgili Project bulunamazsa, hata mesajı yazdırabilirsiniz.
            print(f"Project with ProjectName {instance.ProjectName_JobHistory} not found.")
    
    if instance.Amount_JobHistory is not None and instance.Dollar_Rate_JobHistory is not None:
        # Calculate the new value for Amount_TL_Expenses
        amount_tl_JobHistory = instance.Amount_JobHistory / instance.Dollar_Rate_JobHistory
        # Update the instance with the new value
        instance.Amount_TL_JobHistory = amount_tl_JobHistory

    company_name_job = instance.CompanyName_Job_JobHistory
    if company_name_job:
        # PaymentFirms kontrolü
        payment_firms = PaymentFirms.objects.filter(PaymentFirmsName=company_name_job)
        if not payment_firms.exists():
            PaymentFirms.objects.create(PaymentFirmsName=company_name_job)

@receiver(pre_save, sender=Incomes)
def update_Incomes_Tl(sender, instance, **kwargs):
    project_name_copy = instance.ProjectName_Incomes_Copy

    if project_name_copy:
        try:
            project = Project.objects.get(ProjectName=project_name_copy)
            # Expenses modelinin CompanyName alanını Project'in CompanyName ile güncelle
            instance.ProjectName_Incomes = project.ProjectName
        except Project.DoesNotExist:
            # Eğer ilgili Project bulunamazsa, hata mesajı yazdırabilirsiniz.
            print(f"Project with ProjectName {instance.ProjectName_Incomes} not found.")
    
    if instance.Amount_Incomes is not None and instance.Dollar_Rate_Incomes is not None:
        # Calculate the new value for Amount_TL_Expenses
        amount_usd_Incomes = instance.Amount_Incomes / instance.Dollar_Rate_Incomes
        # Update the instance with the new value
        instance.Amount_Usd_Incomes = amount_usd_Incomes

@receiver(post_save, sender=Clients)
def update_projects_with_client_name(sender, instance, **kwargs):
    matching_client_new = Clients.objects.filter(CompanyName_Clients_New=instance.CompanyName_Clients)



    # Eğer CompanyName_Clients değiştiyse
    if instance.CompanyName_Clients != instance.CompanyName_Clients_New and instance.CompanyName_Clients_New and not matching_client_new:
        # Yeni CompanyName ile eşleşen Project'leri bul
        matching_projects = Project.objects.filter(CompanyName=instance.CompanyName_Clients)
        matching_incomes = Incomes.objects.filter(CompanyName_Pay_Incomes=instance.CompanyName_Clients)

        # Bulunan Project'leri CompanyName_Clients_New ile güncelle
        for project in matching_projects:
            project.CompanyName = instance.CompanyName_Clients_New
            project.save()
        for income in matching_incomes:
            income.CompanyName_Pay_Incomes = instance.CompanyName_Clients_New
            income.save()

        # CompanyName_Clients_New boşsa CompanyName_Clients ile doldur
        if not instance.CompanyName_Clients_New:
            instance.CompanyName_Clients_New = instance.CompanyName_Clients

        # Son olarak CompanyName_Clients'ı CompanyName_Clients_New ile güncelle
        instance.CompanyName_Clients = instance.CompanyName_Clients_New
        instance.save()

@receiver(post_save, sender=Supplier)
def update_expenses_with_supplier_name(sender, instance, **kwargs):
  

    matching_supplier_new = Supplier.objects.filter(CompanyName_Supplier_New=instance.CompanyName_Supplier)
    if instance.CompanyName_Supplier != instance.CompanyName_Supplier_New and instance.CompanyName_Supplier_New:
    # Eğer matching_supplier_new boşsa veya hiçbir eşleşme bulunmamışsa
        if not matching_supplier_new.exists():
            # Yeni CompanyName ile eşleşen Project'leri bul
            matching_expenses = Expenses.objects.filter(CompanyName_Paying_Expenses=instance.CompanyName_Supplier)
            matching_jobhistory = JobHistory.objects.filter(CompanyName_Job_JobHistory=instance.CompanyName_Supplier)

            # Bulunan Project'leri CompanyName_Clients_New ile güncelle
            for expenses in matching_expenses:
                expenses.CompanyName_Paying_Expenses = instance.CompanyName_Supplier_New
                expenses.save()

            # Bulunan Project'leri CompanyName_Clients_New ile güncelle
            for jobhistory in matching_jobhistory:
                jobhistory.CompanyName_Job_JobHistory = instance.CompanyName_Supplier_New
                jobhistory.save()

            # Son olarak CompanyName_Clients'ı CompanyName_Clients_New ile güncelle
            instance.CompanyName_Supplier = instance.CompanyName_Supplier_New
            instance.save()

@receiver(post_save, sender=SalesOfferCard)
def update_client_card(sender, instance, **kwargs):
    need_save = False

    if instance.Client_Card_Copy:
        try:
            client = Clients.objects.get(CompanyName_Clients=instance.Client_Card_Copy)
            instance.Client_Card = client
            need_save = True
        except Clients.DoesNotExist:
            # Optional handling for non-existent client
            pass
    if instance.UnitOffer_NotIncludingKDV is not None and instance.DC_Power_Card is not None and instance.Offer_Cost_NotIncludingKDV_Card is None:
        instance.Offer_Cost_NotIncludingKDV_Card = instance.DC_Power_Card * instance.UnitOffer_NotIncludingKDV
    
    if instance.UnitCost_NotIncludingKDV is not None and instance.DC_Power_Card is not None and instance.Cost_NotIncludingKDV_Card is None:
        instance.Cost_NotIncludingKDV_Card = instance.DC_Power_Card * instance.UnitCost_NotIncludingKDV
        
    if instance.Roof_Cost_Card and instance.UnitOffer_NotIncludingKDV:
        instance.Unit_Cost_with_Roof_Cost = instance.Roof_Cost_Card + instance.UnitOffer_NotIncludingKDV
        need_save = True

    if instance.Roof_Cost_Card and instance.DC_Power_Card and instance.Offer_Cost_NotIncludingKDV_Card:
    # Convert the float result to Decimal before adding
        tmp = Decimal(instance.Roof_Cost_Card * instance.DC_Power_Card / 1000)
        tmp = tmp + instance.Offer_Cost_NotIncludingKDV_Card
        instance.Unit_Offer_with_Roof_Cost = tmp
        need_save = True

    if instance.Cost_NotIncludingKDV_Card and instance.Offer_Cost_NotIncludingKDV_Card:
        if instance.Offer_Cost_NotIncludingKDV_Card != 0:
            instance.Profit_Rate_Card = instance.Cost_NotIncludingKDV_Card / instance.Offer_Cost_NotIncludingKDV_Card
            need_save = True

    


    post_save.disconnect(update_client_card, sender=SalesOfferCard)

    # Save the instance
    try:
        instance.save(update_fields=['Client_Card', 'Unit_Cost_with_Roof_Cost', 'Unit_Offer_with_Roof_Cost', 'Profit_Rate_Card','Cost_NotIncludingKDV_Card', 'Offer_Cost_NotIncludingKDV_Card'])
    finally:
        # Reconnect the signal
        post_save.connect(update_client_card, sender=SalesOfferCard)


@receiver(pre_save, sender=Fail)
def update_operation_forfail(sender, instance, **kwargs):
    if instance.Fail_Operation_Care_Copy and instance.Fail_Operation_Care_Copy!=instance.Fail_Operation_Care:
        try:
            operation = Operation_Care.objects.get(Operation_Care_Company=instance.Fail_Operation_Care_Copy)
            instance.Fail_Operation_Care = operation
        except Operation_Care.DoesNotExist:
            pass

@receiver(post_save, sender=Operation_Care)
def create_inventor(sender, instance, created, **kwargs):
    if created:

        num= instance.Operation_Care_Inventor_Number
        for x in range(1, num+1):
            inventor=Inventor.objects.create(
                Inventor_Owner=instance,
                Inventor_Direction=instance.Operation_Care_Direction,
                Inventor_Number=x,
                Inventor_Number_Str=instance.Operation_Care_Number_Str,
                Inventor_Panel_Power=instance.Operation_Care_Panel_Power,
                Inventor_Panel_Brand=instance.Operation_Care_Panel_Brand,
                Inventor_VOC=instance.Operation_Care_VOC,
                Inventor_Panel_SY=instance.Operation_Care_Panel_Number_Str,
                Inventor_AC_Power=instance.Operation_Care_AC_Power,
                Inventor_DC_Power=instance.Operation_Care_DC_Power,
                Inventor_Capacity=instance.Operation_Care_Capacity,
                Inventor_Izolasion="OK",

            )

@receiver(post_save, sender=Inventor)
def create_string(sender, instance, created, **kwargs):
    if created:

        num= instance.Inventor_Number_Str
        for x in range(1, num+1):
            string=String.objects.create(
                String_Owner=instance,
                String_Number=x,
                String_Panel_Power=instance.Inventor_Panel_Power,
                String_Panel_Brand=instance.Inventor_Panel_Brand,
                String_VOC=instance.Inventor_VOC,
                String_Panel_SY=instance.Inventor_Panel_SY,
                String_AC_Power=instance.Inventor_AC_Power,
                String_DC_Power=instance.Inventor_DC_Power,
                String_Capacity=instance.Inventor_Capacity,
                String_Izolasion=instance.Inventor_Izolasion,
            )