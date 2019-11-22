FROM nginx:alpine

RUN apt-get update && apt-get install -y \
    git

WORKDIR /tmp

RUN git clone https://github.com/sevilcoskun/FirstJSProject.git
RUN cd FirstJSProject

COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
