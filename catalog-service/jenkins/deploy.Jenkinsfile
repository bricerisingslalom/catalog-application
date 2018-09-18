node {

    stage('checkout') {

        checkout scm
        sh "aws s3 cp s3://eks-config-files/demo/kubeconfig.yaml ."

    }

    stage('install') {

        sh """
            if [ -z `helm --tiller-namespace demo list | grep catalog-service` ]; then
                helm --namespace demo --tiller-namespace demo --name catalog-service install chart
            else
                helm --namespace demo --tiller-namespace demo upgrade catalog-service chart --recreate-pods
            fi
        """

    }

}
