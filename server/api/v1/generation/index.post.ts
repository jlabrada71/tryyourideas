import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'
import { zip } from 'zip-a-folder';

function copyTemplate(templateProject: String, destDir: String) {
  if (fse.pathExistsSync(destDir)) {
    fse.removeSync(destDir)
  }
  try {
    console.log(`coping ${templateProject} to ${destDir} `)
    fse.copySync(templateProject, destDir, { overwrite: true })
    console.log(`successfully `)
  } catch (err) {
    console.error(err)
  }
}

async function createZipFile(srcDir, zipFileName) {
  
  try {
    if (fse.pathExistsSync(zipFileName)) {
      fse.removeSync(zipFileName)
    }
    console.log('zipping ' + srcDir)
    await zip(srcDir, zipFileName);
    console.log('zipping successful')
  } catch(e) {
    console.log('Error zipping ' + srcDir)
    console.log(e)
  }
}

export default defineEventHandler(async (event) => {
  console.log('generation POST')
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)

    debug(body.name)  
    // fs.writeFileSync( `server/models/${body.user}/${body.name}.json`, content);

    const srcDir = `server/templates/nuxt3-tailwinds-storybook`
    const destDir = `server/models/${body.user}/generation/${body.name}`
    const zipFileName = `${destDir}.zip`
    copyTemplate(srcDir, destDir)

    createZipFile(destDir, zipFileName).then(() => {
      console.log('finished zipping')
      fse.moveSync(zipFileName, `public/tmp/${body.name}.zip`, { overwrite: true })
      console.log('finished publishing')
    })

    return {
      api: 'works'
    }
})

