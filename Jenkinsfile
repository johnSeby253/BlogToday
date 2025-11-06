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
                
                # Add remote if it doesn't exist
                if ! git remote get-url target > /dev/null 2>&1; then
                    git remote add target "$TARGET_REPO"
                fi

                # Commit only if there are changes
                if [ -n "$(git status --porcelain)" ]; then
                    git add .
                    git commit -m "Jenkins: Build & Deploy"
                    git branch -M main
                    git push target main --force
                else
                    echo "No changes to commit"
                fi
                '''
            }
        }

    }
}
