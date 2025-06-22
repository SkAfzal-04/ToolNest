FROM node:18

# Install Python, pip, and ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install yt-dlp --break-system-packages

# Create app directory
WORKDIR /app

# Copy project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Create downloads directory (if needed)
RUN mkdir -p downloads

# Expose backend port (change if needed)
EXPOSE 3000

# Start your app
CMD ["npm", "run", "dev"]
