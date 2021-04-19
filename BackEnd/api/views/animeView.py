import json
from django.shortcuts import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .views import postAnimeCharacter, deleteAnimeCharacter, postGenreAnime, deleteGenreAnime
from api.models import Anime, AnimeCharacter, Character, Genre, GenreAnime, Article
from api.serializers import AnimeSerializer, CharacterSerializer, GenreSerializer, GenreAnimeSerializer,\
    ArticleSerializer


class AnimeListAPIView(APIView):
    def get(self, request):
        animeList = Anime.objects.order_by('english_name')
        serializer = AnimeSerializer(animeList, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AnimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        animeList = Anime.objects.order_by('english_name')
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
    def get_object(self, pk):
        try:
            return Anime.objects.get(id=pk)
        except Anime.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None):
        anime = self.get_object(pk)
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def put(self, request, pk=None):
        anime = self.get_object(pk)
        serializer = AnimeSerializer(instance=anime, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        anime = self.get_object(pk)
        anime.delete()
        return Response({'message': 'deleted'}, status=204)


class AnimeCharacterListAPIView(APIView):
    def get_object(self, pk):
        try:
            return Anime.objects.get(id=pk)
        except Anime.DoesNotExist as e:
            raise Http404

    def get_character(self, id):
        try:
            return Character.objects.get(id=id)
        except Character.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None, character_id=None):
        anime = self.get_object(pk)
        characters_id = anime.characters.all()
        characters = [character.character for character in characters_id]
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, character_id=None):
        anime = self.get_object(pk)
        character_id = json.loads(request.body)['character']
        character = self.get_character(character_id)
        return postAnimeCharacter(anime, character)

    def delete(self, request, pk=None, character_id=None):
        anime = self.get_object(pk)
        character = self.get_character(character_id)
        return deleteAnimeCharacter(anime, character)


class AnimeGenreListAPIView(APIView):
    def get_object(self, pk):
        try:
            return Anime.objects.get(id=pk)
        except Anime.DoesNotExist as e:
            raise Http404

    def get_genre(self, id):
        try:
            return Genre.objects.get(id=id)
        except Genre.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None, genre_id=None):
        anime = self.get_object(pk)
        genres_id = anime.genres.all()
        genres = [genre.genre for genre in genres_id]
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, genre_id=None):
        anime = self.get_object(pk)
        genre_id = json.loads(request.body)['genre']
        genre = self.get_genre(genre_id)
        return postGenreAnime(genre, anime)

    def delete(self, request, pk=None, genre_id=None):
        anime = self.get_object(pk)
        genre = self.get_genre(genre_id)
        return deleteGenreAnime(genre, anime)


class AnimeArticleListAPIView(APIView):
    def get_object(self, pk):
        try:
            return Anime.objects.get(id=pk)
        except Anime.DoesNotExist as e:
            raise Http404

    def get_article(self, id, anime):
        try:
            return Article.objects.get(id=id, anime=anime)
        except Article.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None, article_id=None):
        anime = self.get_object(pk)
        articles_id = anime.articles.all()
        articles = [article for article in articles_id]
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, article_id=None):
        anime = self.get_object(pk)
        data = json.loads(request.body)
        article = Article.objects.create(anime=anime, name=data['name'], content=data['content'])
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def put(self, request, pk=None, article_id=None):
        anime = self.get_object(pk)
        data = json.loads(request.body)
        serializer = ArticleSerializer(instance=self.get_article(data['id'], anime), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None, article_id=None):
        anime = self.get_object(pk)
        article = self.get_article(article_id, anime)
        article.delete()
        return Response({'message': 'deleted'}, status=204)
