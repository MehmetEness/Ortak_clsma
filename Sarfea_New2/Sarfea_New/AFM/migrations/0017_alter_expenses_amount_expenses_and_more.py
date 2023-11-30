# Generated by Django 4.2.7 on 2023-11-29 20:57

import AFM.models
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("AFM", "0016_alter_expenses_amount_expenses_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="expenses",
            name="Amount_Expenses",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="expenses",
            name="Amount_TL_Expenses",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="incomes",
            name="Amount_Incomes",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="incomes",
            name="Amount_Usd_Incomes",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="jobhistory",
            name="Amount_JobHistory",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
        migrations.AlterField(
            model_name="jobhistory",
            name="Amount_TL_JobHistory",
            field=AFM.models.TwoDecimalField(
                blank=True, decimal_places=2, max_digits=12, null=True
            ),
        ),
    ]
