podTemplate(label: 'docker-slave',
  containers: [
    containerTemplate(
      name: 'docker-slave-container',
      image: 'docker:18.05.0-ce',
      ttyEnabled: true,
      command: 'cat'
      //image: 'jenkins/jnlp-slave'
      
    )
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
  ]
) {

  node('docker-slave') {

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
}