import Ajv from 'ajv'
import fs from 'fs-extra'

export interface FeishuPlatformConfig {
  events: string[]
  encryptKey: string
  verificationToken: string
  scopeIds: string[]
  cardRequestUrl: string
  verificationUrl: string

}
export interface DeployConfig {
  name: string
  desc: string
  avatar: string
  platform: string
  feishuConfig: FeishuPlatformConfig
}

export class DeployConfig {
  version = '0.0.1'
  ajv: Ajv
  config: DeployConfig = {} as any
  constructor() {
    this.ajv = new Ajv()
  }

  get schema() {
    return {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        desc: {
          type: 'string',
        },
        avatar: {
          type: 'string',
        },
        platform: {
          type: 'string',
          enum: ['feishu'],
        },
        feishuConfig: {
          type: 'object',
          properties: {
            events: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            encryptKey: {
              type: 'string',
            },
            verificationToken: {
              type: 'string',
            },
            scopeIds: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            cardRequestUrl: {
              type: 'string',
            },
            verificationUrl: {
              type: 'string',
            },
          },
          required: ['events', 'encryptKey', 'verificationToken', 'scopeIds', 'cardRequestUrl', 'verificationUrl'],
        },
      },
      required: ['name', 'desc', 'avatar', 'platform', 'feishuConfig'],
    }
  }

  get validate() {
    return this.ajv.compile(this.schema)
  }

  validateConfig(config: object) {
    return this.validate(config)
  }

  async isFileExist(path: string) {
    return fs.pathExistsSync(path)
  }

  isJson(path: string) {
    return path.endsWith('.json')
  }

  isUrl(path: string) {
    // 区别是本地链接还是远程链接
    return path.startsWith('http')
  }

  async loadFile(path: string): Promise<string> {
    if (!await this.isFileExist(path))
      throw new Error('the file is not exist')

    return fs.readFile(path, 'utf-8')
      .catch((error) => {
        // 处理错误，例如文件不存在等情况
        console.error(`Error loading file: ${error.message}`)
        return '' // 或者抛出错误
      })
  }

  // 检验配置文件的schema是否符合
  async validateConfigByPath(path: string) {
    if (!this.isJson(path))
      return false

    const config = await this.loadFile(path)
    return this.validateConfig(JSON.parse(config))
  }

  async loadConfig(path: string) {
    const config = await this.loadFile(path)
    this.config = JSON.parse(config)
  }

  get botName() {
    return this.config.name
  }

  get botDesc() {
    return this.config.desc
  }

  get botAvatar() {
    return this.config.avatar
  }

  get botPlatform() {
    return this.config.platform
  }

  get botFeishuConfig() {
    return this.config.feishuConfig
  }
}