"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minio_1 = require("minio");
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("./config"));
const handle = async (ctx) => {
    const minioConfig = ctx.getConfig('picBed.minio');
    if (!minioConfig) {
        throw new Error("Can't find minio config");
    }
    const minioClient = new minio_1.Client({
        endPoint: minioConfig.endPoint,
        accessKey: minioConfig.accessKey,
        secretKey: minioConfig.secretKey,
        useSSL: minioConfig.useSSL,
    });
    const imgList = ctx.output;
    for (const img of imgList) {
        if (img.fileName && img.buffer) {
            let image = img.buffer;
            if (!image && img.base64Image) {
                image = Buffer.from(img.base64Image, 'base64');
            }
            const filename = minioConfig.useUUID
                ? uuid_1.v4() + img.extname
                : img.fileName;
            try {
                await minioClient.putObject(minioConfig.bucket, filename, img.buffer);
            }
            catch (err) {
                ctx.emit('notification', {
                    title: '上传失败',
                    body: '请检查你的配置项是否正确',
                });
                throw err;
            }
            delete img.base64Image;
            delete img.buffer;
            img.imgUrl = `${minioConfig.imageBaseURL}/${minioConfig.bucket}/${filename}`;
        }
    }
    return ctx;
};
module.exports = (ctx) => {
    const register = () => {
        ctx.helper.uploader.register('minio', { handle });
    };
    return {
        uploader: 'minio',
        config: config_1.default,
        register,
    };
};
