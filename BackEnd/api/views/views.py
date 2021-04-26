from django.http import Http404
from rest_framework.response import Response

from api.models import Anime, AnimeCharacter, Character, Genre, GenreAnime
from api.serializers import AnimeCharacterSerializer, GenreAnimeSerializer


def get_anime(pk):
    try:
        return Anime.objects.get(id=pk)
    except Anime.DoesNotExist as e:
        raise Http404


def get_genre(pk):
    try:
        return Genre.objects.get(id=pk)
    except Genre.DoesNotExist as e:
        raise Http404


def get_anime_genre(anime, genre):
    try:
        return GenreAnime.objects.get(anime=anime, genre=genre)
    except GenreAnime.DoesNotExist as e:
        raise Http404


def get_character(pk):
    try:
        return Character.objects.get(id=pk)
    except Character.DoesNotExist as e:
        raise Http404


def get_anime_character(anime, character):
    try:
        return AnimeCharacter.objects.get(anime=anime, character=character)
    except AnimeCharacter.DoesNotExist as e:
        raise Http404


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
