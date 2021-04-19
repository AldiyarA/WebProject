from rest_framework import serializers

from api.models import Character


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'original_name', 'english_name', 'alias', 'race', 'gender', 'age', 'description', 'photo_url')
