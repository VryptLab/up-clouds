# up-clouds

[![npm version](https://img.shields.io/npm/v/up-clouds.svg?style=flat&color=blue)](https://www.npmjs.com/package/up-clouds)
[![npm downloads](https://img.shields.io/npm/dm/up-clouds.svg?color=orange)](https://www.npmjs.com/package/up-clouds)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**up-clouds** adalah package Node.js/TypeScript untuk mengupload file ke berbagai layanan *cloud file hosting* seperti **Catbox** dan **Litterbox**, dengan API yang konsisten, modular, dan mudah digunakan.

---

## Fitur
- Upload ke beberapa provider hanya dengan satu API.
- Modular â†’ mudah menambahkan provider baru.
- Dibangun dengan TypeScript â†’ full type support.
- Ringan, tanpa dependensi berlebihan.
- Asynchronous (Promise-based) â†’ mudah diintegrasikan.

---

## Download

- [npm registry](https://www.npmjs.com/package/up-clouds)  
- [Tarball (latest)](https://registry.npmjs.org/up-clouds/-/up-clouds-1.0.0.tgz)  
- [GitHub Releases](https://github.com/VryptLab/up-clouds/releases)

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
import { Catbox } from "up-clouds";

async function main() {
  const catbox = new Catbox();
  const url = await catbox.upload("./example.png");
  console.log("Uploaded to:", url);
}

main();
```

### Litterbox
```ts
import { Litterbox } from "up-clouds";

async function main() {
  const litterbox = new Litterbox();
  const url = await litterbox.upload("./secret.txt", { expire: "1h" });
  console.log("Temporary file URL:", url);
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

---

## API Reference

### `Catbox.upload(filePath: string): Promise<string>`
Mengupload file ke Catbox.  
- **filePath**: path file lokal.  
- **return**: URL file yang berhasil diupload.  

### `Litterbox.upload(filePath: string, options?: { expire: string }): Promise<string>`
Mengupload file ke Litterbox.  
- **filePath**: path file lokal.  
- **options.expire**: waktu kedaluwarsa file (`1h | 12h | 24h | 72h`).  
- **return**: URL file yang berhasil diupload.  

---

## Pengembangan

Clone repo lalu jalankan:

```bash
git clone https://github.com/VryptLab/up-clouds.git
cd up-clouds
npm install
npm run build
npm test
```

---

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](./LICENSE).  
