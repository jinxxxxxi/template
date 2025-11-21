import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // 禁用dts生成，因为Prisma生成的代码使用了不兼容的语法
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['@prisma/client'], // 将Prisma客户端标记为外部依赖
}); 