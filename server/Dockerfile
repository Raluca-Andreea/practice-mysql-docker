# base image
FROM node:latest
# set working directory
WORKDIR /app
# WORKDIR /usr/src/app
# add '/app/node_modules/.bin:$PATH' to $PATH
ENV PATH /app/node_modules/.bin:$PATH   
# ENV PATH /usr/src/app/node_modules/.bin:$PATH 
# install and cache app dependencies
# Although ADD and COPY are functionally similar, generally speaking, COPY is preferred. That’s because it’s more transparent than ADD. COPY only supports the basic copying of local files into the container, while ADD has some features (like local-only tar extraction and remote URL support) that are not immediately obvious. Consequently, the best use for ADD is local tar file auto-extraction into the image, as in ADD rootfs.tar.xz /.
COPY package*.json /app/ 
# COPY package.json /usr/src/app/package.json
# COPY package-lock.json /usr/src/app/package-lock.json
# npm install react-scripts@3.0.1 -g
RUN ls -al
RUN npm install
COPY ./ /app
EXPOSE 5000
RUN ls -al
CMD ["npm","start"]