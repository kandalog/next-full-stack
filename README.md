# todos-full-stack

## 📝 概要

このプロジェクトは、Next.js でフルスタックに開発しつつ、CI/CD の構築をハンズオンで実践するために作成しました。  
教材等をもとにしたプロジェクトではなく、自分で試行錯誤する方法で開発を進めています

---

## 🚀 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/kandalog/next-full-stack.git
cd next-full-stack
```

### 2. パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` を参考に `.env` ファイルを作成してください。

```bash
cp .env.example .env
```

---

## 4 Docker(postgresql)の起動

```bash
$ docker compose up -d
```

---

## 5 prisma setup

```bash
$ npx prisma migrate dev
$ npx prisma generate
```

## 6 開発用サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

---

## 🛠 使用技術

- フレームワーク：Next.js
- 言語：TypeScript
- データベース：PostgreSQL / Supabase
- その他：Tailwind CSS, Prisma, Docker, shadcn/ui
