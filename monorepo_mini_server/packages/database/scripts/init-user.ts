#!/usr/bin/env tsx

import { PrismaClient, UserRole } from '../src/generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function initUser() {
  try {
    console.log('🚀 开始初始化用户...');

    // 检查是否已经存在用户
    const existingUser = await prisma.user.findFirst({
      where: {
        username: 'zhangjing',
      }
    });

    if (existingUser) {
      console.log('⚠️  用户 zhangjing 已存在，跳过创建');
      console.log(`   用户ID: ${existingUser.id}`);
      console.log(`   用户名: ${existingUser.username}`);
      console.log(`   角色: ${existingUser.role}`);
      return;
    }

    // 生成加密密码
    const password = '123456'; // 默认密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username: 'zhangjing',
        password: hashedPassword,
        email: 'zhangjing@stepfun.com',
        role: UserRole.ROOT,
        description: 'root 用户'
      }
    });

    console.log('✅ 用户创建成功！');
    console.log(`   用户ID: ${user.id}`);
    console.log(`   用户名: ${user.username}`);
    console.log(`   邮箱: ${user.email}`);
    console.log(`   角色: ${user.role}`);
    console.log(`   创建时间: ${user.createdAt}`);
    console.log(`   默认密码: ${password}`);
    console.log('\n🔐 请记得修改默认密码！');

  } catch (error) {
    console.error('❌ 创建用户失败:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行脚本
initUser()
  .catch((error) => {
    console.error('❌ 脚本执行失败:', error);
    process.exit(1);
  }); 