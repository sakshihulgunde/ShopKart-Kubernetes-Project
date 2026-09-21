pipeline {
    agent any

    environment {
        IMAGE_NAME = "shopkart"
        IMAGE_TAG = "1.0"
        FULL_IMAGE = "shopkart:1.0"
        K8S_MANIFEST = "kubernetes/shopkart.yaml"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo '=== Cloning ShopKart Repository ==='
                checkout scm
            }
        }

        stage('Verify Project') {
            steps {
                echo '=== Verifying Project Files ==='

                sh '''
                    echo "Current directory:"
                    pwd

                    echo "Project files:"
                    ls -la

                    echo "Backend files:"
                    ls -la backend

                    echo "Kubernetes files:"
                    ls -la kubernetes

                    test -f backend/Dockerfile
                    test -f backend/requirements.txt
                    test -f backend/app.py
                    test -f ${K8S_MANIFEST}

                    echo "All required files found."
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo '=== Building ShopKart Docker Image ==='

                sh '''
                    docker build \
                        -t ${FULL_IMAGE} \
                        -f backend/Dockerfile .
                '''
            }
        }

        stage('Docker Verify') {
            steps {
                echo '=== Verifying Docker Image ==='

                sh '''
                    docker images | grep shopkart

                    echo "Docker image created successfully."
                '''
            }
        }

        stage('Start Minikube') {
            steps {
                echo '=== Starting Minikube ==='

                sh '''
                    minikube status || minikube start --driver=docker
                    kubectl get nodes
                '''
            }
        }

        stage('Load Image into Minikube') {
            steps {
                echo '=== Loading Docker Image into Minikube ==='

                sh '''
                    minikube image load ${FULL_IMAGE}

                    echo "Image loaded into Minikube:"
                    minikube image ls | grep shopkart || true
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo '=== Deploying ShopKart to Kubernetes ==='

                sh '''
                    kubectl apply -f ${K8S_MANIFEST}
                '''
            }
        }

        stage('Wait for Deployment') {
            steps {
                echo '=== Waiting for ShopKart Deployment ==='

                sh '''
                    kubectl rollout status deployment/shopkart --timeout=120s
                '''
            }
        }

        stage('Verify Kubernetes Deployment') {
            steps {
                echo '=== Kubernetes Deployment Verification ==='

                sh '''
                    echo "=== Nodes ==="
                    kubectl get nodes

                    echo "=== Deployment ==="
                    kubectl get deployment shopkart

                    echo "=== Pods ==="
                    kubectl get pods -o wide

                    echo "=== Service ==="
                    kubectl get service shopkart-service

                    echo "=== All Resources ==="
                    kubectl get all
                '''
            }
        }

        stage('Application Test') {
            steps {
                echo '=== Testing ShopKart Application ==='

                sh '''
                    POD=$(kubectl get pods \
                        -l app=shopkart \
                        -o jsonpath='{.items[0].metadata.name}')

                    echo "Testing Pod: $POD"

                    kubectl exec "$POD" -- python -c \
                        "import urllib.request; print(urllib.request.urlopen('http://127.0.0.1:5000/health').read().decode())"
                '''
            }
        }
    }

    post {

        success {
            echo '''
            ==========================================
            SHOPKART CI/CD PIPELINE SUCCESSFUL
            ==========================================

            GitHub
               ↓
            Jenkins
               ↓
            Docker Build
               ↓
            Minikube
               ↓
            Kubernetes Deployment
               ↓
            ShopKart Pods
               ↓
            ShopKart Service

            ==========================================
            '''
        }

        failure {
            echo '''
            ==========================================
            SHOPKART PIPELINE FAILED
            ==========================================

            Check the Jenkins console output
            for the failed stage.

            ==========================================
            '''
        }

        always {
            echo '=== Pipeline Finished ==='
        }
    }
}