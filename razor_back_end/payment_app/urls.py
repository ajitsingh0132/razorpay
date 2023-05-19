from . import views
from django.urls import path

urlpatterns = [
    path("new-order", views.new_order),
    path("callback", views.order_callback)
]
