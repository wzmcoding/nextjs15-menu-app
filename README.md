## 快速开始
[官方文档](https://www.prisma.io/docs/getting-started/quickstart-sqlite)

```bash
 npm i prisma --save-dev
 npx prisma init --datasource-provider sqlite --output ../generated/prisma
 npx prisma migrate dev
 npx prisma studio
```

## 执行 npx prisma migrate dev 时，Prisma 做了几件事

1. 检查 `schema.prisma` 文件
Prisma 会读取 `prisma/schema.prisma` 文件，里面定义了数据库模型（model）、字段类型、关系等。

2. 检测模型变化
Prisma 对比当前数据库实际的 `schema` 和 `schema.prisma` 定义，找出差异。

3. 生成迁移文件（Migration）
它会在 `prisma/migrations/` 目录下创建一份新的 SQL 文件，记录本次的数据库结构变更（类似“数据库版本管理”）。

4. 自动执行迁移
Prisma 会把生成的迁移文件自动应用到本地数据库，让数据库结构与 `schema.prisma` 保持一致。

5. 更新 Prisma Client
最后 Prisma 会重新生成客户端代码，保证你在项目中用的 Prisma Client API 和最新数据库模型同步。


## npx prisma studio
`npx prisma studio` 是 Prisma 提供的一个可视化数据库管理工具，运行后你会在浏览器里打开一个图形化界面，可以直接查看和编辑数据库数据。
相当于一个轻量版的 Navicat / phpMyAdmin，但专门为 Prisma 项目设计。

### 它做什么

1. 览数据库表和数据
可以直接在浏览器里看到所有模型（Model），每个模型对应数据库中的一张表。

2. 增删改查数据
不用写 SQL，就能直接创建、编辑和删除数据，适合开发阶段快速调试。

3. 实时同步 Prisma Schema
Studio 界面会跟你 `schema.prisma` 里的模型定义保持同步，你改了 schema 再跑 `migrate dev`，刷新 Studio 就能看到最新结构。

4. 跨数据库支持
无论你用的是 PostgreSQL、MySQL、SQLite、SQL Server 还是 MongoDB，都能用 Prisma Studio 可视化管理。



