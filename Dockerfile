FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    wget \
    gnupg2 \
    ca-certificates \
    x11vnc xvfb \
    xterm \
    fluxbox \
    obs-studio \
    pulseaudio \
    && apt-get clean

# Create user
RUN useradd -m obsuser
USER obsuser
WORKDIR /home/obsuser

# Start OBS and VNC on container start
CMD ["bash", "-c", "Xvfb :0 -screen 0 1920x1080x24 & x11vnc -display :0 -nopw -forever & fluxbox & obs"]
