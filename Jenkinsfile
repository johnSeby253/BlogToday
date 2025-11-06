pipeline {
    agent any

    environment {
        NVM_DIR = "/home/john/.nvm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Install Node using NVM') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm install --lts
                nvm use --lts
                node -v
                npm -v
                '''
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

        stage('Build Project') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts
                npm run build
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                sh '''
                . "$NVM_DIR/nvm.sh"
                nvm use --lts

                pm2 delete nextjs-app || true
                pm2 start npm --name "nextjs-app" -- start
                pm2 save
                pm2 status
                '''
            }
        }
    }
}
