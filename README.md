# Kubernetes-test-e2eCypress-apiSupertest

this is a test example for Kubernetes

For API testing, supertest has been used. To test api got to server directory and run "npm run test".

For e2e testing, cypress has been use which can be both tested locally or as a pod.

To run cypress locally, simply gor to e2e directory and either run "npm run cy:open" or "npm run cy:run"

To run cypress as a pod, you need to install skaffold, and ingress and the run "skaffld dev" in command line
