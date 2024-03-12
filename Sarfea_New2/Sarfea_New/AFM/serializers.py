from rest_framework import serializers
from .models import Clients, Supplier  # Make sure to import your Clients model

class ClientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    CompanyName_Clients_New = serializers.CharField(required=True)
    ContactPerson = serializers.CharField(required=False)
    PhoneNumber = serializers.CharField(required=False)
    Email = serializers.CharField(required=False)
    Location = serializers.CharField(required=False)

    
    def create(self, validated_data):
        return Clients.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Clients_New = validated_data.get('CompanyName_Clients_New', instance.CompanyName_Clients_New)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance
    
class SupplierSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    CompanyName_Supplier_New = serializers.CharField(required=True)
    ContactPerson = serializers.CharField(required=False)
    PhoneNumber = serializers.CharField(required=False)
    Email = serializers.CharField(required=False)
    Location = serializers.CharField(required=False)

    
    def create(self, validated_data):
        return Supplier.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Supplier_New = validated_data.get('CompanyName_Supplier_New', instance.CompanyName_Supplier_New)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance