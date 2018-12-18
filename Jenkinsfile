text='1111'
text2=[
    a='abc',
    b='bcd'
]
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'

                echo "First sssss ${text}";
                script {
                    println "print-print ${text2}"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}