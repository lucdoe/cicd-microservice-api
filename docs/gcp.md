```bash
docker build -t lucdoe/express-api .

docker push lucdoe/express-api

source /Users/lucdoe/google-cloud-sdk/completion.zsh.inc
source /Users/lucdoe/google-cloud-sdk/path.zsh.inc

gcloud auth login

gcloud config set project express-kubernetes-384308

gcloud container clusters create express-microservices --region europe-west3 --num-nodes 1

gcloud container clusters get-credentials express-microservices --region europe-west3

kubectl create namespace express-microservices-ns

kubectl create secret docker-registry my-secret --docker-server=https://index.docker.io/v1/ --docker-username=lucdoe --docker-password=dckr_pat_t_yCeA6Rx2SvOPD4Uz2yCbQG2Yo --docker-email=lucca.doerrstein@code.berlin -n express-microservices-ns

kubectl apply -f cert-manager.crds.yaml -n express-microservices-ns

helm dependency build

helm install release1 . -n express-microservices-ns

helm upgrade release1 . -n express-microservices-ns

kubectl get ingress -l app.kubernetes.io/instance=release1
```
