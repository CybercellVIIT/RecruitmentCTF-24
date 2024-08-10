# ---- Base Node ----
FROM node:22 AS base
WORKDIR /mnt/recruit-ctf/web/samarth-ghante/chall0
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies  
RUN npm install

# ---- Copy Files ----
FROM dependencies AS release  
WORKDIR /mnt/recruit-ctf/web/samarth-ghante/chall0
COPY . /mnt/recruit-ctf/web/samarth-ghante/chall0

# Install PM2 globally
RUN npm install -g pm2

EXPOSE 3000 # Update: Respective Port
CMD ["pm2-runtime", "start", "app.js"] # Update: Respective Script or Index.js File
