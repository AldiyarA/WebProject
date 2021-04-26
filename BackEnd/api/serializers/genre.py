from rest_framework import serializers

from api.models import Genre


# serializers.Serializer
class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(allow_blank=True)
    description = serializers.CharField(allow_blank=True)

    def create(self, validated_data):
        genre = Genre.objects.create(name=validated_data['name'], description=validated_data['description'])
        return genre

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.description = validated_data['description']
        instance.save()
        return instance
