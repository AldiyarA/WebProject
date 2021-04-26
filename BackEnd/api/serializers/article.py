from rest_framework import serializers


class ArticleSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    content = serializers.CharField()

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.content = validated_data['content']
        instance.save()
        return instance
