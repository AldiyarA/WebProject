from django.urls import path

from api.views import *


urlpatterns = [
    path('genres/', genre_list),
    path('genres/<int:genre_id>/', genre_detail),
    path('genres/<int:genre_id>/anime/', genre_animes),
    path('genres/<int:genre_id>/anime/<int:anime_id>', genre_animes),
    path('anime/filter/<str:genres>', animeFilterList),
    path('anime/', AnimeListAPIView.as_view()),
    path('anime/<int:pk>', AnimeDetailAPIView.as_view()),
    path('anime/<int:pk>/characters', AnimeCharacterListAPIView.as_view()),
    path('anime/<int:pk>/characters/<int:character_id>', AnimeCharacterListAPIView.as_view()),
    path('anime/<int:pk>/genres', AnimeGenreListAPIView.as_view()),
    path('anime/<int:pk>/genres/<int:genre_id>', AnimeGenreListAPIView.as_view()),
    path('anime/<int:pk>/articles', AnimeArticleListAPIView.as_view()),
    path('anime/<int:pk>/articles/<int:article_id>', AnimeArticleListAPIView.as_view()),
    path('characters/', CharacterListAPIView.as_view()),
    path('characters/<int:pk>', CharacterDetailAPIView.as_view()),
    path('characters/<int:pk>/anime', CharacterAnimeListAPIView.as_view()),
    path('characters/<int:pk>/anime/<int:anime_id>', CharacterAnimeListAPIView.as_view()),
    path('characters/<int:pk>/articles', CharacterArticleListAPIView.as_view()),
    path('characters/<int:pk>/articles/<int:article_id>', CharacterArticleListAPIView.as_view())
]
