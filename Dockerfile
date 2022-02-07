FROM registry.cn-shanghai.aliyuncs.com/jkhhuse-plan/plan:nginx

# 复制到指定目录
COPY    dist    /usr/share/nginx/dist/
