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

        stage('Push Build to Test Repo') {
            steps {
                sh '''
                # Configure Git user
                git config user.name "$GIT_USER"
                git config user.email "$GIT_EMAIL"

                # Initialize Git if not already
                if [ ! -d ".git" ]; then
                    git init
                fi

                # Add remote if it doesn't exist
                if ! git remote get-url target > /dev/null 2>&1; then
                    git remote add target "$TARGET_REPO"
                fi

                # Force add the build folder (.next) and any other necessary files
                git add .next public package.json package-lock.json

                # Commit changes
                git commit -m "Jenkins: Build & Deploy" || echo "No changes to commit"

                # Push to target repo
                git branch -M main
                git push -u target main --force
                '''
            }
        }
    }
}
