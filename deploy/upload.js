const OSS = require('ali-oss').Wrapper
const path = require('path')
const fs = require('fs')
const OSSConfig = require('../build/deploy.config').OssConfig

const client = new OSS(OSSConfig)

const files = fs.readdirSync(path.join(__dirname, '../dist'))
console.log('dist 目录下的文件列表:', files)

files.map(file => {
  client.put(path.join('cnode', file), path.join(__dirname, '../dist', file))
    .then(result => {
      console.log('upload success:', result.name)
    }).catch(err => {
      console.log('upload error: ', err)
    })
})
