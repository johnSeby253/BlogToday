pipeline {
    agent any

    environment {
        NVM_DIR = "$HOME/.nvm"
    }

    stages {

        stage('Install NVM + Node Stable') {
            steps {
                sh '''
                # Install NVM if not exists
                if [ ! -d "$NVM_DIR" ]; then
                    echo "Installing NVM..."
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                fi

                # Load NVM
                . "$NVM_DIR/nvm.sh"

                # Install stable Node (latest LTS)
                nvm install --lts
                nvm use --lts

                echo "Node version:"
                node -v
                echo "npm version:"
                npm -v
                '''
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts
                npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts
                npm test
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts
                npm run build
                '''
            }
        }

        stage('Run Locally') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts

                # Kill previous instance
                pm2 delete nextjs-app || true

                # Start Next.js permanently
                pm2 start npm --name "nextjs-app" -- start -- -H 0.0.0.0

                pm2 save
                pm2 status
                '''
            }
        }

    }

    post {
        success {
            echo '✅ Frontend build & local server running successfully!'
        }
        failure {
            echo '❌ Build or tests failed!'
        }
    }
}
