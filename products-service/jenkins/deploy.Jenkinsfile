podTemplate(
  label: 'aws-cli-agent',
  containers: [
    containerTemplate(
      name: 'aws-cli-slave',
      image: 'docker.io/bricerisingslalom/aws-cli:latest',
      ttyEnabled: true,
      command: 'cat'
    ),
    containerTemplate(
      name: 'jnlp',
      image: 'jenkins/jnlp-slave:3.10-1-alpine',
      args: '${computer.jnlpmac} ${computer.name}',
      envVars: [
        envVar(key: 'JENKINS_URL', value: 'http://jenkins:8080')
      ]
    )
  ]
){

  node('aws-cli-agent') {
    container('aws-cli-slave') {
      stage('checkout') {
        checkout scm
        sh "aws s3 cp s3://eks-config-files/demo/kubeconfig.yaml ."
      }

      stage('install') {

        sh """
          if [ -z `helm --tiller-namespace demo list | grep products-service` ]; then
            helm --namespace demo --tiller-namespace demo --name products-service install chart
          else
            helm --namespace demo --tiller-namespace demo upgrade products-service chart --recreate-pods
          fi
        """

      }
    }
  }
}
