podTemplate(label: 'docker-slave',
  containers: [
    containerTemplate(
      name: 'docker-slave-container',
      image: 'docker:18.05.0-ce',
      ttyEnabled: true,
      command: 'cat'
    ),
    containerTemplate(
      name: 'jnlp',
      image: 'jenkins/jnlp-slave:3.10-1-alpine',
      args: '${computer.jnlpmac} ${computer.name}',
      envVars: [
        envVar(key: 'JENKINS_URL', value: 'http://jenkins:8080')
      ])
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
  ]
) {

  node('docker-slave') {

    container('docker-slave-container') {
      stage("checkout") {
        checkout scm
      }

      stage("build") {
        sh 'cd catalog-service ; ./build.sh --no-cache'

      }

      stage("push") {

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DOCKER_REGISTRY_CREDS',
          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
          sh """
            PACKAGE_VERSION=${jq -r ".version" < package.json}
            docker tag catalog-service:latest docker.io/bricerisingslalom/catalog-service:${PACKAGE_VERSION}
            docker login -u $USERNAME -p $PASSWORD
            docker push docker.io/bricerisingslalom/catalog-service:${PACKAGE_VERSION}
          """
        }
      }
    }
  }
}