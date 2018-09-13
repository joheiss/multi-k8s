# build production images
docker build -t joheiss/multi-client:latest -t joheiss/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t joheiss/multi-server:latest -t joheiss/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t joheiss/multi-worker:latest -t joheiss/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

# push images to docker hub
docker push joheiss/multi-client:latest
docker push joheiss/multi-client:$GIT_SHA
docker push joheiss/multi-server:latest
docker push joheiss/multi-server:$GIT_SHA
docker push joheiss/multi-worker:latest
docker push joheiss/multi-worker:$GIT_SHA

# apply k8s configs
kubectl apply -f k8s

# set latest image on each deployment
kubectl set image deployment/client-deployment client=joheiss/multi-client:$GIT_SHA
kubectl set image deployment/server-deployment server=joheiss/multi-server:$GIT_SHA
kubectl set image deployment/worker-deployment worker=joheiss/multi-worker:$GIT_SHA
