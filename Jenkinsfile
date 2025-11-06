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
        stage('Checkout Dev Repo') {
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

        stage('Push Build to Test Repo') {
            steps {
                sh '''
                # Configure Git
                git config user.name "$GIT_USER"
                git config user.email "$GIT_EMAIL"

                # Initialize Git if not exists
                if [ ! -d ".git" ]; then
                    git init
                fi

                # Add target remote if not exists
                if ! git remote get-url target > /dev/null 2>&1; then
                    git remote add target "$TARGET_REPO"
                fi

                # Force add build files (ignore .gitignore)
                git add -f .next public package.json package-lock.json

                # Commit changes
                git commit -m "Jenkins: Build & Deploy" || echo "No changes to commit"

                # Push to test repo
                git branch -M main
                git push -u target main --force
                '''
            }
        }
    }
}
