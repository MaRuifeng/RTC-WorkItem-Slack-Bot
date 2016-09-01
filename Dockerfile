# Dockerfile for RTC work item slack bot
#
# VERSION 0.0.4
# AUTHOR  Ruifeng Ma (ruifengm@sg.ibm.com)

# This file creates a container from the node.js 
# base image and runs a service as a slack bot 
# to post work item information when its number is mentioned
# in messaging channels.


FROM node:0.12.9-wheezy
MAINTAINER Ruifeng Ma "ruifengm@sg.ibm.com"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Set up parameters as environment variables
# Crendentials like RTC user password, slack bot token and slack webhook should be stored locally and 
# accessed by the docker container through data volume
ENV RTC_REPO https://ratsuite192.sby.ibm.com:9443/ccm
ENV RTC_USER bpmbuild@sg.ibm.com
ENV RTC_ERROR_CHANNEL rtc_test
ENV JENKINS_HOST https://itaas-build.sby.ibm.com
ENV JENKINS_PORT 9443

ENV WIBOT_VERSION 0.0.4

EXPOSE 8080
CMD [ "node", "rtc.js" ]