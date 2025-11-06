pipeline {
    agent any

    environment {
        NVM_DIR = "/home/john/.nvm"
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Setup Node & NPM') {
            steps {
                sh '''
                # Load NVM
                export NVM_DIR="$NVM_DIR"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

                # Install and use Node LTS (>= v20)
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
                export NVM_DIR="$NVM_DIR"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use --lts

                npm install
                '''
            }
        }

        stage('Build Project') {
            steps {
                sh '''
                export NVM_DIR="$NVM_DIR"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use --lts

                npm run build
                '''
            }
        }

        stage('Deploy to Vercel') {
            steps {
                sh '''
                export NVM_DIR="$NVM_DIR"
                [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                nvm use --lts

                npx vercel --prod --token $VERCEL_TOKEN --confirm
                '''
            }
        }
    }
}
