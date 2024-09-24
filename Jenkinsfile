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
                            junit 'jest-results/jest-output.json'
                        }
                    }
                }
                stage('E2E') {
                    agent {
                        docker {
                            image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
                            reuseNode true
                        }
                    }
                    steps {
                        sh '''
                            npm install serve
                            node_modules/.bin/serve -s build &
                            sleep 10
                            
                            npx playwright test --reporter=html
                        '''
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