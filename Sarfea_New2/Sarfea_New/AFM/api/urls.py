from django.urls import path
from AFM.api import views  as api_view


urlpatterns = [
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
    
    path("api_sales_offer/", api_view.SalesOfferListAPIView.as_view(), name='api_sales_offer'),
    path('api_sales_offer/<sales_offer_id>', api_view.SalesOfferDetailAPIView.as_view(), name='api_sales_offer_detail'),
    
    path("api_sales_offer_revise/", api_view.SalesOfferReviseListAPIView.as_view(), name='api_sales_offer_revise'),
    path('api_sales_offer_revise/<sales_offer_revise_id>', api_view.SalesOfferReviseDetailAPIView.as_view(), name='api_sales_offer_revise_detail'),
    
    #******************************* ------- ***********************************



]