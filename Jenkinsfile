pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV',
            choices: ['dev', 'stage', 'prod'],
            description: 'Target environment'
        )
        string(
            name: 'IMAGE_TAG',
            defaultValue: '1.0',
            description: 'Docker image tag'
        )
    }

    environment {
        DB_PASSWORD = credentials('db_password')
        API_KEY     = credentials('api_key')
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
                sh 'cd app && docker build -t secure-node-app:${IMAGE_TAG} .'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh '''
                echo "$ANSIBLE_VAULT_PASSWORD" > /tmp/.vault_pass
                chmod 600 /tmp/.vault_pass

                ansible-playbook ansible/deploy.yml \
                  -i ansible/inventories/${ENV}/inventory.ini \
                  --vault-password-file /tmp/.vault_pass

                rm -f /tmp/.vault_pass
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

