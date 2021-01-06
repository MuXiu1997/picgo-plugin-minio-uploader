import { Client } from 'minio'
import { v4 as uuidv4 } from 'uuid'
import { MinioConfig } from './config'
import { IPicGo, IPicGoPluginInterface } from 'picgo/dist/src/types'
import config from './config'

const handle = async (ctx: IPicGo): Promise<IPicGo> => {
  const minioConfig = ctx.getConfig<MinioConfig>('picBed.minio')
  if (!minioConfig) {
    throw new Error("Can't find minio config")
  }
  const minioClient = new Client({
    endPoint: minioConfig.endPoint,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey,
    useSSL: minioConfig.useSSL,
  })
  const imgList = ctx.output
  for (const img of imgList) {
    if (img.fileName && img.buffer) {
      let image = img.buffer
      if (!image && img.base64Image) {
        image = Buffer.from(img.base64Image, 'base64')
      }
      const filename = minioConfig.useUUID
        ? uuidv4() + img.extname
        : img.fileName
      try {
        await minioClient.putObject(minioConfig.bucket, filename, img.buffer)
      } catch (err) {
        ctx.emit('notification', {
          title: '上传失败',
          body: '请检查你的配置项是否正确',
        })
        throw err
      }
      delete img.base64Image
      delete img.buffer
      img.imgUrl = `${minioConfig.imageBaseURL}/${minioConfig.bucket}/${filename}`
    }
  }
  return ctx
}

module.exports = (ctx: IPicGo): IPicGoPluginInterface => {
  const register: (ctx?: IPicGo) => void = () => {
    ctx.helper.uploader.register('minio', { handle })
  }
  return {
    uploader: 'minio',
    config,
    register,
  }
}
