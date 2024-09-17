from django.db import models

class Message(models.Model):
    name = models.CharField(blank=True,null=True, max_length=255)
    phone = models.BigIntegerField(blank=True,null=True, default="+998")
    message = models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name
    
    