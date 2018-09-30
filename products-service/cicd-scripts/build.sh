cd products-service
./build.sh
export PRODUCTS_PACKAGE_VERSION=`jq -r ".version" < package.json`
docker tag products-service:latest docker.io/bricerisingslalom/products-service:$PRODUCTS_PACKAGE_VERSION
docker push docker.io/bricerisingslalom/products-service:$PRODUCTS_PACKAGE_VERSION
cd -