#!/usr/bin/env node
(async function hello(){
'use script'
const path = require('path')
const fs = require('fs')
const { setO, loggerStart, loggerStop } = require('./work-options')

const nodePaths = require('./nodePaths')

const {writeDataToFile} = require('./writeDataToFile')

let getFileName = process.argv[2]
if(!getFileName){
    console.log(`Usage
    $ nodepath [file-name] [options]

    - options
        
        -O -> 输出目录 { process.cwd } 

    Example:

    $ NodePath filename
    `)
    process.exit(0)
}
// Output
let index
process.argv.forEach((x, i) =>{
    if(x == '-O')index = i
})

if(index && process.argv[index+1]){
    setO(path.resolve(process.cwd(), process.argv[index+1]))
}
// Put node_modules to module.paths
let cwd = path.resolve(process.cwd(),getFileName)
let Ps = []

while(cwd !== '/'){
    let cwdModule = path.join(path.dirname(cwd),'node_modules')
    Ps.unshift(cwdModule)
    cwd = path.dirname(cwdModule)
}
Ps.forEach(ps => module.paths.unshift(ps))

// 计算
console.time('NodePath:time')

loggerStart("start nodepath .. ")

let filePath = path.resolve(process.cwd(), getFileName)
// 请求·
let results = await nodePaths(filePath)

loggerStop("finish nodepath")

console.log(results)

writeDataToFile(results)


console.timeEnd('NodePath:time')


})()
