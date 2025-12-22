pipeline {
    agent any

    environment {
        // 🔐 Jenkins credentials
        DB_PASSWORD = credentials('db_password')
        API_KEY     = credentials('api_key')

        // 🔐 STEP 2.5: Ansible Vault password from Jenkins
        ANSIBLE_VAULT_PASSWORD = credentials('ansible_vault_pass')
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
                  --vault-password-file <(echo "$ANSIBLE_VAULT_PASSWORD")
                '''
            }
        }
    }

    post {
        success {
            echo '✅ CI + Ansible + Vault deployment successful'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}

