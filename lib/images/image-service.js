import axios from 'axios'

export function getImageService(config, user, project) {
  
  const fileServer = `${config.public.apiBase}/files`
  const uploadedImages = `${config.public.frontEndOrigin}/uploads/users`

  const imageRepository = new ImageRepository(user, project, fileServer, uploadedImages)
  return imageRepository

}

export class ImageRepository {
    constructor(user, project, fileServer, uploadedImages) {
      this.user = user
      this.project = project
      this.currentDirectory = ''
      this.fileServer = fileServer
      this.uploadedImages = uploadedImages
    }

    async getFiles(directory) {
      this.currentDirectory = directory
      const result = await axios.get(`${this.fileServer}?userId=${this.user}&project=${this.project}&directory=${directory}`)
      // check result.status !== 200
      return result.data
    }

    async postFile(file, directory) {
      this.currentDirectory = directory
      const formData = new FormData();
      formData.append('userId', this.user )
      formData.append('project', this.project )
      formData.append('directory', directory)
      formData.append('file', file);
      const headers = { 'Content-Type': 'multipart/form-data' };
      const res = await axios.post(this.fileServer, formData, { headers })
      return res.status; // HTTP status
    }

    pathOfImage(name) {
      return `${this.uploadedImages}/${this.user}/${this.project}/${this.currentDirectory}/${name}`
    }
  }