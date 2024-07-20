# Generated by Django 5.0 on 2023-12-18 10:40

import AFM.models
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("AFM", "0027_alter_salesoffercard_situation_card_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="salesoffercard",
            name="Cost_NotIncludingKDV_Card",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, default=0, max_digits=12, null=True
            ),
        ),
    ]
