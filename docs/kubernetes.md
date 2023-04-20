A Kubernetes setup for deploying an Express.js application along with MongoDB, Redis, and Ingress. Here's a summary of the steps and configurations implemented:

## Chart

1. **Express.js Application**: Created a Dockerfile to containerize the Express.js application and pushed the image to Docker Hub.

2. **Helm Chart**: Created a Helm chart for the Express.js application to simplify the deployment process and manage related resources. The chart includes the following files:

- **Chart.yaml**: Defines chart metadata, dependencies, and versioning.
- **values.yaml**: Configures default values for the chart's templates.
- **templates/**: Folder containing the following Kubernetes resource templates:
  - **deployment.yaml**: Defines a Deployment for the Express.js application.
  - **service.yaml**: Defines a Service to expose the Express.js application within the cluster.
  - **ingress.yaml**: Defines an Ingress resource to expose the application externally with TLS enabled.
  - **networkpolicy.yaml**: Defines Network Policies to restrict communication between pods and services in the cluster.
  - **serviceaccount.yaml**: Defines a ServiceAccount for the Express.js application.
  - **role.yaml**: Defines a Role for the Express.js application, specifying allowed permissions.
  - **rolebinding.yaml**: Binds the Role to the ServiceAccount.
- **\_helpers.tpl**: Contains helper functions to generate naming conventions and labels for the chart resources.
- **MongoDB and Redis**: Added MongoDB and Redis as dependencies in the Chart.yaml file and configured them to use authentication and persistent storage in the values.yaml file.

3. **Ingress and HTTPS**: Configured an Ingress resource with TLS to expose the Express.js application to the internet securely.

4. **Securing the Setup**: Implemented several best practices to secure the Kubernetes setup:

- Network Policies to restrict pod and service communication.
- Authentication for MongoDB, Redis.
- TLS for secure communication.
- Role-Based Access Control (RBAC) for access management within the cluster.
- Running containers as non-root users.
- Setting resource limits and requests.
- Configuring liveness and readiness probes.

## \_helpers.tpl

When working with Helm charts, you might find yourself repeating certain patterns or using the same snippets of code in different template files. Instead of copying and pasting these snippets throughout the chart, you can define them in the \_helpers.tpl file and then reference them in other templates using the include function.

Here's a brief explanation of the common definitions in the \_helpers.tpl file:

- **express-api.name**: This function either returns the value of .Values.nameOverride (if it's set) or the default chart name. It helps to create a consistent naming convention for resources in the chart.

- **express-api.fullname**: This function generates a fully qualified name for the chart, which consists of the release name and the chart name. If .Values.fullnameOverride is set, it uses that value instead. This ensures a unique name for resources in the chart.

- **express-api.chart**: This function combines the chart name and version to create a string that is used as a label in Kubernetes resources.

- **express-api.labels**: This function generates a set of common labels for Kubernetes resources created by the chart. These labels are used for various purposes, such as filtering and identifying resources.

- **express-api.selectorLabels**: This function generates a set of selector labels, which are used in Kubernetes resources like services, deployments, and replica sets to select the appropriate pods.
