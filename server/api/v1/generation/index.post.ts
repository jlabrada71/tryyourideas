import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'
import { zip } from 'zip-a-folder';
import { getComponentRenderedClass } from '@/lib/ClassGeneration'
import { selfClosingTags } from '@/lib/typeList';
import CloudStorage from '@/lib/firebase/cloud-storage.js'
import axios from 'axios';

const config = useRuntimeConfig()

function copyTemplate(templateProject: String, destDir: String) {
  if (fse.pathExistsSync(destDir)) {
    fse.removeSync(destDir)
  }
  try {
    log(`coping ${templateProject} to ${destDir} `)
    fse.copySync(templateProject, destDir, { overwrite: true })
    log(`successfully `)
  } catch (err) {
    console.error(err)
  }
}

async function createZipFile(srcDir, zipFileName) {
  
  try {
    if (fse.pathExistsSync(zipFileName)) {
      fse.removeSync(zipFileName)
    }
    log('zipping ' + srcDir)
    await zip(srcDir, zipFileName);
    log('zipping successful')
  } catch(e) {
    log('Error zipping ' + srcDir)
    log(e)
  }
}

function getItemListCode(item) {
  return item.children.map(getItemCode).join('')
}

function getItemPropertiesCode(item) {
  const props = item.props.map(prop => `${prop.name}="${prop.value}"`).join(' ')
  return `id="id-${item.editorId}" ${props}`
}

function cleanText(text) {
  text = text.split('\n').join(' ')
  while(text.indexOf('  ') > -1) 
    text = text.split('  ').join(' ')
  return text
}

function getItemCode(item) {
  const renderedClass = cleanText(getComponentRenderedClass(item))
  const code = `<${item.type} ${getItemPropertiesCode(item)} class="${renderedClass}">`
  if (selfClosingTags.includes(item.type)) return code
  return `${code}
    ${item.text}${getItemListCode(item)}
  </${item.type}>
  `
}

function getCode(component) {
  log(`getting code for: ${component.name}`)
  const code = `<template>
    ${getItemCode(component.root)}
  </template>
  `
  log(code)
  return code
}

function saveCode(directory: String, file: String, code: String) {

  fse.writeFile(`${directory}/${file}`, code, err => {
    if (err) {
      log('Error writing file: ' + file)
      console.error(err);
    }
  });
}

function generateComponents(model, projectDirectory: String) {
  model.components.forEach( component => {
    const code = getCode(component)
    saveCode(projectDirectory + '/components', component.name + '.vue', code)
  })
}

function generateIndexPage(model, projectDirectory: String) {
  const code = model.components.map(component => `<${component.name}></${component.name}>`).join('\n')
  const pageCode = `
    <template>
      ${code}
    </template>
  `

  saveCode(projectDirectory + '/pages', 'index.vue', pageCode)
}

function postToServer(obj, url) {
  return axios({
    method: 'post',
    url,
    data: obj
  });
}

export default defineEventHandler(async (event) => {
  log('generation POST')
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)

    debug(content)  
    // fs.writeFileSync( `server/models/${body.user}/${body.name}.json`, content);

    const srcDir = `${config.data}/templates/nuxt3-tailwinds-storybook`
    const destDir = `${config.data}/models/${body.user}/generation/${body.name}`
    const zipFileName = `${destDir}.zip`
    copyTemplate(srcDir, destDir)

    generateComponents(body, destDir)
    generateIndexPage(body, destDir)

    await createZipFile(destDir, zipFileName)

    const firebaseFilename = `public/images/${body.name}.zip`
     
    const file = await fse.readFile(zipFileName)

    const downloadUrl = await CloudStorage.upload(firebaseFilename, file)
    debug(downloadUrl)
    
    log('finished zipping')
    fse.moveSync(zipFileName, `${config.tmp}/${body.name}.zip`, { overwrite: true })
    log('finished publishing')

    const result = `<html>
        <body>
          Hi ${body.user}<br><br> 
          The code for your project ${body.name} is ready. 
          <a href="${downloadUrl}">Download here</a>
        </body>
        </html> `

    // send email with download Url

    postToServer({ title: 'Project Download Link', email: body.email, content: result }, config.notificationsApi)

    return result
})

