# next-cli

### **dev**

```bash

# concurrent olarak cli ve template degisikliklerini izleyip derler ve basarili derlemelerde global yukleme yapar
# artik bu komutu kullanalim terminal kirliligi olusmasin
npm run dev:all

```

```bash
npm run dev:cli # src deki degisiklikleri izleyip lib'e derler
npm run dev:global # her basarili derlemeden sonra paketi npm i -g ile global olarak yukler
npm run dev:template # template icindeki saofile.ts'i sao icin derler
```

```bash
npm run dev:template # template dosyasini izleyip derler
```

### **build**

```bash
npm run build:cli # ./lib'i temizleyip tsc ile build alir
npm run build:template # template dosyasini derler
npm run build:all # cli ve template icin build alir
```

### **cli'i calistirma**

```bash
# run
next-cli <project-dir> [options]
```

```bash
# help
next-cli --help
```


## not

development ortamini kurmak icin bir terminal penceresinde `npm run dev:all` calistirip bir diger pencerede `next-cli` diyelim
