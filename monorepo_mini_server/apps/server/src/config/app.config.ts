import { envConfig } from './env.config';

export const appConfig = {
  // JWT配置
  jwt: {
    secret: envConfig.required.JWT_SECRET,
    expiresIn: "24h",
  },
  
  // 服务器配置
  server: {
    port: envConfig.optional.PORT,
    environment: envConfig.optional.NODE_ENV,
    apiUrl: envConfig.required.API_URL,
  },
  
  // 文件上传配置
  upload: {
    maxSize: envConfig.optional.UPLOAD_MAX_SIZE,
    dest: envConfig.optional.UPLOAD_DEST,
  },
  
  // 用户配置
  users: {
    defaultPassword: "123456",
    rootUsername: "zhangjing",
  },
  
  // 数据库配置
  database: {
    url: envConfig.required.DATABASE_URL,
  },

}; 