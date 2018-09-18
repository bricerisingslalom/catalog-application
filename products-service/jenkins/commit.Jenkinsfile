node {

  stage("checkout") {
    checkout scm
  }

  stage("build") {
    sh 'cd products-service ; ./build.sh --no-cache'
  }

  stage("push") {

    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_REGISTRY_CREDS',
      usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
      sh """
        docker tag products-service:latest docker.io/bricerisingslalom/products-service:latest
        docker login -u $USERNAME -p $PASSWORD
        docker push docker.io/bricerisingslalom/products-service:latest
      """

    }
  }
}