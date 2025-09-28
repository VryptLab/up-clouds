# up-clouds

[![npm version](https://img.shields.io/npm/v/up-clouds.svg?style=flat&color=blue)](https://www.npmjs.com/package/up-clouds)
[![npm downloads](https://img.shields.io/npm/dm/up-clouds.svg?color=orange)](https://www.npmjs.com/package/up-clouds)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**up-clouds** adalah package Node.js/TypeScript untuk mengunggah file ke berbagai layanan *cloud file hosting* seperti **Catbox** dan **Litterbox**, dengan API yang konsisten, modular, dan mudah digunakan.

---

## Instalasi

```bash
npm install up-clouds
# atau
yarn add up-clouds
# atau
pnpm add up-clouds
```

---

## Penggunaan

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
- Upload permanen, cocok untuk file yang ingin disimpan jangka panjang.

### Litterbox
- Upload sementara dengan opsi kedaluwarsa:  
  - `1h` (1 jam)  
  - `12h` (12 jam)  
  - `24h` (1 hari)  
  - `72h` (3 hari)  

### Pmof2 *(coming soon)*
- Upload dengan fitur tambahan (akan tersedia pada rilis berikutnya).

---

[English version](README_EN.md)

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](./LICENSE).
