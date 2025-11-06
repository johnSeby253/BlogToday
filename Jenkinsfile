pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"
    }

    environment {
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        GIT_TOKEN = credentials('GIT_TOKEN')
        REPO_URL = 'https://github.com/johnSeby253/BlogToday.git'
        TEST_BRANCH = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                sh """
                git clone --branch main https://$GIT_TOKEN@github.com/johnSeby253/BlogToday.git repo
                cd repo
                """
            }
        }

        stage('Install Dependencies') {
            steps {
                sh """
                cd repo
                npm install
                """
            }
        }

        stage('Build Project') {
            steps {
                sh """
                cd repo
                npm run build
                """
            }
        }

        stage('Push Build to Test Branch') {
            steps {
                sh """
                cd repo

                # Initialize git if not already
                git config user.name "johnSeby253"
                git config user.email "johnseby253@gmail.com"

                # Checkout test branch or create if it doesn't exist
                git fetch origin $TEST_BRANCH || true
                git checkout -B $TEST_BRANCH

                # Force add build files
                git add -f .next public package.json package-lock.json

                # Commit if there are changes
                git commit -m "Jenkins: Build & Deploy" || echo "No changes to commit"

                # Push to test branch using HTTPS token
                git push https://$GIT_TOKEN@github.com/johnSeby253/BlogToday.git $TEST_BRANCH --force
                """
            }
        }
    }
}
