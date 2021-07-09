const shell = require('shelljs');
const pkg = require('../package.json')
const CONFIG_DOCKER = { url: '', projectName: '', username: '', password: '' }
const ImageName = `${CONFIG_DOCKER.url}/${CONFIG_DOCKER.projectName}/${pkg.name}:${pkg.version}`
// 打包docker
const commands = [
    `docker login -u=${CONFIG_DOCKER.username} -p=${CONFIG_DOCKER.password} ${CONFIG_DOCKER.url}`,
    `docker build -t ${ImageName} .`,
    `docker push ${ImageName}`,
    `docker rmi ${ImageName}`
]
for (const command of commands) {
    console.log(command)
    shell.exec(command)
}

