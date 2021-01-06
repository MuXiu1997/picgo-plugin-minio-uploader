import PicGo from 'picgo/dist/src/core/PicGo'
import { IPluginConfig } from 'picgo/dist/src/types'

/** Minio 图床配置项 */
export interface MinioConfig {
  endPoint: string
  accessKey: string
  secretKey: string
  useSSL: boolean
  /** 存储空间名 */
  bucket: string
  /** 图片链接前缀 **/
  imageBaseURL: string
  /** 是否使用 uuid 生成文件名 **/
  useUUID: boolean
}

const config = (ctx: PicGo): IPluginConfig[] => {
  const minioConfig =
    ctx.getConfig<MinioConfig>('picBed.minio') || ({} as MinioConfig)
  return [
    {
      name: 'endPoint',
      type: 'input',
      default: minioConfig.endPoint || '',
      required: true,
    },
    {
      name: 'accessKey',
      type: 'input',
      default: minioConfig.accessKey || '',
      required: true,
    },
    {
      name: 'secretKey',
      type: 'password',
      default: minioConfig.secretKey || '',
      required: true,
    },
    {
      name: 'useSSL',
      type: 'confirm',
      default: minioConfig.useSSL || false,
      required: false,
    },
    {
      name: 'bucket',
      type: 'input',
      default: minioConfig.bucket || '',
      required: true,
    },
    {
      name: 'imageBaseURL',
      type: 'input',
      default: minioConfig.imageBaseURL || '',
      required: true,
    },
    {
      name: 'useUUID',
      type: 'confirm',
      default: minioConfig.useUUID || false,
      required: false,
    },
  ]
}

export default config
