# Kubernetes-test-e2eCypress-apiSupertest

This is a test example for Kubernetes

For API testing, supertest has been used. To test api go to server directory and run "npm run test".

For e2e testing, cypress has been used which can be tested both locally or as a pod.

To run cypress locally, simply go to e2e directory and either run "npm run cy:open" or "npm run cy:run"

To run cypress as a pod, you need to install skaffold, and ingress and the run "skaffld dev" in command line
