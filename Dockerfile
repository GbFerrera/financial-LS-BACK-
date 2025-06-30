FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Adicionar script de start ao package.json
RUN npm pkg set scripts.start="node src/server.js"

# Expor a porta (usar a variável PORT do Railway)
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
