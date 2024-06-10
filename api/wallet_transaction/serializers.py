# wallet/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Wallet, TransactionDetails

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, data):
        if not data.isalpha():
            raise serializers.ValidationError("Contains numeric characters in username")
        return data


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Wallet.objects.create(user=user)
        return user

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['balance']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionDetails
        fields = ['transaction_amount', 'transaction_type', 'date_and_time']
