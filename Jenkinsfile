pipeline {
    agent any;
    tools {
        nodejs "node"
    }

    options {
        gitLabConnection(gitLabConnection: 'gitlab_frontend_connection')
        gitlabBuilds(builds: ['install_dependencies', 'build'])
        timestamps()
    }

    stages {
        stage("Install dependencies") {
            steps {
                gitlabCommitStatus(name: "install_dependencies") {
                    sh 'npm i'
                }
            }
        }
        stage("Build") {
            steps {
                gitlabCommitStatus(name: "build") {
                    sh 'npm run build'
                }
            }
        }
        stage("Archive artifacts") {
            steps {
                    zip dir: '.next', glob: '', zipFile: "frontend" + env.BUILD_ID + ".zip", archive: true
                }
            }
        }
    post {
        always {
            discordSend description: "result:" + currentBuild.currentResult, link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME + " #" + env.BUILD_NUMBER, webhookURL: "https://discord.com/api/webhooks/1039587559984074802/g_jhnKHeB4LceQVX_Om2fmzlcwWgsOdDLq_Orz-q1TrySyvaYxFERBIYrnRK9QOO60xe", enableArtifactsList: true, showChangeset: true
        }
    }
}
