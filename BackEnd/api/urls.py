from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from api.views import *


urlpatterns = [
    path('login/', obtain_jwt_token),
    path('genres/', genre_list),
    path('genres/<int:genre_id>/', genre_detail),
    path('genres/<int:genre_id>/anime/', genre_anime_list),
    path('genres/<int:genre_id>/anime/<int:anime_id>', genre_anime_detail),
    path('anime/filter/<str:genres>', animeFilterList),
    path('anime/', AnimeListAPIView.as_view()),
    path('anime/<int:pk>', AnimeDetailAPIView.as_view()),
    path('anime/<int:pk>/characters', AnimeCharacterListAPIView.as_view()),
    path('anime/<int:pk>/characters/<int:character_id>', AnimeCharacterDetailAPIView.as_view()),
    path('anime/<int:pk>/genres/', AnimeGenreListAPIView.as_view()),
    path('anime/<int:pk>/genres/<int:genre_id>', AnimeGenreDetailAPIView.as_view()),
    path('anime/<int:pk>/articles', AnimeArticleListAPIView.as_view()),
    path('anime/<int:pk>/articles/<int:article_id>', AnimeArticleDetailAPIView.as_view()),
    path('characters/', CharacterListAPIView.as_view()),
    path('characters/<int:pk>', CharacterDetailAPIView.as_view()),
    path('characters/<int:pk>/anime', CharacterAnimeListAPIView.as_view()),
    path('characters/<int:pk>/anime/<int:anime_id>', CharacterAnimeDetailAPIView.as_view()),
    path('characters/<int:pk>/articles', CharacterArticleListAPIView.as_view()),
    path('characters/<int:pk>/articles/<int:article_id>', CharacterArticleDetailAPIView.as_view())
]
