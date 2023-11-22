/// <reference types="vite/client" />

/** 声明环境变量的类型 */
declare interface ImportMetaEnv {
  VITE_API_PREFIX: string
  VITE_API_BASE_URL: string
  VITE_PUBLIC_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
