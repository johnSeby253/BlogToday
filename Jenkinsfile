pipeline {
    agent any

    environment {
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
                sh 'scp -r .next/* john@162.120.184.244:/var/www/blogToday'
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
