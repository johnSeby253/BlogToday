pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"
    }

    environment {
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        GIT_USER = 'johnSeby253'
        GIT_EMAIL = 'johnseby253@gmail.com'
        TARGET_REPO = 'git@github.com:johnSeby253/blogtoday-test.git'
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
            steps {
                sh 'npx vercel --prod --token $VERCEL_TOKEN --yes --name blogtoday-next'
            }
        }

        stage('Push to blogtoday-test Repo') {
            steps {
                sh '''
                git config user.name "$GIT_USER"
                git config user.email "$GIT_EMAIL"
                git remote add target "$TARGET_REPO"
                
                # Optional: remove existing .git folder if you want a fresh push
                # rm -rf .git

                git add .
                git commit -m "Jenkins: Build & Deploy"
                git push target main --force
                '''
            }
        }
    }
}
