pipeline {
    agent any

    environment {
        DB_PASSWORD = credentials('db_password')
        API_KEY     = credentials('api_key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'cd app && docker build -t secure-node-app:1.0 .'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh '''
                ansible-playbook ansible/deploy.yml \
                  -i ansible/inventory.ini \
                  --extra-vars "db_password=${DB_PASSWORD} api_key=${API_KEY}"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI + Ansible deployment successful'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}

