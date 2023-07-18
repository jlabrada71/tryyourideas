import { readFiles } from 'h3-formidable';
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
    const { files } = await readFiles(event, {
      includeFields: true
    });
    const { filepath, originalFilename, mimetype, size } = files.file[0]
    console.log(  originalFilename )
    console.log( mimetype )
    const folder = 'user'
    
    let newPath = `${path.join("public", "uploads", folder, originalFilename)}`;
    // let imageName = String(Date.now()) + String(Math.round(Math.random() * 10000000));
    // let newPath = `${path.join("public", "uploads", folder, originalFilename)}.${ mimetype.split('/')[1] }`;
    fs.copyFileSync(filepath, newPath);

    return { success: true }
});