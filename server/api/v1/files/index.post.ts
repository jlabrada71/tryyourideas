import { readFiles } from 'h3-formidable'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const { fields, files } = await readFiles(event, {
      includeFields: true
    })
    const headers = getRequestHeaders(event)

    const { filepath, originalFilename, mimetype, size } = files.file[0]
    // console.log( originalFilename )
    // console.log( mimetype )
    // console.log( fields )
    const userId = fields.userId[0]
    const project = fields.project[0]
    const directory = fields.directory[0]
    console.log(userId, directory )
    const home = '/home/ubuntu/apps/resources.tryyourideas.com/'
    const folder = `${path.join(home, 'uploads', 'users', userId, project, directory)}`
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder, { recursive: true });
    }
    
    let newPath = `${path.join( folder, originalFilename)}`;
    
    fs.copyFileSync(filepath, newPath);

    return { success: true }
});