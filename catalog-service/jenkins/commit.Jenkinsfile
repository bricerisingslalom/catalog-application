node {

  stage("checkout") {
    checkout scm
  }

  stage("build") {
    sh './build.sh --no-cache'
  }

  stage("push") {

    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_REGISTRY_CREDS',
      usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
      sh """
        docker tag catalog-service:latest docker.io/bricerisingslalom/catalog-service:latest
        docker login -u $USERNAME -p $PASSWORD
        docker push docker.io/bricerisingslalom/catalog-service:latest
      """

    }
  }
}