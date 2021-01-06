import PicGo from 'picgo/dist/src/core/PicGo';
import { IPluginConfig } from 'picgo/dist/src/types';
/** Minio 图床配置项 */
export interface MinioConfig {
    endPoint: string;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    /** 存储空间名 */
    bucket: string;
    /** 图片链接前缀 **/
    imageBaseURL: string;
    /** 是否使用 uuid 生成文件名 **/
    useUUID: boolean;
}
declare const config: (ctx: PicGo) => IPluginConfig[];
export default config;
