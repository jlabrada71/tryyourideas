import fs from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import { log, debug } from '../lib/logger'
import CloudStorage from '../lib/firebase/cloud-storage.js'

const router = express.Router()
const filesDirectory = '/static/files'
const rootDirectory = path.resolve('.') + filesDirectory

async function getFileStats (file) {
  const result = { name: file.name, path: `/files/${file.path}/${file.name}` }
  const stats = await fs.stat(rootDirectory + '/' + file.path + '/' + file.name)
  debug(`stats: ${JSON.stringify(stats)}`)
  if (await stats.isDirectory()) {
    result.type = 'D'
  }
  if (await stats.isFile()) {
    result.type = 'F'
  }
  result.size = stats.size
  debug(result)
  return result
}
async function readFiles (directory = '') {
  const searchDirectory = rootDirectory + '/' + directory
  const files = await fs.readdir(searchDirectory)
  debug(files)
  const result = files.map(file => ({ name: file, path: directory })).map(getFileStats)
  return Promise.all(result)
}

router.get('/server/*', (req, res, next) => {
  const dirPath = req.url.split('/').filter(item => item && item !== 'server')
  debug('Looking for: ' + dirPath.join('/'), 'Files')
  readFiles(dirPath.join('/')).then((files) => {
    const folders = files.filter(file => file.type === 'D')
    const other = files.filter(file => file.type === 'F')
    res.send({files: other, folders })
  }).catch((err) => {
    log(err)
    next(err)
  })
})

router.get('/server/:id', (req, res, next) => {
  debug('Reading server', 'Files')
  debug(req.params.id)
  readFiles(req.params.id).then((files) => {
    res.send(files)
  }).catch((err) => {
    log(err)
    next(err)
  })
})

router.get('/firebase', (req, res, next) => {
  debug('Reading firebase', 'Files')
  CloudStorage.getList('public/images').then((files) => {
    res.send(files)
  }).catch((err) => {
    log(err)
    next(err)
  })
})

router.get('/firebase/*', (req, res, next) => {
  const dirPath = req.url.replace('firebase', '').split('/').filter(item => item)
  debug('Looking for: ' + dirPath.join('/'), 'Files')
  CloudStorage.getList(dirPath.join('/')).then((files) => {
    res.send(files)
  }).catch((err) => {
    log(err)
    next(err)
  })
})

router.get('/form', (req, res) => {
  res.send(`
  <form id="form_el" class='new-project' action='http://localhost:3100/api/v1/files/firebase' method='POST' enctype="multipart/form-data">
    <label for='directory'>Enter destination directory:</label>
    <input type='text' name='directory' id='directory' />    
    <input type='file' multiple='multiple' name='files' id='file' />
    <button type='submit'>upload</button>
    <p>Max 10 files</p>
  </form>`)
})

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const destinationDirectory = rootDirectory + '/' + req.body.directory
    debug('Creating: ' + destinationDirectory)
    if (!existsSync(destinationDirectory)) {
      mkdirSync(destinationDirectory, { recursive: true })
    }
    cb(null, destinationDirectory)
  },
  filename (req, file, cb) {
    log(file)
    cb(null, file.originalname)
  }
})

const multiUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    cb(null, true)
  }
}).array('files', 10)

router.post('/firebase/', (req, res, next) => {
  debug('Posting: ')
  multiUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      log(err)
      // A Multer error occurred when uploading.
      res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end()
      return
    } else if (err) {
      log(err)
      // An unknown error occurred when uploading.
      if (err.name === 'ExtensionError') {
        res.status(413).send({ error: { message: err.message } }).end()
      } else {
        res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end()
      }
      return
    }
    debug(req.files)
    const uploadPromises = req.files.map(async (fileData) => {
      const file = await fs.readFile(fileData.path)
      const directory = req.body.directory.split('/').filter(item => item !== '').join('/') + '/'
      const destFilename = 'public/images/' + directory + fileData.filename
      return CloudStorage.upload(destFilename, file, fileData.mimetype)
    })
    Promise.all(uploadPromises).then((downloadUrls) => {
      debug(downloadUrls)
      res.status(200).end(JSON.stringify(downloadUrls))
    }).catch((err) => {
      log(err)
      next(err)
    })
  })
})

router.post('/server', (req, res, next) => {
  debug('Creating server files', 'Files')
  multiUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      log(err)
      // A Multer error occurred when uploading.
      res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end()
      return
    } else if (err) {
      log(err)
      // An unknown error occurred when uploading.
      if (err.name === 'ExtensionError') {
        res.status(413).send({ error: { message: err.message } }).end()
      } else {
        res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end()
      }
      return
    }

    res.status(200).end('Your files uploaded.')
  })
})

router.delete('/server/:id', async (req, res, next) => {
  debug('Deleting firebase', 'Files')
})
module.exports = router
