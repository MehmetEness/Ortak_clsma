# Generated by Django 5.0.3 on 2024-03-12 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AFM', '0064_remove_clients_companyname_clients_new'),
    ]

    operations = [
        migrations.AddField(
            model_name='clients',
            name='CompanyName_Clients_New',
            field=models.CharField(blank=True, max_length=63, null=True),
        ),
    ]
