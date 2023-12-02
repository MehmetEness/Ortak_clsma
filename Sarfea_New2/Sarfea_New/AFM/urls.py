from django.contrib import admin
from django.urls import path
from . import views





urlpatterns = [
    #path("admin/", admin.site.urls),
    path("", views.home),
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


]