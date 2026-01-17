# Imagen 
FROM node:22-alpine

# Directorio dentro de contenedor
WORKDIR /app

# Copia de package.json y package-lock.json
COPY package*.json ./

# Instalación de dependencias
RUN npm install

# Copia del proyecto
COPY . .

# Puerto expuesto
EXPOSE 3000

# Comando par iniciar el API
CMD ["npm", "start"]

