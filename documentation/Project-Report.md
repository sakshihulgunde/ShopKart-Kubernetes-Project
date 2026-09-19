# ShopKart – Cloud-Native E-Commerce Application

## 1. Introduction

ShopKart is a cloud-native e-commerce application developed as a DevOps and Kubernetes mini-project.

The project demonstrates how a web application can be developed, containerized using Docker, deployed using Kubernetes, stored in Amazon Elastic Container Registry (ECR), and tested on Amazon Elastic Kubernetes Service (EKS) using AWS Fargate.

The application consists of a frontend web interface and a Flask-based REST API backend. Users can view products, search products, add products to a shopping cart, modify cart quantities, proceed through checkout, and place a demo order.

The project follows a practical cloud-native deployment workflow:

```text
Frontend + Flask API
        ↓
Docker Container
        ↓
Kubernetes / Minikube
        ↓
Amazon ECR
        ↓
Amazon EKS
        ↓
AWS Fargate
```

---

# 2. Problem Statement

Traditional application deployment can require manual configuration of servers, application dependencies, networking, and scaling.

The purpose of this project is to demonstrate a containerized and Kubernetes-based deployment model where:

* The application is packaged consistently using Docker.
* Kubernetes manages application Pods.
* Multiple replicas provide application availability.
* Kubernetes automatically replaces failed Pods.
* Amazon ECR stores container images.
* Amazon EKS provides managed Kubernetes.
* AWS Fargate provides serverless compute for Kubernetes workloads.

---

# 3. Project Objectives

The main objectives of the ShopKart project are:

1. Develop a simple e-commerce application.
2. Create a frontend using HTML, CSS, and JavaScript.
3. Develop REST APIs using Python Flask.
4. Containerize the application using Docker.
5. Deploy the application using Kubernetes.
6. Use Minikube for local Kubernetes testing.
7. Demonstrate Kubernetes Deployments and Services.
8. Demonstrate Kubernetes self-healing.
9. Store the Docker image in Amazon ECR.
10. Deploy and test the application on Amazon EKS.
11. Run Kubernetes workloads using AWS Fargate.
12. Understand the complete DevOps deployment workflow.
13. Practice Git and GitHub for source-code management.

---

# 4. Technology Stack

## 4.1 Frontend

* HTML5
* CSS3
* JavaScript

## 4.2 Backend

* Python
* Flask
* Flask-CORS
* REST API

## 4.3 Containerization

* Docker

## 4.4 Kubernetes

* Kubernetes
* kubectl
* Minikube

## 4.5 AWS Services

* Amazon EC2
* Amazon Elastic Container Registry (ECR)
* Amazon Elastic Kubernetes Service (EKS)
* AWS Fargate

## 4.6 Version Control

* Git
* GitHub

---

# 5. System Architecture

The ShopKart architecture consists of the application layer, container layer, Kubernetes layer, and AWS cloud layer.

```text
                         USER
                           |
                           v
                 +-------------------+
                 | ShopKart Frontend |
                 | HTML/CSS/JS       |
                 +-------------------+
                           |
                           v
                 +-------------------+
                 | Flask REST API    |
                 | Python Backend    |
                 +-------------------+
                           |
                           v
                 +-------------------+
                 | Docker Container  |
                 +-------------------+
                           |
                +----------+----------+
                |                     |
                v                     v
        +---------------+     +---------------+
        |   Minikube    |     | Amazon ECR    |
        | Local K8s     |     | Docker Image  |
        +---------------+     +---------------+
                                      |
                                      v
                              +---------------+
                              | Amazon EKS    |
                              +---------------+
                                      |
                                      v
                              +---------------+
                              | AWS Fargate   |
                              +---------------+
                                      |
                                      v
                              ShopKart Service
```

---

# 6. Application Components

## 6.1 Frontend

The ShopKart frontend provides the user interface for the e-commerce application.

The frontend includes:

* Home page
* Product listing
* Product categories
* Product search
* Product details
* Shopping cart
* Quantity controls
* Remove-from-cart functionality
* Checkout form
* Demo login interface
* Order placement

The frontend files are:

```text
frontend/
├── index.html
├── styles.css
└── app.js
```

---

## 6.2 Backend

The backend is implemented using Python Flask.

The main backend file is:

```text
backend/app.py
```

The backend provides REST API endpoints.

### Health endpoint

```text
GET /health
```

Example:

```bash
curl http://localhost:5000/health
```

### Product endpoint

```text
GET /api/products
```

Example:

```bash
curl http://localhost:5000/api/products
```

### Individual product endpoint

```text
GET /api/products/<product_id>
```

### Order endpoint

```text
POST /api/orders
```

The backend also serves the frontend application.

---

# 7. Application Features

The application contains four sample products.

| Product     | Category    |   Price |
| ----------- | ----------- | ------: |
| Laptop      | Electronics | ₹55,000 |
| Smartphone  | Electronics | ₹25,000 |
| Headphones  | Accessories |  ₹2,500 |
| Smart Watch | Wearables   |  ₹4,500 |

The application allows users to:

* Browse products.
* Search products.
* View product details.
* Add products to the cart.
* Increase or decrease quantities.
* Remove products.
* Enter checkout information.
* Place a demo order.

---

# 8. Docker Containerization

Docker is used to package the ShopKart application and its dependencies into a portable container image.

The Dockerfile is located at:

```text
backend/Dockerfile
```

The Docker image contains:

* Python runtime
* Flask
* Flask-CORS
* Backend application
* Frontend files

The application exposes port:

```text
5000
```

## Docker Build

From the project root:

```bash
docker build -t shopkart:2.0 -f backend/Dockerfile .
```

## Check Docker Image

```bash
docker images
```

## Run Docker Container

```bash
docker run -d \
  --name shopkart-container \
  -p 5000:5000 \
  shopkart:2.0
```

## Check Running Container

```bash
docker ps
```

## Test Application

```bash
curl http://localhost:5000/
```

The application can also be opened from a browser using:

```text
http://EC2_PUBLIC_IP:5000
```

The ShopKart website was successfully tested in the browser.

---

# 9. Docker Troubleshooting

During development, the application initially returned HTTP 404 when the root URL was accessed.

The frontend files were correctly copied into the Docker image, but the Flask application calculated the frontend directory incorrectly inside the container.

The original path calculation used the parent directory of the application directory.

The path was corrected so that Flask uses:

```text
/app/frontend
```

After rebuilding the Docker image and replacing the old container, the application returned:

```text
HTTP/1.1 200 OK
```

The product API also returned the expected product data.

This demonstrated the importance of checking application paths inside Docker containers.

---

# 10. Kubernetes with Minikube

Minikube was used to create a local Kubernetes environment.

Minikube was started using the Docker driver:

```bash
minikube start --driver=docker
```

The Kubernetes nodes were checked using:

```bash
kubectl get nodes
```

The ShopKart application was deployed using a Kubernetes Deployment.

---

# 11. Kubernetes Deployment

The ShopKart Deployment is defined in:

```text
kubernetes/shopkart.yaml
```

The Deployment uses two replicas.

```yaml
replicas: 2
```

This means Kubernetes attempts to maintain two running ShopKart Pods.

The Pods can be checked using:

```bash
kubectl get pods
```

The Deployment can be checked using:

```bash
kubectl get deployments
```

---

# 12. Kubernetes Service

A Kubernetes Service is used to expose the ShopKart application.

The local Kubernetes configuration uses:

```text
Service Type: NodePort
```

The service can be checked using:

```bash
kubectl get services
```

The Minikube service URL can be obtained using:

```bash
minikube service shopkart-service --url
```

The Service forwards incoming traffic to the ShopKart Pods.

---

# 13. Kubernetes Self-Healing

One of the important Kubernetes features demonstrated in this project is self-healing.

The ShopKart Deployment maintains two replicas.

First, the running Pods are checked:

```bash
kubectl get pods
```

One ShopKart Pod was manually deleted:

```bash
kubectl delete pod POD_NAME
```

Kubernetes detected that the number of running replicas was below the desired count.

The Kubernetes Deployment controller automatically created a replacement Pod.

The result was again two running ShopKart Pods.

This demonstrates Kubernetes self-healing.

---

# 14. Amazon Elastic Container Registry

Amazon ECR was used to store the ShopKart Docker image.

AWS Region:

```text
ap-south-1
```

ECR repository:

```text
shopkart
```

The application image was tagged with a version number.

Current application version:

```text
shopkart:2.0
```

## ECR Authentication

```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS \
--password-stdin 452183714498.dkr.ecr.ap-south-1.amazonaws.com
```

## Tag Docker Image

```bash
docker tag shopkart:2.0 \
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

## Push Image

```bash
docker push \
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

## Verify ECR

```bash
aws ecr describe-images \
--repository-name shopkart \
--region ap-south-1
```

A new image version is used so that the updated frontend is not confused with the earlier API-only image.

---

# 15. Amazon EKS

Amazon Elastic Kubernetes Service was used to test the ShopKart application in a managed Kubernetes environment.

The EKS cluster was created in:

```text
ap-south-1
```

The application was deployed using the Docker image stored in Amazon ECR.

The EKS deployment used:

```text
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

The Kubernetes Deployment used multiple replicas.

The Kubernetes Service was configured as:

```text
type: LoadBalancer
```

This allows AWS to provide an external load-balancing layer for the application Service.

---

# 16. AWS Fargate

AWS Fargate was used as the compute environment for Kubernetes workloads in the EKS deployment.

The architecture was:

```text
Amazon ECR
     |
     v
Amazon EKS
     |
     v
AWS Fargate
     |
     v
ShopKart Pods
     |
     v
Kubernetes Service
```

The application Pods were successfully observed running on Fargate during the EKS testing phase.

Internal communication between the Kubernetes Service and ShopKart Pods was also verified.

---

# 17. EKS Service Verification

The Kubernetes Service was checked using:

```bash
kubectl get services
```

The application endpoints were checked using:

```bash
kubectl get endpoints
```

The application Pods were checked using:

```bash
kubectl get pods
```

Internal Service-to-Pod communication was tested using a temporary curl Pod.

The test confirmed that:

```text
ShopKart Service
       ↓
ShopKart Pod
       ↓
Flask Application
```

was functioning correctly inside the Kubernetes cluster.

---

# 18. Testing and Verification

Testing was performed at multiple stages.

## 18.1 Flask Health Test

```bash
curl http://localhost:5000/health
```

Expected result:

```json
{
  "status": "healthy"
}
```

## 18.2 Product API Test

```bash
curl http://localhost:5000/api/products
```

The API returned the configured ShopKart products.

## 18.3 Frontend Test

```bash
curl -I http://localhost:5000/
```

Expected result:

```text
HTTP/1.1 200 OK
```

The ShopKart website was also successfully opened in a browser.

## 18.4 Docker Test

```bash
docker ps
```

The ShopKart container was confirmed to be running.

## 18.5 Kubernetes Test

```bash
kubectl get pods
```

Two ShopKart replicas were observed during the Minikube deployment.

## 18.6 Self-Healing Test

A running ShopKart Pod was deleted.

Kubernetes automatically created a replacement Pod.

## 18.7 ECR Test

The Docker image was pushed to Amazon ECR and verified using AWS CLI.

## 18.8 EKS Test

The ShopKart application was deployed to EKS and the Pods were observed running on AWS Fargate.

---

# 19. Challenges and Troubleshooting

Several practical challenges were encountered during the project.

## Challenge 1 – Dockerfile Location

The Dockerfile was located inside the backend directory.

The following command initially failed when executed from the project root:

```bash
docker build -t shopkart:1.0 .
```

The correct command was:

```bash
docker build -t shopkart:2.0 -f backend/Dockerfile .
```

---

## Challenge 2 – Frontend HTTP 404

The Flask root route initially returned HTTP 404 from inside the Docker container.

The issue was caused by an incorrect frontend directory path.

After correcting the path and rebuilding the image, the root endpoint returned:

```text
HTTP/1.1 200 OK
```

---

## Challenge 3 – Kubernetes Self-Healing

A Pod was manually deleted to understand Kubernetes recovery behavior.

The Deployment controller automatically created a replacement Pod.

This confirmed that the desired replica state was maintained.

---

## Challenge 4 – EKS Load Balancer Verification

During EKS testing, internal communication between the Kubernetes Service and application Pods was verified successfully.

The external LoadBalancer access was not used as the primary verification method.

The EKS resources were later deleted as part of AWS cost management.

---

# 20. AWS Cost Management

AWS infrastructure can generate charges while resources are running.

Because the project was developed for learning and demonstration purposes, AWS resources were used carefully.

Cost-control measures included:

* Using appropriate small configurations during testing.
* Avoiding unnecessary long-running AWS infrastructure.
* Testing EKS only when required.
* Deleting the EKS environment after testing.
* Avoiding unnecessary AWS resources after the test.

The EKS environment was not kept running continuously after the testing phase.

---

# 21. GitHub Repository

The project source code is maintained using Git and GitHub.

Repository:

```text
https://github.com/sakshihulgunde/ShopKart-Kubernetes-Project
```

Git is used to track:

* Application source code
* Docker configuration
* Kubernetes manifests
* Documentation
* Project README
* Frontend files
* Backend files

---

# 22. Project Structure

```text
ShopKart-Kubernetes-Project/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── kubernetes/
│   ├── shopkart.yaml
│   └── shopkart-eks.yaml
│
├── screenshots/
│
├── documentation/
│   └── Project-Report.md
│
├── .gitignore
└── README.md
```

---

# 23. Learning Outcomes

This project provided practical experience with:

* Linux commands
* Python Flask
* REST APIs
* HTML
* CSS
* JavaScript
* Docker
* Docker images
* Docker containers
* Kubernetes Pods
* Kubernetes Deployments
* Kubernetes Services
* NodePort
* LoadBalancer
* Kubernetes self-healing
* Minikube
* kubectl
* Amazon ECR
* Amazon EKS
* AWS Fargate
* Git
* GitHub
* Cloud-native application deployment
* AWS resource management

---

# 24. Future Scope

The ShopKart application can be extended with additional cloud-native and DevOps capabilities.

Possible future improvements include:

* User authentication
* Database integration
* Persistent product storage
* Product inventory
* Real order management
* Payment gateway integration
* Kubernetes Ingress
* HTTPS/TLS
* Horizontal Pod Autoscaling
* Prometheus monitoring
* Grafana dashboards
* Centralized logging
* CI/CD using Jenkins
* GitHub Actions
* Infrastructure as Code using Terraform
* AWS database integration
* Microservices architecture

---

# 25. Conclusion

The ShopKart project demonstrates the practical transformation of a web application into a containerized and Kubernetes-based cloud-native application.

The project began with a Flask REST API and frontend application. Docker was then used to package the application into a container image. Kubernetes with Minikube was used for local deployment, including Deployments, Services, replicas, and self-healing.

The Docker image was stored in Amazon ECR and the application was subsequently tested using Amazon EKS with AWS Fargate.

The project provided practical exposure to the complete DevOps workflow:

```text
Develop
   ↓
Build
   ↓
Containerize
   ↓
Deploy
   ↓
Test
   ↓
Manage
```

Overall, ShopKart demonstrates practical knowledge of Docker, Kubernetes, AWS ECR, Amazon EKS, AWS Fargate, Git, and cloud-native application deployment.
EOF

````

### Step 2 — Verify the report

Run:

```bash
wc -l documentation/Project-Report.md
````

Then:

```bash
ls -lh documentation/Project-Report.md
```

And:

```bash
head -20 documentation/Project-Report.md
```

Finally:

```bash
git status
```

**Do not commit yet.**

Once this is saved, we'll do a final check of **README + Project Report**, then stage both together with the frontend and backend changes and push the finished project to GitHub.



