# ShopKart – Cloud-Native E-Commerce Application

## 1. Project Overview

ShopKart is a cloud-native e-commerce application developed as a DevOps and Kubernetes project.

The project demonstrates the complete containerization and Kubernetes deployment workflow using Docker, Minikube, Amazon ECR, Amazon EKS, and AWS Fargate.

The application provides basic product and order APIs and is designed to demonstrate how a containerized application can be deployed and managed using Kubernetes.

---

## 2. Objectives

The main objectives of this project are:

- Develop a simple e-commerce application.
- Containerize the application using Docker.
- Deploy the application on local Kubernetes using Minikube.
- Verify Kubernetes deployment and service communication.
- Push the Docker image to Amazon ECR.
- Create and configure an Amazon EKS cluster.
- Deploy the application on Amazon EKS using AWS Fargate.
- Expose the application using a Kubernetes LoadBalancer Service.
- Demonstrate Kubernetes self-healing and scaling concepts.
- Document the complete DevOps workflow.

---

## 3. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Application development |
| Flask | Backend REST API |
| Docker | Application containerization |
| Kubernetes | Container orchestration |
| Minikube | Local Kubernetes environment |
| kubectl | Kubernetes command-line management |
| Amazon ECR | Docker image registry |
| Amazon EKS | Managed Kubernetes cluster |
| AWS Fargate | Serverless compute for Kubernetes workloads |
| Git | Version control |
| GitHub | Source code hosting |

---

## 4. Application Features

ShopKart provides the following APIs:

### Application endpoint

```text
GET /
