cd products-service
export PACKAGE_VERSION=`jq -r ".version" < package.json`
if [ -z `helm --tiller-namespace demo list | grep products-service` ]; then
  helm --namespace demo --tiller-namespace demo --name products-service install chart \
    --set productsservice.deployment.image=docker.io/bricerisingslalom/products-service:\$PACKAGE_VERSION
else
  helm --namespace demo --tiller-namespace demo upgrade products-service chart \
    --set productsservice.deployment.image=docker.io/bricerisingslalom/products-service:\$PACKAGE_VERSION
fi
cd -