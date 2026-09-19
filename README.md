# ShopKart – Cloud-Native E-Commerce Application

## 📌 Project Overview

**ShopKart** is a cloud-native e-commerce application developed to demonstrate practical DevOps and Kubernetes concepts.

The project contains a web-based shopping application with a frontend and Flask REST API backend. The application is containerized using Docker and deployed locally using Kubernetes with Minikube. The Docker image is stored in Amazon Elastic Container Registry (ECR), and the application was also tested on Amazon Elastic Kubernetes Service (EKS) using AWS Fargate.

The project demonstrates the complete workflow:

```text
Application Development
        ↓
Flask REST API + Frontend
        ↓
Docker Containerization
        ↓
Kubernetes / Minikube
        ↓
Amazon ECR
        ↓
Amazon EKS + AWS Fargate
```

---

## 🎯 Project Objectives

The main objectives of the ShopKart project are:

* Build a simple e-commerce web application.
* Develop a REST API using Flask.
* Create a responsive frontend using HTML, CSS and JavaScript.
* Containerize the application using Docker.
* Deploy the application using Kubernetes.
* Understand Kubernetes Deployments and Services.
* Demonstrate Kubernetes self-healing.
* Store the Docker image in Amazon ECR.
* Deploy and test the application on Amazon EKS.
* Understand AWS Fargate-based Kubernetes workloads.
* Gain practical experience with cloud-native DevOps workflows.

---

## 🛒 Application Features

ShopKart provides the following features:

* Home page
* Product listing
* Product categories
* Product search
* Product details
* Shopping cart
* Increase/decrease product quantity
* Remove products from cart
* Checkout form
* Demo login interface
* Order placement through REST API
* Responsive web interface

The current application contains sample products such as:

| Product     | Category    |   Price |
| ----------- | ----------- | ------: |
| Laptop      | Electronics | ₹55,000 |
| Smartphone  | Electronics | ₹25,000 |
| Headphones  | Accessories |  ₹2,500 |
| Smart Watch | Wearables   |  ₹4,500 |

---

## 🏗️ Application Architecture

```text
                         User
                          │
                          ▼
                  ShopKart Web UI
                 HTML/CSS/JavaScript
                          │
                          ▼
                  Flask REST API
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
      Product API                Order API
      /api/products              /api/orders
             │                         │
             └────────────┬────────────┘
                          ▼
                    Docker Image
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
          Minikube                   ECR
             │                         │
             │                         ▼
             │                  Amazon EKS
             │                         │
             │                      Fargate
             │                         │
             └─────────────────────────┘
```

---

## 🧰 Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* Flask-CORS
* REST API

### Containerization

* Docker

### Kubernetes

* Kubernetes
* kubectl
* Minikube

### AWS

* Amazon EC2
* Amazon ECR
* Amazon EKS
* AWS Fargate

### Version Control

* Git
* GitHub

---

## 📁 Project Structure

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

# 🚀 Application Setup

## 1. Clone the Repository

```bash
git clone https://github.com/sakshihulgunde/ShopKart-Kubernetes-Project.git
cd ShopKart-Kubernetes-Project
```

---

## 2. Run the Flask Application

Move into the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the application:

```bash
python app.py
```

The application runs on:

```text
http://localhost:5000
```

---

## 3. Test the Backend

### Health Check

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

### Product API

```bash
curl http://localhost:5000/api/products
```

The API returns the available ShopKart products.

---

# 🐳 Docker Containerization

The application is packaged into a Docker image.

From the project root:

```bash
cd ~/ShopKart-Kubernetes-Project
```

Build the Docker image:

```bash
docker build -t shopkart:2.0 -f backend/Dockerfile .
```

Verify the image:

```bash
docker images
```

Run the container:

```bash
docker run -d \
  --name shopkart-container \
  -p 5000:5000 \
  shopkart:2.0
```

Check the container:

```bash
docker ps
```

Test the application:

```bash
curl http://localhost:5000/
```

The browser application can be accessed using:

```text
http://EC2_PUBLIC_IP:5000
```

---

# ☸️ Kubernetes Deployment with Minikube

Minikube is used to run the ShopKart application locally on Kubernetes.

Start Minikube:

```bash
minikube start --driver=docker
```

Check the cluster:

```bash
kubectl get nodes
```

Load the ShopKart Docker image into Minikube:

```bash
minikube image load shopkart:2.0
```

Apply the Kubernetes configuration:

```bash
kubectl apply -f kubernetes/shopkart.yaml
```

Check the Deployment:

```bash
kubectl get deployments
```

Check the Pods:

```bash
kubectl get pods
```

The deployment uses two replicas:

```text
shopkart
replicas: 2
```

---

# 🔌 Kubernetes Service

ShopKart is exposed using a Kubernetes NodePort Service.

Check the service:

```bash
kubectl get services
```

Get the application URL:

```bash
minikube service shopkart-service --url
```

The returned URL can be used to access the application.

---

# ❤️ Kubernetes Self-Healing

Kubernetes provides self-healing through the Deployment controller.

The ShopKart application runs with two replicas.

Check the Pods:

```bash
kubectl get pods
```

Delete one running ShopKart pod:

```bash
kubectl delete pod POD_NAME
```

Check the Pods again:

```bash
kubectl get pods
```

Kubernetes automatically creates a replacement Pod to maintain the desired replica count.

This demonstrates Kubernetes self-healing.

---

# ☁️ Amazon ECR

Amazon Elastic Container Registry (ECR) is used to store the ShopKart Docker image.

AWS Region:

```text
ap-south-1
```

ECR repository:

```text
shopkart
```

Authenticate Docker with ECR:

```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS \
--password-stdin 452183714498.dkr.ecr.ap-south-1.amazonaws.com
```

Tag the image:

```bash
docker tag shopkart:2.0 \
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

Push the image:

```bash
docker push \
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

Verify images in ECR:

```bash
aws ecr describe-images \
--repository-name shopkart \
--region ap-south-1
```

---

# ☁️ Amazon EKS and AWS Fargate

The ShopKart application was also deployed and tested using Amazon Elastic Kubernetes Service (EKS).

The EKS environment used AWS Fargate for running Kubernetes workloads.

The deployment architecture was:

```text
ShopKart Docker Image
        ↓
Amazon ECR
        ↓
Amazon EKS
        ↓
AWS Fargate
        ↓
Kubernetes Deployment
        ↓
Kubernetes Service
        ↓
ShopKart Application
```

The EKS cluster used the `ap-south-1` AWS Region.

The EKS resources were subsequently deleted after testing to avoid unnecessary AWS charges.

---

# 📄 EKS Deployment Configuration

The EKS deployment uses the ShopKart image stored in ECR:

```text
452183714498.dkr.ecr.ap-south-1.amazonaws.com/shopkart:2.0
```

The Kubernetes Deployment is configured with two application replicas.

The Kubernetes Service uses:

```text
type: LoadBalancer
```

This allows AWS to provision an external load-balancing layer for the Kubernetes Service.

---

# 🧪 Testing and Verification

The application was tested at multiple stages.

### Flask

```bash
curl http://localhost:5000/health
```

Result:

```text
healthy
```

### REST API

```bash
curl http://localhost:5000/api/products
```

Result:

```text
Product data returned successfully
```

### Docker

```bash
docker ps
```

Result:

```text
ShopKart container running
```

### Browser

The Dockerized ShopKart application was successfully opened in a web browser using:

```text
http://EC2_PUBLIC_IP:5000
```

### Minikube

```bash
kubectl get pods
```

Result:

```text
2 ShopKart replicas running
```

### Kubernetes Self-Healing

A ShopKart Pod was deleted and Kubernetes automatically created a replacement Pod.

### Amazon ECR

The ShopKart Docker image was successfully stored in the ECR repository.

### Amazon EKS

The application was deployed and tested on EKS using AWS Fargate.

---

# 🔧 Troubleshooting

## Dockerfile Not Found

If Docker reports:

```text
Dockerfile: no such file or directory
```

because the Dockerfile is located inside `backend/`, use:

```bash
docker build -t shopkart:2.0 -f backend/Dockerfile .
```

---

## Frontend Returns 404

The Flask application serves the frontend from:

```text
/app/frontend
```

The frontend directory is configured in `app.py` using the directory containing the Flask application.

The application can be verified with:

```bash
curl -I http://localhost:5000/
```

Expected:

```text
HTTP/1.1 200 OK
```

---

## Kubernetes Pod Not Starting

Check:

```bash
kubectl get pods
```

Then:

```bash
kubectl describe pod POD_NAME
```

Check logs:

```bash
kubectl logs POD_NAME
```

---

# 💰 AWS Cost Management

AWS resources can generate charges when they are running.

During this project, AWS resource usage was monitored carefully.

Cost-control practices included:

* Using small instance/workload configurations where appropriate.
* Testing AWS resources only when required.
* Avoiding unnecessary long-running infrastructure.
* Deleting the EKS environment after testing.
* Avoiding unnecessary AWS resources after project completion.

The EKS environment is not intended to remain running continuously after the project demonstration.

---

# 📸 Screenshots

Project screenshots are maintained in the:

```text
screenshots/
```

directory.

Suggested screenshots include:

```text
01-flask-application.png
02-docker-image.png
03-docker-container.png
04-docker-api-test.png
05-minikube-pods.png
06-kubernetes-service.png
07-kubernetes-self-healing.png
08-ecr-repository.png
09-eks-cluster.png
10-fargate-pods.png
11-eks-service.png
12-application-verification.png
```

---

# 🎓 Learning Outcomes

Through this project, the following concepts were practiced:

* Flask REST API development
* Frontend and backend integration
* Docker image creation
* Docker containers
* Kubernetes Deployments
* Kubernetes Pods
* Kubernetes Services
* NodePort
* LoadBalancer
* Kubernetes self-healing
* Minikube
* kubectl
* Amazon ECR
* Amazon EKS
* AWS Fargate
* Git and GitHub
* Cloud-native application deployment
* AWS resource and cost management

---

# 🔮 Future Scope

The project can be extended with:

* User authentication
* Database integration
* Persistent product storage
* Payment integration
* Product inventory management
* Order database
* CI/CD using Jenkins or GitHub Actions
* Kubernetes Ingress
* HTTPS/TLS
* Monitoring using Prometheus and Grafana
* Centralized logging
* Auto Scaling
* Infrastructure as Code using Terraform

---

# 🏁 Conclusion

ShopKart demonstrates how a basic web application can be transformed into a containerized and Kubernetes-based cloud-native application.

The project covers the complete practical workflow from application development and Docker containerization to Kubernetes deployment, Amazon ECR, Amazon EKS, and AWS Fargate.

It provides hands-on experience with important DevOps and cloud technologies while also demonstrating Kubernetes concepts such as deployments, services, replicas, and self-healing.

---

## 👩‍💻 Author

**Sakshi Hulgunde**

GitHub:

`https://github.com/sakshihulgunde`

