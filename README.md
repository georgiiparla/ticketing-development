# ms-boilerplate

**Ready starter boilerplate for a microservice app with OK auth service**

Content:

1. Docker & k8s for containerization, ingress-nginx to access k8s deployments from outer world.
2. Skaffold for deployments and services management
3. Routes implemented with express and express validator (routes folder)
4. Errors middleware (bottleneck for errors, middleware folder)
5. Custom errors (errors folder)
6. index.ts to launch server and apply routes, middlewares and so on
7. Password **salted hashing** (password.ts in services)
8. **Cookie session, jwt token**
9. **Secret keys** are available inside pod namespace (kubectl create generic secret jwt-secret --from-literal=JWT_KEY=admin)