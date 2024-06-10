# wallet/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction as db_transaction
from .models import Wallet, TransactionDetails
from .serializers import UserSerializer, WalletSerializer, TransactionSerializer
from .permissions import AllowAnyPermission
from decimal import Decimal

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAnyPermission] 

class WalletBalanceView(generics.RetrieveAPIView):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.wallet

class WalletDepositView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    @db_transaction.atomic
    def post(self, request, *args, **kwargs):
        wallet = request.user.wallet
        amount = Decimal(request.data.get('amount'))
        if amount > 0:
            wallet.balance +=  amount
            wallet.save()
            TransactionDetails.objects.create(wallet_details=wallet, transaction_amount=amount, transaction_type='deposit')
            return Response({'status': 'Deposit Successful'}, status=status.HTTP_201_CREATED)
        return Response({'error':'Invalid Amount deposited'}, status=status.HTTP_400_BAD_REQUEST)

class WalletWithdrawView(generics.GenericAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    @db_transaction.atomic
    def post(self, request, *args, **kwargs):
        wallet = request.user.wallet
        amount = Decimal(request.data.get('amount'))
        if wallet.balance < amount and amount < 0:
            return Response({'error': 'Insufficient Balance'}, status=status.HTTP_400_BAD_REQUEST)
        wallet.balance -= amount
        wallet.save()
        TransactionDetails.objects.create(wallet_details=wallet, transaction_amount=amount, transaction_type='withdrawal')
        return Response({'status': 'Withdrawal Successful'}, status=status.HTTP_201_CREATED)

class TransactionHistoryView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.wallet)
        return TransactionDetails.objects.filter(wallet_details=self.request.user.wallet)