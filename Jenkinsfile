pipeline {
    agent any

    tools {
        nodejs "Node 20"
    }

    stages {
        stage('Cloner le repo') {
            steps {
                git 'https://ton-repo.git'
            }
        }

        stage('Installer les dépendances') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lancer les tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}
