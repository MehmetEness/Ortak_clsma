# Generated by Django 5.0.2 on 2024-03-03 14:44

import AFM.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AFM', '0058_remove_string_string_number_str_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='string',
            name='String_Percent',
            field=AFM.models.TwoDecimalField(blank=True, decimal_places=2, default='0', max_digits=30, null=True),
        ),
    ]
