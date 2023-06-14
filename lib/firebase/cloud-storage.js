import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage'
import { debug, log } from '@/lib/logger.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCOPlFO13FV3f9bCWS-JLwk7-PRwxcDiLQ',
  authDomain: 'juanlabrada-d8405.firebaseapp.com',
  projectId: 'juanlabrada-d8405',
  storageBucket: 'juanlabrada-d8405.appspot.com',
  messagingSenderId: '87218378253',
  appId: '1:87218378253:web:a98f5a9b85effcde326744',
  measurementId: 'G-1SE9SKSZ8K'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

function getLastPathItem (path) {
  const items = path.split('/')
  return items[items.length - 1]
}

//* ******************************************************** */
// list all on public/images
// Create a reference under which you want to list

export default class CloudStorage {
  static getList (path = 'public/images') {
    debug('**************************')
    debug('Looking for: ' + path)
    return new Promise((resolve, reject) => {
      const listRef = ref(storage, path) // 'public/images'
      listAll(listRef)
        .then((res) => {
          const folders = []
          debug('------------------------')
          debug('Folder refs')
          res.prefixes.forEach((folderRef) => {
            const folder = { path: folderRef.fullPath, name: getLastPathItem(folderRef.fullPath) }
            folders.push(folder)
            debug(folderRef.fullPath)
            // console.log(folderRef)
          })
          debug('------------------------')
          debug('Items refs')
          const filePaths = res.items.map(itemRef => itemRef.fullPath)
          const urlsPromises = res.items.map(itemRef => getDownloadURL(itemRef))
          Promise.all(urlsPromises).then((urls) => {
            const files = filePaths.map((filePath, i) => ({ path: filePath, url: urls[i], name: getLastPathItem(filePath) }))
            resolve({ folders, files })
          })
        }).catch((error) => {
          // Uh-oh, an error occurred!
          log(error)
          reject(error)
        })
    })
  }

  static upload (path, file, metadata = { contentType: 'image/jpeg' }, cb = null) {
    debug(path, 'cloud-storage.upload')
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path, metadata) // 'public/images/vue/route-66.jpg'
      const uploadTask = uploadBytesResumable(storageRef, file)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          debug('Upload is ' + progress + '% done')
          if (cb) {
            cb(null, progress)
          }
          switch (snapshot.state) {
            case 'paused':
              if (cb) {
                cb(null, 'Upload is paused')
              }
              debug('Upload is paused')
              break
            case 'running':
              debug('Upload is running')
              if (cb) {
                cb(null, 'Upload is running')
              }
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          log('Error: ' + error)
          let message = ''
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              message = 'Unauthorized'
              break
            case 'storage/canceled':
              message = 'Upload canceled'
              break

              // ...

            case 'storage/unknown':
              message = 'Unknown error'
              break
          }
          log(message)
          reject(error)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            debug('File available at', downloadURL)
            resolve(downloadURL)
          })
        }
      )
    })
  }
}
