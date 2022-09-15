from django.urls import path
from . import views

urlpatterns = [
    path('upload/<filename>', views.FileUploadView.as_view()),
    path('splitbytype/', views.SplitByType.as_view()),
    path('splitbycontentrating/', views.SplitByContentRating.as_view()),
    path('addratingroundoff/', views.AddRatingRoundoff.as_view()),
]