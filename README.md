# picgo-plugin-minio-uploader

picgo-plugin-minio-uploader 是一款  [PicGo](https://github.com/Molunerfinn/PicGo)  的插件。此插件为 PicGo 提供了使用 [MinIO](https://github.com/minio/minio) 对象存储的能力。



## 安装

1. 安装前置依赖：[PicGo-Core](https://picgo.github.io/PicGo-Core-Doc/)

2. 克隆该项目，复制项目到 以下目录，即默认配置目录：
   - windows: `C:\Users\<你的用户名>\.picgo\`
   - linux 和 macOS: `~/.picgo`

3. 切换到 以上目录，执行  `npm install ./picgo-plugin-minio-uploader`，并执行  `picgo set uploader`，选择 `minio` 作为 upload



## 配置

在 picgo 的默认配置目录中，编辑 `config.json` 文件中的 `picBed` 部分：

```json5
{
  "picBed": {
    "uploader": "minio",
    "current": "minio",
    "minio": {
      "endPoint": "<endPoint>", // minio 服务 url
      "accessKey": "<accessKey>", // minio accessKey
      "secretKey": "<secretKey>", // minio secretKey
      "useSSL": true, // 是否使用 https 协议, 默认为 false
      "bucket": "<bucket>", // minio 桶名
      "imageBaseURL": "<imageBaseURL>", // 图片访问的 url 前缀
      "useUUID": true // 是否使用 uuid 作为文件名, 默认为 false
    }
  },
  // ...
}
```
