pipeline {
    agent any

    environment {
        // Prepend Node 22 binary to PATH
        PATH = "/home/john/.nvm/versions/node/v22.17.1/bin:$PATH"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'   // verify correct Node version
                sh 'npm -v'    // verify npm version
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Locally') {
            steps {
                echo "Starting Next.js locally on port 3000..."
                // Start the app in background
                sh '''
                nohup npm run start &
                sleep 10  # wait for server to start
                echo "Next.js should be running on localhost:3000"
                curl -I http://localhost:3000 || echo "App did not start properly"
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend build & local run successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}