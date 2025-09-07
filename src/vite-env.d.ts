// FIX: Correctly augment the `process.env` type by extending the `NodeJS.ProcessEnv`
// interface. This resolves the error about redeclaring the `process` variable.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
