# Generated by Django 5.0 on 2023-12-24 20:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("AFM", "0030_alter_salesoffercard_ac_power_card_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="salesoffercard",
            name="Is_Lost",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
