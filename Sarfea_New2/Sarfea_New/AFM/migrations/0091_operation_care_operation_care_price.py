# Generated by Django 5.0.3 on 2024-05-21 16:36

import AFM.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AFM', '0090_alter_inventor_inventor_ac_power_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='operation_care',
            name='Operation_Care_Price',
            field=AFM.models.TwoDecimalField(blank=True, decimal_places=2, default='0', max_digits=30, null=True),
        ),
    ]
