from rest_framework import serializers

from api.models import Anime


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = ('id', 'country', 'original_name', 'transcription', 'english_name',
                  'year', 'company', 'author', 'description', 'photo_url')
