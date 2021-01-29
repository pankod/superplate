# superplate

### **dev**

# watch and install
```bash

# src icindeki degisiklikleri izleyip buildi gunceller, her basarili build sonrasinda paketi global olarak yukler.
npm run dev:global

# src icindeki degisiklikleri izleyip buildi gunceller.
npm run dev:cli

```

# test cli
```bash

# cli'i build icerisinden calistirmak icin
node lib/index.js <project-dir> [options] 

# cli'i global yukledikten sonra calistirmak icin
superplate <project-dir> [options]

```

# debug option

test ederken daha fazla log almak, npm install ve git init scriptlerini atlamak icin `-d` veya `--debug` optionlarini gondererek calistirabiliriz.

### **build**

```bash
npm run build:cli # ./lib'i temizleyip tsc ile build alir
```

### **cli'i calistirma**

```bash
# run
superplate <project-dir> [options]
```

```bash
# help
superplate --help
```

