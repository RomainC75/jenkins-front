pipeline {
    agent any

    environment {
        REGISTRY_NAME = "myciregistry"
        ACR_LOGIN_SERVER = "${REGISTRY_NAME}.azurecr.io"
        REPOSITORY_NAME = "node-express-app"
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    echo "VERSIONS"
                    node --version
                    npm --version
                    
                    
                    # ci : especially designed for ci 
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }

        stage ('Build Docker image') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                sh "docker build -t ${REGISTRY_NAME}.azurecr.io/${REPOSITORY_NAME}:$BUILD_NUMBER ." 
                }
            }
        }

        stage ('Upload Image to ACR') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                withCredentials([usernamePassword(credentialsId: 'az acr gmail', usernameVariable: 'SERVICE_PRINCIPAL_ID', passwordVariable: 'SERVICE_PRINCIPAL_PASSWORD')]) {
                    sh "docker login ${ACR_LOGIN_SERVER} -u $SERVICE_PRINCIPAL_ID -p $SERVICE_PRINCIPAL_PASSWORD"
                    sh " docker push ${REGISTRY_NAME}.azurecr.io/${REPOSITORY_NAME}:$BUILD_NUMBER"
                    }
                }
            }
        }

        // stage('Run Tests'){
        //     parallel {
        //         stage('Unit Test'){
        //             agent {
        //                 docker {
        //                     image 'node:18-alpine'
        //                     // to merge workspaces
        //                     reuseNode true
        //                 }
        //             }
        //             steps {
        //                 sh '''
        //                     echo "unit test "
        //                     ls -a 
        //                     pwd
        //                     test -f dist/index.html
        //                     npm run test
        //                 '''
        //             }
        //             post{
        //                 always {
        //                     junit 'jest-results/junit.xml'
        //                 }
        //             }
        //         }

                // stage('E2E') {
                //     agent {
                //         docker {
                //             image 'cypress/base:20.17.0'
                //             args '-p 3000:3000' d
                //             reuseNode true
                //         }
                //     }
                //     steps {
                //         sh 'npm ci'
                //         sh 'npm run cy:verify'
                //         sh 'npm run build'
                //         sh '''
                //             npm install serve
                //             node_modules/.bin/serve -s -p 3000 dist &
                //             # node_modules/.bin/serve -s dist &
                //             sleep 10
                //             npm install node-wget
                //             echo "====================================================="
                //             node_modules/.bin/wget http://localhost:3000 
                //         '''
                //         sh 'npm run cy:run'
                //     }
                //     post{
                //         always {
                //             publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'playwright Local', reportTitles: '', useWrapperFileDirectly: true])
                //         }
                //     }
                // }
            // }
        }
    }    
}