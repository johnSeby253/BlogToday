pipeline {
    agent any

    environment {
        // Replace with your server user and host
        DEPLOY_USER = 'john'
        DEPLOY_HOST = '162.120.184.244'
        DEPLOY_PATH = '/var/www/blogToday'
        NODE_VERSION = '20'
    }

    stages {

        stage('Checkout') {
            steps {
                // Use credentials if the repo is private
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Setup Node') {
            steps {
                echo "Setting up Node.js ${env.NODE_VERSION}"
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo "Building Next.js project..."
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying to server ${DEPLOY_HOST}"
                    // Ensure the build exists
                    if (!fileExists('.next')) {
                        error(".next folder not found. Build failed?")
                    }
                    // Copy build files via scp
                    sh """
                        scp -r .next public package.json ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend build & deploy successful!'
        }
        failure {
            echo 'Build or deploy failed!'
        }
    }
}
