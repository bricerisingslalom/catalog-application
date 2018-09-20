podTemplate(
  label: 'deploy-agent',
  containers: [
    containerTemplate(
      name: 'helm-cli-slave',
      image: 'docker.io/bricerisingslalom/helm-cli:latest',
      ttyEnabled: true,
      command: 'cat',
      alwaysPullImage: true
    ),
    containerTemplate(
      name: 'aws-cli-slave',
      image: 'docker.io/bricerisingslalom/aws-cli:latest',
      ttyEnabled: true,
      command: 'cat',
      alwaysPullImage: true
    ),
    containerTemplate(
      name: 'jnlp',
      image: 'jenkins/jnlp-slave:3.10-1-alpine',
      args: '${computer.jnlpmac} ${computer.name}',
      envVars: [
        envVar(key: 'JENKINS_URL', value: 'http://jenkins:8080')
      ],
      alwaysPullImage: true
    )
  ]
){

  node('deploy-agent') {

    container('aws-cli-slave') {
      stage('download kubeconfig') {
        checkout scm
        sh 'aws s3 cp s3://eks-config-files/demo/kubeconfig.yaml .'
        stash includes: '**', name: 'scm'
      }
    }

    container('helm-cli-slave') {
      stage('install') {

        unstash 'scm'
        sh """
          export KUBECONFIG=`pwd`/kubeconfig.yaml
          cd products-service
          export PACKAGE_VERSION=\${jq -r ".version" < package.json}
          if [ -z `helm --tiller-namespace demo list | grep products-service` ]; then
            helm --namespace demo --tiller-namespace demo --name products-service install chart \
              --set productsservice.deployment.image=docker.io/bricerisingslalom/products-service:\${PACKAGE_VERSION}
          else
            helm --namespace demo --tiller-namespace demo upgrade products-service chart \
              --set productsservice.deployment.image=docker.io/bricerisingslalom/products-service:\${PACKAGE_VERSION}
          fi
        """

      }
    }
  }
}
