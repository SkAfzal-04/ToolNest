# Use official Node.js image
FROM node:18

# Install Python, pip, ffmpeg, and yt-dlp
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install yt-dlp

# Create app directory
WORKDIR /app

# Copy all project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Create the downloads folder (if needed)
RUN mkdir -p downloads

# Expose your app's port (adjust if different)
EXPOSE 3000

# Start the app using your dev script
CMD ["npm", "run", "dev"]
