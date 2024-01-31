from django.contrib import admin
from django.urls import path
from django.views.static import serve
from django.conf import settings
from . import views





urlpatterns = [
    #path("admin/", admin.site.urls),
    path("home", views.home, name='home'),
    path("projects/", views.projects, name='projects'),
    path('project_details/<str:project_name>/', views.project_details, name='project_details'),
    path("realized_cost/<str:project_name>/", views.realized_cost, name='realized_cost'),
    path('income_details/<str:project_name>/', views.income_details, name='income_details'),
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
    path("deneme/", views.deneme, name='deneme'),
    path("expenses_add_wp/<int:project_id>", views.expenses_add_wp, name='expenses_add_wp'),
    path("jobhistory_add_wp/<int:project_id>", views.jobhistory_add_wp, name='jobhistory_add_wp'),
    path("income_add_wp/<int:project_id>", views.income_add_wp, name='income_add_wp'),
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
    path('upload_file_view/', views.upload_file_view, name='upload_file_view'),

   ]