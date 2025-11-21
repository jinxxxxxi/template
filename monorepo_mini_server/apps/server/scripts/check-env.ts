#!/usr/bin/env tsx

import { validateEnvironment, envConfig } from '../src/config/env.config';

console.log('🔍 检查环境变量配置...\n');

try {
  // 验证环境变量
  validateEnvironment();
  
  console.log('\n📋 当前环境变量配置:');
  console.log('========================');
  
  // 显示必需的环境变量
  console.log('\n🔐 必需的环境变量:');
  Object.entries(envConfig.required).forEach(([key, value]) => {
    const maskedValue = key.includes('SECRET') || key.includes('PASSWORD') 
      ? '*'.repeat(Math.min(value.length, 8)) + '...'
      : value;
    console.log(`   ${key}: ${maskedValue}`);
  });
  
  // 显示可选的环境变量
  console.log('\n⚙️  可选的环境变量:');
  Object.entries(envConfig.optional).forEach(([key, value]) => {
    console.log(`   ${key}: ${value}`);
  });
  
  console.log('\n✅ 环境变量检查完成！');
  
} catch (error) {
  console.error('\n❌ 环境变量检查失败:');
  console.error(error instanceof Error ? error.message : String(error));
  console.log('\n💡 请参考 ENV_SETUP.md 文件进行配置');
  process.exit(1);
} 