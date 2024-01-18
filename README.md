# Montri เว็บแอปพลิเคชันสำหรับตรวจสอบการจัดเก็บอุปกรณ์

เป็นเว็บแอพพลิเคชันที่พัฒนาด้วย Vue, Java script, Cloud Firebase

```bash
|── firebase-export
|── functions
|── node_modules
│──  public
│── src
│   │── assets
│   │   |──  image
|   |   |──     └── Store-house.jpg
|   |── components
│   │   |──  icon
|   |   |──     |──  Confirm.vue
|   |   |       |──  Edit.vue
|   |   |        └── Trash.vue
|   |   |── Table.vue
|   |── layouts
|   |   |── AdminLayout.vue
|   |   |── LoginLayout.vue
|   |── router
|   |   |── index.js
|   |── stores
|   |   |── Admin
|   |   |       └── product.js
|   |   |── account.js
|   |   |── counter.js
|   |   |── events.js
|   |── views
|   |   |── Admin
|   |   |──     └──  HomepageView.vue
|   |   |── Details
|   |   |──     └──  Detailview.vue
|   |   |── Products
|   |   |──     |──  AddPoductView.vue
|   |   |       |──  DropcheckView.vue
|   |   |       |──  ProductView.vue
|   |   |       |──  UpdateProductView.vue
|   |   |        └── UploadProductView.vue
|   |   |── LoginView.vue
|   |   |── ProfileView.vue
│   ├── app.vue
│   ├── firebase.js
│   ├── main.js
│   ├── style.css
|── index.html
|── firebase.json
|── firestore.rules
|── package.json
|── storage.rules
|── tailwind.config.js
|── README.md
```
## ขั้นตอนในการติดตั้ง
1. ติดตั้ง node version 18.18.2 โดย copy ผ่านเว็บ https://www.npmjs.com/package/node/v/18.18.2
```
npm i node@18.18.2
```

2. ติดตั้ง git ผ่าน Command Prompt หรือ Powershell ผ่านคำสั่ง
```
winget install --id Git.Git -e --source winget
```
3. ใช้คำสั่ง git clone เพื่อทำการคัดลอกโปรเจกต์
```
git clone https://github.com/ppthana/Montri.git
```
4. ติดตั้ง node module ผ่านคำสั่ง
```
npm install
```

5. เมื่อทำการลง package ทั้งหมดเรียบร้อยและสามารถ run คำสั่ง npm run dev ได้แล้วให้ ทำการเปิด terminal หรือ command promt ขึ้นมาและ cd เข้าไปใน project และใช้คำสั่งเพื่อ run emulator ของ could firebase 
```
firebase emulators:start
หรือ
firebase emulators:start --import ./firebase-export --export-on-exit ./firebase-export
```
