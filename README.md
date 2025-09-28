# up-clouds

[![npm version](https://img.shields.io/npm/v/up-clouds.svg?style=flat&color=blue)](https://www.npmjs.com/package/up-clouds)
[![npm downloads](https://img.shields.io/npm/dm/up-clouds.svg?color=orange)](https://www.npmjs.com/package/up-clouds)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**up-clouds** is a Node.js/TypeScript package for uploading files to various *cloud file hosting* services such as **Catbox** and **Litterbox**, with a consistent, modular, and easy-to-use API.

---

## Installation

```bash
npm install up-clouds
# or
yarn add up-clouds
# or
pnpm add up-clouds
```

---

## Usage

### Catbox
```ts
import { catboxUpload } from "up-clouds";

async function main() {
  const result = await catboxUpload("./example.png");
  console.log("Uploaded to:", result);
}

main();
```

### Litterbox
```ts
import { litterboxUpload } from "up-clouds";

async function main() {
  const result = await litterboxUpload("./example.png", { time: "24h" });
  console.log("Uploaded to:", result);
}

main();
```

---

## Providers

### Catbox
- Permanent upload, suitable for files intended for long-term storage.

### Litterbox
- Temporary upload with expiration options:  
  - `1h` (1 hour)  
  - `12h` (12 hours)  
  - `24h` (1 day)  
  - `72h` (3 days)  

### Pmof2 *(coming soon)*
- Upload with additional features (available in a future release).

---

## License
This project is licensed under the [MIT License](./LICENSE).
