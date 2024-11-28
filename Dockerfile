FROM php:8.2-fpm

# set your user name, ex: user=carlos
ARG user=yourusername
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libicu-dev \
    libpq-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libmcrypt-dev \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    autoconf \
    && docker-php-ext-install pdo_mysql\
    && docker-php-ext-install zip \
    && docker-php-ext-enable pdo_mysql

RUN apt update

RUN apt install -y nodejs
# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP extensions (including pdo_mysql)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd pdo pdo_mysql intl

    
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Install redis
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www

# Copy custom configurations PHP
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

USER root
