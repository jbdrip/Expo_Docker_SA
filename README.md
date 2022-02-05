# Expo_Docker_SA

## About
Exposicion SA en la que se implemntó una arquitectura en Docker y Docker-Compose.

## Tabla de Contenido

> * [Proyecto](#practica-4)
>   * [About ](#about)
>   * [Tabla de contenido](#tabla-de-contenido)
>   * [Entorno de desarrollo](#entorno-de-desarrollo)
>   * [Instalacion](#instalacion)
>   * [Docker](#docker)
>   * [Docker Compose](#docker-compose)
>   * [Recursos](#recursos)
>   * [Contribuidores](#contribuidores)
>   * [Licencia](#licencia)

## Entorno de desarrollo
### Herramientas y software
|Nombre|Version
|--|--|
|Docker|19.03
|Docker Compose|19.03
|Python|3.7

### Recursos del sistema
* **Sistema Operativo:** Windows 10 Pro
* **Memoria RAM:** 8 GB 
* **Procesador:** Intel Core i7 7th Generacion

## Instalación
- [Instalacion Docker](https://docs.docker.com/docker-for-windows/install/)
- [Instalacion Docker Compose](https://docs.docker.com/compose/install/)

## Docker
A continuación se describen los archivos Dockerfile utilizados en la arquitectura.

### Frontend
Para el desarrollo del frontend se utiliza una imagen de nginx con base alpine, se expone el puerto 80 y se copia la pagina web generada por angular a la carpeta que será expuesta en Nginx.

```docker
FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/Practica4 /usr/share/nginx/html
```
### Servers
Para los servidores se utiliza una imagen de python en su version 3, se define un espacio de trabajo y se copia el archivo para la instalacion de librerias de pytthon. Se isnstalan las librerias y por ultimo se corre un comando en consola que se encarga de levantar el servidor.

```docker
FROM python:3
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python3 -m pip install --user --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```
## Docker Compose
En este archivo se configuran todos los contenedores, redes y volumenes que se utilizaran en la arquitectura. El archivo se divide en cinco secciones.

### Fronend
Crea un contenedor de la pagina web de la arquitectura y utiliza Nginx como servidor web. Expone el puerto 80 y utiliza la red red-frontend.
```yml
  frontend:
    build: './frontend'
    ports:
      - '80:80'
    networks:
      - red-frontend
```

### Servidores
Expone 2 servidores desarrollados en Python en el puerto 3000, 3001 respectivamente. Estos utilizan dos redes, red-backend y red-db para conectarse con la base de datos.
```yml
  server_a:
    build: './servers/serverA'
    ports:
      - '3000'
    networks:
      - red-backend
      - red-db
  server_b:
    build: './servers/serverB'
    ports:
      - '3001'
    networks:
      - red-backend
      - red-db
    networks:
      - red-backend
      - red-db
```

### Balanceador de Carga
Balanceador de carga del sistema utilizando Nginx. Expone el puerto 5000 y se conecta con la red-backend y red-frontend para realizar el balanceo respectivo.
```yml
  nginx:
    image: nginx:latest
    volumes:
      - ./load-balancer/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - server_a
      - server_b
    ports:
      - "5000:5000"
    networks:
      - red-backend
      - red-frontend
```

### Base de datos
Contenedor encargado de el manejo de la base de datos y su exposición a través del puerto 27017, este contenedor utiliza la red red-db.
```yml
  db:
    image: 'mongo'
    container_name: 'db_sa'
    environment:
      - MONGO_INITDB_DATABASE=db_sa
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin
    volumes: 
      - ./database/init-mongo.js:/docker-entrypoint-initdb.d/init/mongo.js:ro
      - ./database/mongo-volume:/data/db
    ports:
      - '27017'
    networks:
      - red-db
```

### Network 
Aqui se definen las 3 redes a utilizar en la arquitectura.
```yml
networks:
  red-frontend:
    driver: bridge 
  red-backend:
    driver: bridge 
  red-db:
    driver: bridge 
```
## Recursos
- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Contribuidores
 <table>
  <tr>
    <td align="center"><a href="https://github.com/jbdrip"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/36654520?v=4" width="100px;" alt=""/><br /><sub><b>Javier Bran - 201730555</b></sub></a></td>
</table>

## Licencia
Todos los derechos reservados