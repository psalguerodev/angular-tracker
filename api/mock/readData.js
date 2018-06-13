const fs = require('fs')
const request= require('request')
const db = require('../config/connection-sqlite')
const Component = require('../models/component.model')

let data_files = []
let base_path = 'c:\\FTM41\\transactor\\'
let directories = ['ClientScript',
                    'Data',
                    'Content', 
                    'Content\\Images',
                    'Content\\Sounds',
                    'Content\\Styles',
                    'Help', 
                    'ServerScript', 
                    'Classes']

function getFilesList(directory){
    let result = []
    
    // En caso no exista parametro
    if(!directory){
        let files = fs.readdirSync(base_path)
        if(files!=null){
            files.forEach(f => {
                if(!f.startsWith(".")){
                    let stat = fs.lstatSync(`${base_path}${f}`)
                    if(stat.isFile()){
                        result.push({
                            filename: f,
                            filepath: `Transactor/${f}`,
                            extension : `${f.split(".")[1].toUpperCase()}`
                        })
                    }
                }
            })
        }
    }else{
        let files = fs.readdirSync(`${base_path}${directory}\\`)
        // console.log(`${base_path}${directory}`)
        if(files!=null){
            files.forEach(f => {
                if(!f.startsWith(".")){
                    // console.log(`${base_path}${f}`)
                    let stat = fs.lstatSync(`${base_path}${directory}\\${f}`)
                    if(stat.isFile()){
                        result.push({
                            filename: f,
                            filepath: `Transactor/${directory}/${f}`,
                            extension : `${f.split(".")[1].toUpperCase()}`
                        })
                    }
                }
            })
        }
    }

    return result
}

data_files.push(getFilesList())
directories.forEach(d => {
    data_files.push(getFilesList(d))
})

fs.appendFileSync("./mock.json", "[" , {encoding:'utf-8'})
for(let i = 0; i < data_files.length; i++){
    for(let j = 0; j < data_files[i].length; j++ ){
        // setTimeout(()=>{
        //     request.post(
        //         {url:'http://w7itdata01:5000/component', 
        //         form: {
        //             name : data_files[i][j]['filename'],
        //             filepath: data_files[i][j]['filepath'],
        //             extension: data_files[i][j]['extension']
        //         } 
        //     }, function(err,httpResponse,body){
        //         console.log(body)
        //     })
        // },3000)
        fs.appendFileSync("./mock.json", JSON.stringify(data_files[i][j]) + "," , {encoding:'utf-8'})
    }
}
fs.appendFileSync("./mock.json", "]" , {encoding:'utf-8'})

// fs.appendFileSync("./mock.json", "[" , {encoding:'utf-8'})
// fs.appendFileSync("./mock.json", JSON.stringify(comp) + "," , {encoding:'utf-8'})
// fs.appendFileSync("./mock.json", "]" , {encoding:'utf-8'})





