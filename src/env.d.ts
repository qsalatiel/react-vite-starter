/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GET_URL: string
  readonly VITE_API_POST_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
