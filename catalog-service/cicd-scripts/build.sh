cd catalog-service
./build.sh
export CATALOG_PACKAGE_VERSION=`jq -r ".version" < package.json`
docker tag catalog-service:latest docker.io/bricerisingslalom/catalog-service:$CATALOG_PACKAGE_VERSION
docker tag catalog-service:latest docker.io/bricerisingslalom/catalog-service:latest
docker push docker.io/bricerisingslalom/catalog-service:$CATALOG_PACKAGE_VERSION
docker push docker.io/bricerisingslalom/catalog-service:latest
cd -