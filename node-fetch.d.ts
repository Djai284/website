// If you're using TypeScript, you may need to add type declarations for node-fetch
// Create a file called node-fetch.d.ts in your project root:

declare module 'node-fetch' {
  export default function fetch(url: string, init?: RequestInit): Promise<Response>;
  export class Request extends globalThis.Request {}
  export class Response extends globalThis.Response {}
  export class Headers extends globalThis.Headers {}
}