pipeline {
    agent any

    environment {
        // Prepend the Node 22 binary path to PATH
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
        
       stage('Deploy') {
            steps {
                echo "Skipping deploy: running locally...!!"
            }
        } 
    }

    post {
        success {
            echo 'Frontend build & deploy successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
