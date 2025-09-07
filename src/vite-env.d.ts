// FIX: Replaced the content of this file to resolve a type definition error
// and to provide types for `process.env` as required by the updated geminiService.ts.
declare var process: {
  env: {
    API_KEY: string;
  };
};
