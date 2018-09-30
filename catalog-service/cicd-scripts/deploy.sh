cd catalog-service
export PACKAGE_VERSION=`jq -r ".version" < package.json`
if [ -z `helm --tiller-namespace demo list | grep catalog-service` ]; then
  helm --namespace demo --tiller-namespace demo --name catalog-service install chart \
    --set catalogservice.deployment.image=docker.io/bricerisingslalom/catalog-service:\$PACKAGE_VERSION
else
  helm --namespace demo --tiller-namespace demo upgrade catalog-service chart \
    --set catalogservice.deployment.image=docker.io/bricerisingslalom/catalog-service:\$PACKAGE_VERSION
fi
cd -