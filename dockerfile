# Etapa de construcción
FROM node:18 AS builder
WORKDIR /app

# Copia los archivos de configuración y de dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Ejecuta el script de construcción de la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Asegúrate de copiar el directorio src/assets/images si es necesario
COPY --from=builder /app/src/assets/images /usr/share/nginx/html/src/assets/images

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
