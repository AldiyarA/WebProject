import json

from rest_framework.decorators import api_view

from rest_framework.response import Response

from api.models import Genre, Anime
from api.serializers import GenreSerializer, AnimeSerializer, GenreAnimeSerializer
from .views import postGenreAnime, deleteGenreAnime, get_anime_genre


# FBV
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


@api_view(['GET', 'POST'])
def genre_anime_list(request, genre_id):
    try:
        genre = Genre.objects.get(id=genre_id)
    except Genre.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    if request.method == 'GET':
        animeList_id = genre.animes.all()
        animeList = [anime.anime for anime in animeList_id]
        serializer = AnimeSerializer(animeList, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        anime_id = data['anime']
        try:
            anime = Anime.objects.get(id=anime_id)
        except Genre.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        return postGenreAnime(genre, anime)


@api_view(['GET', 'DELETE'])
def genre_anime_detail(request, genre_id, anime_id):
    try:
        genre = Genre.objects.get(id=genre_id)
    except Genre.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    try:
        anime = Anime.objects.get(id=anime_id)
    except Anime.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    if request.method == 'GET':
        serializer = GenreAnimeSerializer(get_anime_genre(anime, genre))
        Response(serializer.data)
    elif request.method == "DELETE":
        return deleteGenreAnime(genre, anime)
