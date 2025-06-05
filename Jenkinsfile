pipeline {
    agent any

    tools {
        nodejs "Node 20"
    }

    environment {
        CI = 'true'
    }

   stages {

        stage('Préparation') {
            steps {
                echo '--- Clonage du dépôt ---'
                git branch: 'main', url: 'https://github.com/Valheriane/quizAMHE.git'
                echo '--- Version de Node et npm ---'
                sh 'node -v'
                sh 'npm -v'
            }
        }


        stage('Installation des dépendances') {
            steps {
                echo '--- Installation des packages ---'
                sh 'npm install'
            }
        }

        stage('Rendre Jest exécutable') {
            steps {
                echo '--- Rendre jest exécutable ---'
                sh 'chmod +x ./node_modules/.bin/jest'
            }
        }

        stage('Tests unitaires') {
            steps {
                echo '--- Lancement des tests ---'
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline terminé avec succès !'
        }
        failure {
            echo '❌ Le pipeline a échoué.'
        }
    }
}
