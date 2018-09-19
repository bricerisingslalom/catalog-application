FROM alpine

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    && pip install awscli \
    && rm -rf /var/cache/apk/*

# Create aws user
RUN adduser -S -u 10000 jenkins
USER jenkins
