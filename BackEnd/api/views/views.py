import json
from django.shortcuts import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.models import Anime, AnimeCharacter, Character, Genre, GenreAnime
from api.serializers import AnimeCharacterSerializer, GenreAnimeSerializer


def postAnimeCharacter(anime: Anime, character: Character):
    try:
        animeCharacter = AnimeCharacter.objects.get(anime=anime, character=character)
    except AnimeCharacter.DoesNotExist as e:
        animeCharacter = AnimeCharacter.objects.create(anime=anime, character=character)
    serializer = AnimeCharacterSerializer(animeCharacter)
    return Response(serializer.data)


def deleteAnimeCharacter(anime: Anime, character: Character):
    try:
        animeCharacter = AnimeCharacter.objects.get(anime=anime, character=character)
    except AnimeCharacter.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    animeCharacter.delete()
    return Response({'message': 'deleted'}, status=204)


def postGenreAnime(genre: Genre, anime: Anime):
    try:
        genreAnime = GenreAnime.objects.get(genre=genre, anime=anime)
    except GenreAnime.DoesNotExist as e:
        genreAnime = GenreAnime.objects.create(genre=genre, anime=anime)
    serializer = GenreAnimeSerializer(genreAnime)
    return Response(serializer.data)


def deleteGenreAnime(genre: Genre, anime: Anime):
    try:
        genreAnime = GenreAnime.objects.get(genre=genre, anime=anime)
    except GenreAnime.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)
    genreAnime.delete()
    return Response({'message': 'deleted'}, status=204)
