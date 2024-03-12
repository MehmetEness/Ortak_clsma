from rest_framework import serializers
from .models import Clients  # Make sure to import your Clients model

class ClientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    CompanyName_Clients_New = serializers.CharField()
    CompanyName_Clients = serializers.CharField()
    ContactPerson = serializers.CharField()
    PhoneNumber = serializers.CharField()
    Email = serializers.CharField()
    Location = serializers.CharField()
    
    def create(self, validated_data):

        return Clients.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.CompanyName_Clients = validated_data.get('CompanyName_Clients', instance.CompanyName_Clients)
        instance.ContactPerson = validated_data.get('ContactPerson', instance.ContactPerson)
        instance.PhoneNumber = validated_data.get('PhoneNumber', instance.PhoneNumber)
        instance.Email = validated_data.get('Email', instance.Email)
        instance.Location = validated_data.get('Location', instance.Location)

        instance.save()
        return instance