pipeline {
    agent any

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
        
        
        stage('Run Tests'){
            parallel {
                stage('Unit Test'){
                    agent {
                        docker {
                            image 'node:18-alpine'
                            // to merge workspaces
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            test -f dist/index.html
                            npm run test
                        '''
                    }
                    post{
                        always {
                            junit 'jest-results/junit.xml'
                        }
                    }
                }
                stage('E2E') {
                    agent {
                        docker {
                            image 'cypress/base:20.17.0'
                            args '-p 3000:3000' 
                            reuseNode true
                        }
                    }
                    steps {
                        stage('install dependencies for Cypress'){
                            steps {
                                sh 'npm ci'
                                sh 'npm run cy:verify'
                            }
                        }
                        stage('Build') { 
                            steps {
                                sh 'npm run build'
                            }
                        }
                        stage('Test') { 
                            steps {
                                sh '''
                                    npm install serve
                                    node_modules/.bin/serve -s build &
                                    sleep 10
                                    
                                '''
                                sh 'npm run ci:cy-run'
                            }
                        }
                    }
                    post{
                        always {
                            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'playwright Local', reportTitles: '', useWrapperFileDirectly: true])
                        }
                    }
                }
            }
        }
    }    
}