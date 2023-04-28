import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'
import { zip } from 'zip-a-folder';
import { getComponentRenderedClass } from '@/lib/ClassGeneration'
import { selfClosingTags } from '@/lib/tags';

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

export default defineEventHandler(async (event) => {
  log('generation POST')
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)

    debug(body.name)  
    // fs.writeFileSync( `server/models/${body.user}/${body.name}.json`, content);

    const srcDir = `server/templates/nuxt3-tailwinds-storybook`
    const destDir = `server/models/${body.user}/generation/${body.name}`
    const zipFileName = `${destDir}.zip`
    copyTemplate(srcDir, destDir)

    generateComponents(body, destDir)

    createZipFile(destDir, zipFileName).then(() => {
      log('finished zipping')
      fse.moveSync(zipFileName, `public/tmp/${body.name}.zip`, { overwrite: true })
      log('finished publishing')
    })

    return {
      api: 'works'
    }
})

