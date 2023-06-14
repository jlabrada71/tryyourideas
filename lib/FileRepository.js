import { existsSync, promises, mkdirSync } from 'fs'
import { debug } from '@/lib/logger.js'
import path from 'path'

const { readFile, writeFile } = promises

export class FileRepository {
  constructor(file, options = { createIfNotExists: false }) {
    this.file = file
    debug('creating ' + file)
    this.createIfNotExists = options.createIfNotExists
    if (options.createIfNotExists) this.checkAndCreate(file)
  }

  async checkAndCreate(file) {
    if (existsSync(file)) return
    if (!existsSync(path.dirname(file))) {
      mkdirSync(path.dirname(file), { recursive: true });
    }
    const data = []
    await writeFile( this.file, JSON.stringify(data, null, 2) )
  }

  async read() {
    debug('reading..')
    if (this.createIfNotExists) await this.checkAndCreate(this.file)
    const data = await readFile( this.file, 'utf-8' )
    debug(data)
    return JSON.parse(data)
  }

  async write(data) {
    if (this.createIfNotExists) await this.checkAndCreate(this.file)
    debug('writing ' + this.file)
    debug(data)
    await writeFile( this.file, JSON.stringify(data, null, 2) )
  }

  async insert(data) {
    debug('Inserting')
    debug(data)
    const rows = await this.read()
    rows.push(data)
    await this.write(rows)
  }

  async select(filter) {
    const rows = await this.read()
    if (!filter) return rows
    const selectedRows = rows.filter(filter)
    return selectedRows
  }

  async update(data) {
    const rows = await this.read()
    const row = rows.find((item) => item.id === data.id)
    if (!row) return
    Object.keys(data).forEach(key => row[key] = data[key])
    await this.write(rows)
  }

  async delete(data) {
    const rows = await this.read()
    const result = rows.filter(row => row.id !== data.id)
    await this.write(result)
  }
}