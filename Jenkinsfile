pipeline {
    agent any

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
                // Example: Copy build files to your server
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
