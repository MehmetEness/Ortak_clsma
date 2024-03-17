
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView
from django.views.generic import TemplateView

urlpatterns = [
    path('',include('AFM.urls')),
    path('',include('AFM.api.urls')),
    path('account/',include('account.urls')),
    path('', RedirectView.as_view(url='/account/login/', permanent=True)),  # Ana URL'yi /account/login/ sayfasına yönlendirin
    path("admin/", admin.site.urls),
    path('not-found/', TemplateView.as_view(template_name='not_found.html'), name='not_found'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
