FROM datarhei/restreamer:latest

# Optional: Set environment variables
ENV RS_USERNAME=admin
ENV RS_PASSWORD=admin
ENV TZ=Asia/Colombo

# Expose necessary ports
EXPOSE 8080 1935 8181

# Default command
CMD ["/restreamer"]
