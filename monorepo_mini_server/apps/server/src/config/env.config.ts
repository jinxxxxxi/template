export interface EnvironmentConfig {
  // 必需的环境变量
  required: {
    JWT_SECRET: string;
    DATABASE_URL: string;
    API_URL: string;
  };
  
  // 可选的环境变量（带默认值）
  optional: {
    NODE_ENV: string;
    PORT: number;
    UPLOAD_MAX_SIZE: number;
    UPLOAD_DEST: string;
  };
}

export const envConfig: EnvironmentConfig = {
  required: {
    JWT_SECRET: process.env.JWT_SECRET || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    API_URL: process.env.API_URL || '',
  },
  
  optional: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '3001'),
    UPLOAD_MAX_SIZE: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760'), // 10MB
    UPLOAD_DEST: process.env.UPLOAD_DEST || './uploads',
  },
};

// 环境变量验证函数
export function validateEnvironment(): void {
  const missingVars: string[] = [];
  
  // 检查必需的环境变量
  Object.entries(envConfig.required).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key);
    }
  });
  
  if (missingVars.length > 0) {
    throw new Error(
      `❌ 缺少必需的环境变量: ${missingVars.join(', ')}\n` +
      '请检查 .env 文件或环境变量配置'
    );
  }
  
  // 验证 JWT_SECRET 长度
  if (envConfig.required.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET 长度不足32位，建议使用更长的密钥');
  }

  console.log('✅ 环境变量验证通过');
  console.log(`   环境: ${envConfig.optional.NODE_ENV}`);
  console.log(`   端口: ${envConfig.optional.PORT}`);
  console.log(`   数据库: ${envConfig.required.DATABASE_URL.substring(0, 10)}...`);
} 