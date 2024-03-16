from django.contrib import admin
from django.urls import path
from django.views.static import serve
from django.conf import settings
from AFM.api import views  as api_view
from AFM import views

urlpatterns = [
    #MODUL-1
    path("home", views.home, name='home'),
    path("projects/", views.projects, name='projects'),
    path('project_details/<project_id>/', views.project_details, name='project_details'),
    path("realized_cost/<project_id>/", views.realized_cost, name='realized_cost'),
    path('income_details/<project_id>/', views.income_details, name='income_details'),
    path("client/", views.client, name='client'),
    path("supplier/", views.supplier, name='supplier'),
    path('project_edit/<str:project_name>/', views.project_edit, name='project_edit'),
    path('client_edit/<str:client_name>/', views.client_edit, name='client_edit'),
    path('supplier_edit/<str:supplier_name>/', views.supplier_edit, name='supplier_edit'),
    path('expenses_edit/<int:expenses_id>/', views.expenses_edit, name='expenses_edit'),
    path('jobhistory_edit/<int:jobhistory_id>/', views.jobhistory_edit, name='jobhistory_edit'),
    path('income_edit/<int:income_id>/', views.income_edit, name='income_edit'),
    path("project_add/", views.project_add, name='project_add'),
    path("expenses_add/", views.expenses_add, name='expenses_add'),
    path("jobhistory_add/", views.jobhistory_add, name='jobhistory_add'),
    path("income_add/", views.income_add, name='income_add'),
    path("expenses_add_wp/<int:project_id>", views.expenses_add_wp, name='expenses_add_wp'),
    path("jobhistory_add_wp/<int:project_id>", views.jobhistory_add_wp, name='jobhistory_add_wp'),
    path("income_add_wp/<int:project_id>", views.income_add_wp, name='income_add_wp'),
    
    #MODUL-2    
    path("sales_offer/", views.sales_offer, name='sales_offer'),
    path('sales_offer_edit/<int:sales_offer_id>/', views.sales_offer_edit, name='sales_offer_edit'),
    path("sales_offer_add/", views.sales_offer_add, name='sales_offer_add'),
    path('update_card_situation/', views.update_card_situation, name='update_card_situation'),
    path('sales_offer/AFM/delete_salesoffercard/<int:card_id>/', views.delete_salesoffercard, name='delete_salesoffercard'),
    path('sales_offer/AFM/set_card_lost/<card_id>/', views.set_card_lost, name='set_card_lost'),
    path('sales_offer/AFM/set_card_relost/<card_id>/', views.set_card_relost, name='set_card_relost'),
    path('sales_offer/AFM/set_card_gain/<card_id>/', views.set_card_gain, name='set_card_gain'),
    path('sales_offer/AFM/set_card_regain/<card_id>/', views.set_card_regain, name='set_card_regain'),
    path('sales_offer/AFM/set_card_wait/<card_id>/', views.set_card_wait, name='set_card_wait'),
    path('sales_offer/AFM/set_card_rewait/<card_id>/', views.set_card_rewait, name='set_card_rewait'),
    path('sales_offer/AFM/create_revise/<card_id>/', views.create_revise, name='create_revise'),
    path("sales_offer_revises/<card_id>/", views.sales_offer_revises, name='sales_offer_revises'),
    
    #MODUL-3
    path('operation_care/', views.operation_care, name='operation_care'),
    path('operation_care_add/', views.operation_care_add, name='operation_care_add'),
    path("operation_care_detail/<operation_care_id>/", views.operation_care_detail, name='operation_care_detail'),
    path('operation_care_edit/<operation_care_id>/', views.operation_care_edit, name='operation_care_edit'),
    path('fault_notification/', views.fault_notification, name='fault_notification'),
    path('fail_edit/<fail_id>/', views.fail_edit, name='fail_edit'),
    path('inverter/<operation_care_id>/', views.inverter, name='inverter'),
    
    #******************************* A P I ***********************************
    path('api_project/', api_view.ProjectListAPIView.as_view(), name='api_projects'),
    path('api_project/<project_id>', api_view.ProjectDetailAPIView.as_view(), name='api_project_detail'),

    path('api_client/', api_view.ClientsListAPIView.as_view(), name='api_clients'),
    path('api_client/<client_id>', api_view.ClientDetailAPIView.as_view(), name='api_client_detail'),

    path('api_supplier/', api_view.SuppliersListAPIView.as_view(), name='api_suppliers'),
    path('api_supplier/<supplier_id>', api_view.SupplierDetailAPIView.as_view(), name='api_supplier_detail'),

    path("api_expense/", api_view.ExpensesListAPIView.as_view(), name='api_expenses'),
    path('api_expense/<expenses_id>', api_view.ExpenseDetailAPIView.as_view(), name='api_expenses_detail'),

    path("api_job_history/", api_view.JobHistoryListAPIView.as_view(), name='api_job_history'),
    path('api_job_history/<jobhistory_id>', api_view.JobHistoryDetailAPIView.as_view(), name='api_job_history_detail'),

    path("api_income/", api_view.IncomesListAPIView.as_view(), name='api_incomes'),
    path('api_income/<incomes_id>', api_view.IncomeDetailAPIView.as_view(), name='api_income_detail'),
    #******************************* ------- ***********************************

    path('get_lost_cards/', views.get_lost_cards, name='get_lost_cards'),
    path('get_gain_cards/', views.get_gain_cards, name='get_gain_cards'),
    path('get_late_cards/', views.get_late_cards, name='get_late_cards'),
    path('get_run_cards/', views.get_run_cards, name='get_run_cards'),
    path('get_cards/', views.get_cards, name='get_cards'),

    path('get_operation_care/', views.get_operation_care, name='get_operation_care'),
    path('get_fail/', views.get_fail, name='get_fail'),
    path('get_fail_bill/', views.get_fail_bill, name='get_fail_bill'),
    path("get_inventors/<operation_care_id>/", views.get_inventors, name='get_inventors'),
    path("get_strings/<inventor_id>/", views.get_strings, name='get_strings'),
    
    path("get_dollar_rate/<str:date>/", views.get_dollar_rate, name='get_dollar_rate'),
    
    #MODUL-POST
   
    path('post_sales_offer/', views.post_sales_offer, name='post_sales_offer'),
    path('post_update_sales_offer/<sales_offer_id>/', views.post_update_sales_offer, name='post_update_sales_offer'),

    path('post_update_string/<string_id>/', views.post_update_string, name='post_update_string'),
    path('post_card_file/', views.post_card_file, name='post_card_file'),
    path('post_fail_bill/', views.post_fail_bill, name='post_fail_bill'),

    #MODUL-DENEME
    path("deneme/", views.deneme, name='deneme'),
    path("deneme2/", views.deneme2, name='deneme2'),
    

   ]