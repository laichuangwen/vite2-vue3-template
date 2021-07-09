FROM nginx:latest
EXPOSE 80

COPY dist/  /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo 'echo init ok!!'