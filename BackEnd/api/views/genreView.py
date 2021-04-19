import json

from rest_framework.decorators import api_view

from django.http.request import HttpRequest
from django.http.response import HttpResponse, JsonResponse

from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Genre, GenreAnime, Anime
from api.serializers import GenreSerializer, AnimeSerializer, GenreAnimeSerializer
from .views import postGenreAnime, deleteGenreAnime

@api_view(['GET', 'POST'])
def genre_list(request):
    if request.method == 'GET':
        genres = Genre.objects.order_by('name')
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def genre_detail(request, genre_id):
    try:
        genre = Genre.objects.get(id=genre_id)
    except Genre.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    if request.method == 'GET':
        serializer = GenreSerializer(genre)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GenreSerializer(instance=genre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        genre.delete()
        return Response({'message': 'deleted'}, status=204)


@api_view(['GET', 'POST', 'DELETE'])
def genre_animes(request, genre_id, anime_id=None):
    try:
        genre = Genre.objects.get(id=genre_id)
    except Genre.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    if request.method == 'GET':
        animes_id = genre.animes.all()
        animes = [anime.anime for anime in animes_id]
        serializer = AnimeSerializer(animes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        anime_id = data['anime']
        try:
            anime = Anime.objects.get(id=anime_id)
        except Genre.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        return postGenreAnime(genre, anime)
    elif request.method == "DELETE":
        try:
            anime = Anime.objects.get(id=anime_id)
        except Anime.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        return deleteGenreAnime(genre, anime)
