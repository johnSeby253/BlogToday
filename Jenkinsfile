pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"
    }

    environment {
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        GIT_TOKEN = credentials('GIT_TOKEN')
        SOURCE_REPO = 'https://github.com/johnSeby253/BlogToday.git'
        TARGET_REPO = 'https://github.com/johnSeby253/blogtoday-test.git'
        TARGET_BRANCH = 'main'
    }

    stages {
        stage('Checkout Source Repo') {
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

        stage('Push Build to Target Repo') {
            steps {
                sh """
                cd repo

                # Configure Git user
                git config user.name "johnSeby253"
                git config user.email "johnseby253@gmail.com"

                # Add target remote if it doesn't exist
                git remote add target https://$GIT_TOKEN@github.com/johnSeby253/blogtoday-test.git || true

                # Checkout main branch of target repo
                git fetch target $TARGET_BRANCH || true
                git checkout -B $TARGET_BRANCH

                # Force add build files
                git add -f .next public package.json package-lock.json

                # Commit if changes exist
                git commit -m "Jenkins: Build & Deploy" || echo "No changes to commit"

                # Push to target repo main branch
                git push target $TARGET_BRANCH --force
                """
            }
        }
    }
}
