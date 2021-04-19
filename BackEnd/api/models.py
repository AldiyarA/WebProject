from django.db import models


# Create your models here.
class Anime(models.Model):
    country = models.CharField(max_length=100, default='', blank=True, null=True)
    original_name = models.CharField(max_length=100, default='', blank=True, null=True)
    transcription = models.CharField(max_length=100, default='', blank=True, null=True)
    english_name = models.CharField(max_length=100, default='', blank=True, null=True)
    year = models.IntegerField(null=True, blank=True)
    company = models.CharField(max_length=100, default='', blank=True, null=True)
    author = models.CharField(max_length=100, default='', blank=True, null=True)
    description = models.TextField(max_length=10000, default='', blank=True, null=True)
    photo_url = models.CharField(max_length=200, default='', blank=True, null=True)

    def __str__(self):
        return f'ID-{self.pk} : {self.english_name}'


class Character(models.Model):
    original_name = models.CharField(max_length=100, default='', blank=True, null=True)
    english_name = models.CharField(max_length=100, default='', blank=True, null=True)
    alias = models.CharField(max_length=500, default='', blank=True, null=True)
    race = models.CharField(max_length=100, default='Human', blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    age = models.IntegerField(null=True, blank=True)
    description = models.TextField(max_length=10000, default='', blank=True, null=True)
    photo_url = models.CharField(max_length=200, default='', blank=True, null=True)

    def __str__(self):
        return f'ID-{self.pk} : {self.english_name}'


class AnimeCharacter(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='characters')
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='animes')

    def __str__(self):
        return f'ID-{self.pk} : {self.anime.english_name} - {self.character.english_name}'


class Genre(models.Model):
    name = models.CharField(max_length=100, default='', blank=True, null=True)
    description = models.TextField(max_length=10000, default='', blank=True, null=True)

    def __str__(self):
        return f'ID-{self.pk} : {self.name}'


class GenreAnime(models.Model):
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name='animes')
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, related_name='genres')

    def __str__(self):
        return f'ID-{self.pk} : {self.anime.english_name} - {self.genre.name}'


class Article(models.Model):
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE, null=True, related_name='articles', blank=True)
    character = models.ForeignKey(Character, on_delete=models.CASCADE, null=True, related_name='articles', blank=True)
    name = models.CharField(max_length=100, default='New article', blank=True, null=True)
    content = models.TextField(max_length=10000, default='Type here content', blank=True, null=True)

    def __str__(self):
        if self.anime:
            topic = self.anime.english_name
        else:
            topic = self.character.english_name
        return f'ID-{self.pk} : {topic} - {self.name} : Content length - {len(self.content)}'
