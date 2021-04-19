from rest_framework import serializers

from api.models import *
from .characterSerializer import CharacterSerializer
from .animeSerializer import AnimeSerializer
from rest_framework.response import Response


# serializers.Serializer
class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField()

    def create(self, validated_data):
        genre = Genre.objects.create(name=validated_data['name'], description=validated_data['description'])
        return genre

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.description = validated_data['description']
        instance.save()
        return instance


class AnimeCharacterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    anime = AnimeSerializer()
    character = CharacterSerializer()

    def create(self, validated_data):
        try:
            anime = Anime.objects.get(id=validated_data['anime'])
        except Anime.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        try:
            character = Character.objects.get(id=validated_data['character'])
        except Character.DoesNotExist as e:
            return Response({'message': str(e)}, status=400)
        animeCharacter = AnimeCharacter.objects.create(anime=anime,
                                                       character=character)
        return animeCharacter


class GenreAnimeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    genre = GenreSerializer()
    anime = AnimeSerializer()

    def create(self, validated_data):
        genreAnime = GenreAnime.objects.create(genre=validated_data['genre'], anime=validated_data['anime'])
        return genreAnime
