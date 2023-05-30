import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'
import { zip } from 'zip-a-folder';
import { toHtml } from '@/lib/HtmlExporter'
import CloudStorage from '@/lib/firebase/cloud-storage.js'
import axios from 'axios'
import beautify from 'js-beautify'

const { js, css, html } = beautify

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

function beautifyHtml(code: String) {
  return html( code, {
    "end_with_newline": true,
    "js": {
        "indent_size": 2
    },
    "css": {
        "indent_size": 2
    }
  })
}

function beautifyJs(code: String) {
  return js(code, {
    "preserve-newlines": true
  })
}

function beautifyCss(code: String) {
  return css(code, {
    "indent_size": 1
  })
}

function getCode(component) {
  const code = beautifyHtml(toHtml(component) )
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
  log('POSTING to ' + url)
  log(JSON.stringify(obj, null, 2))
  return axios({
    method: 'post',
    url,
    data: obj
  });
}

export default defineEventHandler(async (event) => {
  log('generation POST')
    const body = await readBody(event)
    const { project, user } = body
    const req = event.node.req
    // fs.writeFileSync( `server/models/${body.user}/${body.name}.json`, content);

    const srcDir = `${config.data}/templates/nuxt3-tailwinds-storybook`
    const destDir = `${config.data}/projects/${user.id}/generation/${project.name}`
    const zipFileName = `${destDir}.zip`
    copyTemplate(srcDir, destDir)

    generateComponents(project, destDir)
    generateIndexPage(project, destDir)

    await createZipFile(destDir, zipFileName)
    log('finished zipping')

    const firebaseFilename = `public/images/${project.name}.zip`
     
    const file = await fse.readFile(zipFileName)

    const downloadUrl = await CloudStorage.upload(firebaseFilename, file)
    debug(downloadUrl)
   
    log('finished publishing')

    const result = `<html>
        <body>
          Hi ${user.name}<br><br> 
          The code for your project ${project.name} is ready. 
          <a href="${downloadUrl}">Download here</a><br>
          To run your project: <br>
          <ul>
            <li>Unzip the file</li>
            <li>cd ${project.name} </li>
            <li>npm install</li>
            <li>npm run dev</li>
          </ul>
          <br>
          <br>
          Kind regards<br>
          The TryYourIdeas team<br>
          <br>
        </body>
        </html> `

    // send email with download Url

    try {
      await postToServer({ title: 'Project Download Link', email: user.email, content: result }, config.notificationsApi)
      log('email sent')
    }
    catch(e) {
      log('Error sending email')
      log(e)
    }

    return result
})

