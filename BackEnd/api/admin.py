from django.contrib import admin

from .models import Anime, Character, AnimeCharacter, Genre, GenreAnime, Article

# Register your models here.
admin.site.register(Anime)
admin.site.register(Character)
admin.site.register(AnimeCharacter)
admin.site.register(Genre)
admin.site.register(GenreAnime)
admin.site.register(Article)
