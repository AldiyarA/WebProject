import json
from django.shortcuts import Http404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.models import Anime, GenreAnime, Genre, AnimeArticle
from api.serializers import AnimeSerializer, CharacterSerializer, GenreSerializer, ArticleSerializer
from .views import postAnimeCharacter, deleteAnimeCharacter, postGenreAnime, deleteGenreAnime, \
    get_anime, get_character, get_genre, get_anime_genre, get_anime_character


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class AnimeListAPIView(APIView):
    def get(self, request):
        animeList = Anime.manager.all()
        serializer = AnimeSerializer(animeList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    permission_classes = [IsAuthenticated | ReadOnly]


def filterAnime(anime, genres):
    for genre in genres:
        try:
            GenreAnime.objects.get(genre=genre, anime=anime)
        except GenreAnime.DoesNotExist as e:
            return False
    return True


@api_view(['GET'])
def animeFilterList(request, genres):
    if request.method == 'GET':
        animeList = Anime.manager.all()
        genres_id_str = genres
        genres_id = [int(genre_id) for genre_id in genres_id_str.split('-')]
        genres = []
        try:
            for genre_id in genres_id:
                genres.append(Genre.objects.get(id=genre_id))
        except GenreAnime.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        animeFilter = []
        for anime in animeList:
            if filterAnime(anime, genres):
                animeFilter.append(anime)
        serializer = AnimeSerializer(animeFilter, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AnimeDetailAPIView(APIView):
    def get(self, request, pk=None):
        anime = get_anime(pk)
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def put(self, request, pk=None):
        anime = get_anime(pk)
        serializer = AnimeSerializer(instance=anime, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        anime = get_anime(pk)
        anime.delete()
        return Response({'message': 'deleted'}, status=204)

    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeCharacterListAPIView(APIView):
    def get(self, request, pk=None):
        anime = get_anime(pk)
        characters_id = anime.characters.all()
        characters = [character.character for character in characters_id]
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        anime = get_anime(pk)
        character_id = json.loads(request.body)['character']
        character = get_character(character_id)
        return postAnimeCharacter(anime, character)
    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeCharacterDetailAPIView(APIView):
    def get(self, request, pk=None, character_id=None):
        anime = get_anime(pk)
        character = get_character(character_id)
        animeCharacter = get_anime_character(anime, character)
        serializer = CharacterSerializer(character)
        return Response(serializer.data)

    def delete(self, request, pk=None, character_id=None):
        anime = get_anime(pk)
        character = get_character(character_id)
        return deleteAnimeCharacter(anime, character)
    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeGenreListAPIView(APIView):
    def get(self, request, pk=None):
        anime = get_anime(pk)
        genres_id = anime.genres.all()
        genres = [genre.genre for genre in genres_id]
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        anime = get_anime(pk)
        genre_id = json.loads(request.body)['genre']
        genre = get_genre(genre_id)
        return postGenreAnime(genre, anime)
    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeGenreDetailAPIView(APIView):
    def get(self, request, pk=None, genre_id=None):
        anime = get_anime(pk)
        genre = get_genre(genre_id)
        animeGenre = get_anime_genre(anime, genre)
        serializer = GenreSerializer(genre)
        return Response(serializer.data)

    def delete(self, request, pk=None, genre_id=None):
        anime = get_anime(pk)
        genre = get_genre(genre_id)
        return deleteGenreAnime(genre, anime)
    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeArticleListAPIView(APIView):
    def get(self, request, pk=None):
        anime = get_anime(pk)
        articles_id = anime.articles.all()
        articles = [article for article in articles_id]
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        anime = get_anime(pk)
        data = json.loads(request.body)
        article = AnimeArticle.objects.create(anime=anime, name=data['name'], content=data['content'])
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    permission_classes = [IsAuthenticated | ReadOnly]


class AnimeArticleDetailAPIView(APIView):
    def get_article(self, pk, anime):
        try:
            return AnimeArticle.objects.get(id=pk, anime=anime)
        except AnimeArticle.DoesNotExist as e:
            raise Http404

    def put(self, request, pk=None, article_id=None):
        anime = get_anime(pk)
        serializer = ArticleSerializer(instance=self.get_article(article_id, anime), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None, article_id=None):
        anime = get_anime(pk)
        article = self.get_article(article_id, anime)
        article.delete()
        return Response({'message': 'deleted'}, status=204)
    permission_classes = [IsAuthenticated | ReadOnly]
