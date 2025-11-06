pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            environment {
                VERCEL_TOKEN = credentials('VERCEL_TOKEN')
            }
            steps {
                sh 'npx vercel --prod --token $VERCEL_TOKEN --confirm'
            }
        }
    }
}
