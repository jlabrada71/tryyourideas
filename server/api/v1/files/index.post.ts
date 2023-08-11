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
    const folder = `${path.join('public', 'uploads', 'users', userId, project, directory)}`
    if (!fs.existsSync(folder)){
      fs.mkdirSync(folder, { recursive: true });
    }
    
    let newPath = `${path.join( folder, originalFilename)}`;

    // let imageName = String(Date.now()) + String(Math.round(Math.random() * 10000000));
    // let newPath = `${path.join('public', 'uploads', folder, originalFilename)}.${ mimetype.split('/')[1] }`;
    fs.copyFileSync(filepath, newPath);

    return { success: true }
});