from rest_framework import serializers

from .character import CharacterSerializer
from .anime import AnimeSerializer
from .genre import GenreSerializer


class AnimeCharacterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    anime = AnimeSerializer()
    character = CharacterSerializer()


class GenreAnimeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    genre = GenreSerializer()
    anime = AnimeSerializer()
