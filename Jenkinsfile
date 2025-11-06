pipeline {
    agent any

    tools {
        nodejs "Node_20_LTS"
    }

    environment {
        GIT_TOKEN = credentials('GIT_TOKEN')
        TARGET_REPO = 'https://github.com/johnSeby253/blogtoday-test.git'
        TARGET_BRANCH = 'main'
    }

    stages {
        stage('Checkout Source Repo') {
            steps {
                sh """
                rm -rf repo
                git clone --branch main https://$GIT_TOKEN@github.com/johnSeby253/BlogToday.git repo
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

                # Add target remote if not exists
                if ! git remote get-url target > /dev/null 2>&1; then
                  git remote add target https://$GIT_TOKEN@github.com/johnSeby253/blogtoday-test.git
                fi

                # Checkout target branch
                git fetch target $TARGET_BRANCH || true
                git checkout -B $TARGET_BRANCH

                # Force add build files
                git add -f .next public package.json package-lock.json

                # Commit changes
                git commit -m "Jenkins: Build & Deploy" || echo "No changes to commit"

                # Push to target branch
                git push target $TARGET_BRANCH --force
                """
            }
        }
    }
}
