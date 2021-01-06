"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = (ctx) => {
    const minioConfig = ctx.getConfig('picBed.minio') || {};
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
    ];
};
exports.default = config;
