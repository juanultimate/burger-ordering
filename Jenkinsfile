pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        echo 'ssss'
        sh 'npm ci'
        echo 'pruebas'
      }
    }

    stage('paralelos') {
      parallel {
        stage('paralelos') {
          steps {
            sleep 3
          }
        }

        stage('') {
          steps {
            sleep 10
          }
        }

      }
    }

    stage('tests') {
      steps {
        echo 'tests running'
      }
    }

  }
}