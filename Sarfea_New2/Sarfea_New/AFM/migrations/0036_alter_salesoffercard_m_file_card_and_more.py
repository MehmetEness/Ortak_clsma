# Generated by Django 5.0 on 2023-12-30 14:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("AFM", "0035_salesoffercard_m_file_card_2_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="salesoffercard",
            name="M_File_Card",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="m_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="M_File_Card_2",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="m_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="M_File_Card_3",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="m_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="Offer_File_Card",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="offer_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="Offer_File_Card_2",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="offer_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="Offer_File_Card_3",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="offer_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="Offer_File_Card_4",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="offer_files"
            ),
        ),
        migrations.AlterField(
            model_name="salesoffercard",
            name="Offer_File_Card_5",
            field=models.FileField(
                blank=True, default="", null=True, upload_to="offer_files"
            ),
        ),
    ]