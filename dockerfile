# 1. Use Node 18 image
FROM node:18

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files for layer caching
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Install nodemon globally
RUN npm install -g nodemon

# 6. Copy rest of the app code after deps are installed (for better layer caching)
COPY . .

# 7. Start the app using nodemon
CMD ["nodemon", "main.js"]
