import json
from django.shortcuts import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.models import Character, Article, Anime
from api.serializers import ArticleSerializer, CharacterSerializer, AnimeSerializer
from api.views.views import postAnimeCharacter, deleteAnimeCharacter


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
    def get_object(self, pk):
        try:
            return Character.objects.get(id=pk)
        except Character.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None):
        character = self.get_object(pk)
        serializer = CharacterSerializer(character)
        return Response(serializer.data)

    def put(self, request, pk=None):
        character = self.get_object(pk)
        serializer = CharacterSerializer(instance=character, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        character = self.get_object(pk)
        character.delete()
        return Response({'message': 'deleted'}, status=204)


class CharacterArticleListAPIView(APIView):
    def get_object(self, pk):
        try:
            return Character.objects.get(id=pk)
        except Character.DoesNotExist as e:
            raise Http404

    def get_article(self, id, character):
        try:
            return Article.objects.get(id=id, character=character)
        except Article.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None, article_id=None):
        character = self.get_object(pk)
        articles_id = character.articles.all()
        articles = [article for article in articles_id]
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, article_id=None):
        character = self.get_object(pk)
        data = json.loads(request.body)
        article = Article.objects.create(character=character, name=data['name'], content=data['content'])
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def put(self, request, pk=None, article_id=None):
        character = self.get_object(pk)
        data = json.loads(request.body)
        serializer = ArticleSerializer(instance=self.get_article(data['id'], character), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None, article_id=None):
        character = self.get_object(pk)
        article = self.get_article(article_id, character)
        article.delete()
        return Response({'message': 'deleted'}, status=204)


class CharacterAnimeListAPIView(APIView):
    def get_object(self, pk):
        try:
            return Character.objects.get(id=pk)
        except Character.DoesNotExist as e:
            raise Http404

    def get_anime(self, id):
        try:
            return Anime.objects.get(id=id)
        except Anime.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None, anime_id=None):
        character = self.get_object(pk)
        animes_id = character.animes.all()
        animeList = [anime.anime for anime in animes_id]
        serializer = AnimeSerializer(animeList, many=True)
        return Response(serializer.data)

    def post(self, request, pk=None, anime_id=None):
        character = self.get_object(pk)
        anime_id = json.loads(request.body)['anime']
        anime = self.get_anime(anime_id)
        return postAnimeCharacter(anime, character)

    def delete(self, request, pk=None, anime_id=None):
        character = self.get_object(pk)
        anime = self.get_anime(anime_id)
        return deleteAnimeCharacter(anime, character)










