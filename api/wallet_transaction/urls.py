# wallet/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView, WalletBalanceView, WalletDepositView, WalletWithdrawView, TransactionHistoryView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('wallet/', WalletBalanceView.as_view(), name='wallet-balance'),
    path('wallet/deposit/', WalletDepositView.as_view(), name='wallet-deposit'),
    path('wallet/withdraw/', WalletWithdrawView.as_view(), name='wallet-withdraw'),
    path('wallet/transaction_details/', TransactionHistoryView.as_view(), name='transaction-history'),
]
