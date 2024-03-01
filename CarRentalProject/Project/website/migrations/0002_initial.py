# Generated by Django 5.0.2 on 2024-02-27 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('adress', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=50)),
                ('car_model', models.CharField(max_length=50)),
                ('car_type', models.CharField(max_length=50)),
                ('car_color', models.CharField(max_length=50)),
                ('car_transmission', models.CharField(max_length=50)),
                ('fuel_type', models.CharField(max_length=50)),
                ('number_of_seats', models.CharField(max_length=50)),
            ],
        ),
    ]
