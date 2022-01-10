FROM nginx:latest

# 复制到指定目录
COPY    dist    /usr/share/nginx/dist/
