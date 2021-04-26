import json
from django.shortcuts import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.models import Character, CharacterArticle, Anime
from api.serializers import ArticleSerializer, CharacterSerializer, AnimeSerializer

from .views import postAnimeCharacter, deleteAnimeCharacter, get_character, get_anime, get_anime_character


class CharacterListAPIView(APIView):
    def get(self, request):
        characters = Character.objects.order_by('english_name')
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CharacterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CharacterDetailAPIView(APIView):
    def get(self, request, pk=None):
        character = get_character(pk)
        serializer = CharacterSerializer(character)
        return Response(serializer.data)

    def put(self, request, pk=None):
        character = get_character(pk)
        serializer = CharacterSerializer(instance=character, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        character = get_character(pk)
        character.delete()
        return Response({'message': 'deleted'}, status=204)


class CharacterAnimeListAPIView(APIView):
    def get(self, request, pk=None):
        character = get_character(pk)
        animeList_id = character.animes.all()
        animeList = [anime.anime for anime in animeList_id]
        serializer = AnimeSerializer(animeList, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        character = get_character(pk)
        anime_id = json.loads(request.body)['anime']
        anime = get_anime(anime_id)
        return postAnimeCharacter(anime, character)


class CharacterAnimeDetailAPIView(APIView):
    def get(self, request, pk=None, anime_id=None):
        character = get_character(pk)
        anime = get_anime(anime_id)
        animeCharacter = get_anime_character(anime, character)
        serializer = AnimeSerializer(anime)
        return Response(serializer.data)

    def delete(self, request, pk=None, anime_id=None):
        character = get_character(pk)
        anime = get_anime(anime_id)
        return deleteAnimeCharacter(anime, character)


class CharacterArticleListAPIView(APIView):
    def get(self, request, pk=None):
        character = get_character(pk)
        articles_id = character.articles.all()
        articles = [article for article in articles_id]
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None):
        character = get_character(pk)
        data = json.loads(request.body)
        article = CharacterArticle.objects.create(character=character, name=data['name'], content=data['content'])
        serializer = ArticleSerializer(article)
        return Response(serializer.data)


class CharacterArticleDetailAPIView(APIView):
    def get_article(self, pk, character):
        try:
            return CharacterArticle.objects.get(id=pk, character=character)
        except CharacterArticle.DoesNotExist as e:
            raise Http404

    def put(self, request, pk=None, article_id=None):
        character = get_character(pk)
        serializer = ArticleSerializer(instance=self.get_article(article_id, character), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None, article_id=None):
        character = get_character(pk)
        article = self.get_article(article_id, character)
        article.delete()
        return Response({'message': 'deleted'}, status=204)
