import { log, debug } from '@/lib/logger.js'
import fse  from 'fs-extra'
import { zip } from 'zip-a-folder';
import CloudStorage from '@/lib/firebase/cloud-storage.js'
import { getEmailService } from '@/lib/emails/Service.js'
import { generateVueComponentCode } from '@/lib/generators/GenerateVueComponentCode.js';

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
    const code = generateVueComponentCode(component)
    saveCode(projectDirectory + '/components', component.name + '.vue', code)
  })
}

function generateIndexPage(model, projectDirectory: String) {
  const code = model.components.map(component => `<div class="flex flex-col gap-2 p-4 bg-slate-50"><span class="font-bold text-2xl">${component.name}</span><${component.name}></${component.name}></div>`).join('\n')
  const pageCode = `
    <template> 
      <div class="flex flex-col m-8 bg-slate-500 h-screen">
        <h1 class="text-5xl text-slate-50 font-bold p-4">Component List</h1>
        <div class="flex flex-col gap-4 m-8 bg-slate-200 p-4">
        ${code}
        </div>
      </div>
    </template>
  `
  saveCode(projectDirectory + '/pages', 'index.vue', pageCode)
}

export default defineEventHandler(async (event) => {
  log('generation POST')
  const body = await readBody(event)
  const { project, user } = body
  const req = event.node.req

  const projectFolder = user.id === 'undefined' ? 'freetrial' : user.id
  log(`User ID: ${user.id} projectFolder: ${projectFolder}`)
  const srcDir = `${config.data}/templates/nuxt3-tailwinds-storybook`
  const destDir = `${config.data}/projects/${projectFolder}/generation/${project.name}`
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

  const emailText = `<html>
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
  const emailService = getEmailService(config)

  try {

    const result = await emailService.send({ title: 'Project Download Link', email: user.email, content: emailText })

    return result;
  } catch (e) {
    log(e.stack, 'message-routes')
    return { error: e.msg }
  }
})

