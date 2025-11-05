pipeline {
    agent any

    environment {
        DEPLOY_USER = 'john'
        DEPLOY_HOST = '162.120.184.244'
        DEPLOY_PATH = '/var/www/blogToday'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/johnSeby253/BlogToday.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm install 20
                    nvm use 20
                    node -v
                    npm -v
                    npm install
                    npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'scp -r .next public package.json john@162.120.184.244:/var/www/blogToday'
            }
        }
    }

    post {
        success { echo 'Frontend build & deploy successful!' }
        failure { echo 'Build or deploy failed!' }
    }
}
