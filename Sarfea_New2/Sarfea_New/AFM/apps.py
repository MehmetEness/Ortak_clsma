from django.apps import AppConfig


class AfmConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "AFM"

    def ready(self):
        import AFM.signals  # Burada signals.py dosyanızın tanıtılması