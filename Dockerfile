FROM php:8.2-fpm

RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git curl unzip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql

RUN chown -R www-data:www-data /var/www/html

VOLUME /var/www/html

CMD ["php-fpm"]
EXPOSE 9000
