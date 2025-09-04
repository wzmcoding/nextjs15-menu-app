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

## 餐饮系统

改了 `schema.prisma`, 不迁移，应用更改，执行 `npx prisma db push --force-reset`

### 使用`shadcn`

- `npx shadcn@latest init`
- `npm i @radix-ui/react-collapsible`

### 代码规范格式化 prettier

- `npm i --save-dev prettier prettier-plugin-tailwindcss`

## nextjs15的路由

```cpp
app/
  (dashboard)/         // () 括号命名的“路由组”
    _components/       // 下划线开头的文件夹，不会生成路由
      dashboard-layout.tsx
    admin/
      page.tsx         // 访问路径 /admin
    layout.tsx         // 包裹 dashboard 组下所有子路由
```

🧩 Next.js App Router 的路由规则

1. `page.tsx`

- `page.tsx`是一个**路由页面文件**，对应一个实际访问路径
- 例如：
    - `app/(dashboard)/admin/page.tsx` ➜ 路径是 `/admin`
    - `（(dashboard)` 不会出现在 URL 中，因为括号是路由分组）

```tsx
// page.tsx
export default function AdminPage() {
    return <div>Admin Dashboard</div>;
}
```

2. `layout.tsx`

- `layout.tsx`是一个**布局文件**，包裹当前目录及子目录的所有 `page.tsx`。
- 你的 `app/(dashboard)/layout.tsx`代码

```tsx
import {DashboardLayout} from "@/app/(dashboard)/_components/dashboard-layout";

type LayoutProps = { children: React.ReactNode };

export default function Layout({children}: LayoutProps) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

```

- 作用：
    - 所有 `(dashboard)` 路由组下的页面都会用 `DashboardLayout` 包裹，比如 `/admin` 页面。
    - 可以做导航栏、侧边栏、统一布局。

3. `dashboard`路由分组

- `()`命名的文件夹是**路由分组**
- 它本身不会出现在 URL 中，只是用来组织代码。
- 好处：
    - 不影响访问路径
    - 可将不同的页面逻辑（如 `dashboard、auth`）分开存放。
      比如：

```bash
app/(dashboard)/admin/page.tsx  => /admin
app/(auth)/login/page.tsx      => /login
```

4. `_components`下划线文件夹

- `_`开头的文件或目录不会生成路由
- 适合放组件、工具文件、不会被Nextjs当做页面
- 你这里 `_components/dashboard-layout.tsx` 就是组件库文件。

5. 嵌套路由

- 目录结构天然支持嵌套路由，不需要像 React Router 手动配置。
- 比如：

```bash
app/dashboard/page.tsx   => /dashboard
app/dashboard/settings/page.tsx => /dashboard/settings
```

6. 动态路由

- 用`[]`表示动态路径
- 例如 `app/blog/[id]/page.tsx`
    - `/blog/1` `/blog/2`都会匹配到

```tsx
// app/blog/[id]/page.tsx
export default function BlogPage({params}: { params: { id: string } }) {
    return <div>Blog ID: {params.id}</div>;
}
```

7. 捕获所有路由

- 用`[...slug]`捕获多层路径
    - `/docs/a/b/c`都会匹配

```tsx
// app/docs/[...slug]/page.tsx
export default function DocsPage({params}: { params: { slug: string[] } }) {
    return <div>{params.slug.join("/")}</div>;
}
```

8. 特殊文件

   | 文件名 | 作用 |
                                                                                                   | --------------- | -------------------------- |
   | `layout.tsx`    | 布局，作用域为当前文件夹及子路由 |
   | `template.tsx`  | 每次渲染都会重新挂载的布局 |
   | `loading.tsx`   | 页面加载中的占位内容 |
   | `error.tsx`     | 捕获页面渲染错误 |
   | `not-found.tsx` | 处理 404 场景 |
   | `head.tsx`      | 定制 HTML `<head>` 内容 |
   | `default.tsx`   | 和 Parallel Routes（并行路由）一起用 |

9. 并行路由 & 括号路由
   Next.js 15 支持 Parallel Routes，可以在 app 下用 @slot 文件夹实现多个并行内容渲染：

```bash
app/@sidebar/page.tsx  -> 渲染 Sidebar
app/@main/page.tsx     -> 渲染 Main
```

## 🔥 总结：

- `page.tsx`：页面路由
- `layout.tsx`：布局组件，包裹子路由
- `(folder)`：分组，不影响路径
- `[_folder]`：动态路径
- `_folder`：不会生成路由
- `...slug`：捕获所有路径
- 还有 `error.tsx`、`loading.tsx` 等提升体验
- 你的项目 `admin/page.tsx` 对应 `/admin`，因为 `(dashboard)` 只是分组，不出现在路径中。

## 布局组件实现

```bash
npx shadcn@latest add separator
```

### 动画库安装

```bash
npm install motion
```

## 主题切换

```bash
npm i next-themes
```

## react query 使用

```bash
npm i @tanstack/react-query
```

React Query 的主要目的是简化前端应用中对服务器数据的获取、缓存、同步和更新，让你不用再手写一堆
`useEffect + fetch + useState`
的样板代码，还能轻松处理加载、错误、缓存、重试、分页、预取等复杂场景。它就像是“数据状态管理器”，专注于“服务器状态”而非本地 UI
状态。

### 核心价值：

1. 管理服务器状态

- 服务器数据和本地 UI 状态不同，可能在多个页面共享，还会随着用户操作或后台变动而不断更新。
- React Query 自动帮你缓存和同步这些数据，避免你在多个组件里重复发请求或手动维护数据。

2. 自动缓存和数据同步

- 同一请求只发一次，下次用缓存。
- 切换页面回来时自动刷新（后台同步）。
- 自动识别数据“是否过期”，过期就刷新，保持最新。

3. 加载和错误状态管理

- 它提供了 `isLoading`、`isError`、`isSuccess` 等状态，你不用自己维护 loading/error 变量了。

4. 减少样板代码

- 用 `useQuery` 一行搞定数据获取，不再写冗长的 `useEffect` 和 `useState`。

5. 支持更多高级功能

- 请求重试机制
- 分页、无限滚动
- 预取数据（Prefetch）
- 乐观更新（Optimistic Update）
- 服务端渲染（SSR）和静态生成（SSG）支持

简单例子：

```tsx
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

async function fetchUser() {
    const {data} = await axios.get('/api/user')
    return data
}

function UserInfo() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['user'], // 缓存和识别数据的key
        queryFn: fetchUser, // 请求函数
    })

    if (isLoading) return <p>加载中...</p>
    if (error) return <p>出错了</p>

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.email}</p>
        </div>
    )
}

```

一句话总结：
**React Query 的目的就是让前端开发者专注业务逻辑，不再被数据请求和状态同步的细节拖累，实现“自动化的数据获取和缓存管理”**

## 错误处理，鉴权

```bash
npm i zod zod-validation-error next-auth@beta
```



