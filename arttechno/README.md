# เว็บผู้เรียน — ศิลปะและเทคโนโลยี (Art and Technology)

Static site (HTML / CSS / JS) สำหรับนักศึกษาติดตามรายวิชา **3500230** 15 สัปดาห์  
**ไม่มี build step** · ไม่พึ่ง CDN ฟอนต์ · อัปโหลดโฟลเดอร์ขึ้น Hostinger VPS แล้วชี้ document root ได้ทันที

**เวอร์ชันไซต์:** 2026-07-30 (v1 revision)

## โครงสร้าง

```
site/
  index.html          แดชบอร์ด · ตอนนี้ / ถัดไป / หมุดหมาย
  about.html          เกี่ยวกับรายวิชา / LO / คะแนน / ตัวตนรายวิชา
  tools.html          ชุดเครื่องมือฟรี + สถานะ + ทางเลือก
  ethics.html         จริยธรรม + แม่แบบ disclosure คัดลอก/พิมพ์ได้
  projects.html       กลางภาค + ปลายภาค 3 เส้นทาง
  resources.html      แหล่งเรียนรู้และลิงก์ภายนอก
  assets/
    hero-bg.mp4       วิดีโอพื้นหลัง hero (ถ้ามี)
    hero-still.jpg    โปสเตอร์สำรองเมื่อวิดีโอไม่โหลด
  weeks/
    index.html        แผนที่ 15 สัปดาห์ + ตัวกรอง
    week-01.html … week-15.html
  css/styles.css      ธีม night rehearsal room / digital score
  js/
    layout.js         เมนู / ท้ายหน้า (data-nav)
    course-data.js    เนื้อหาหลัก — แก้ที่นี่เมื่ออัปเดตคอร์ส
    main.js           progress, dashboard, เรนเดอร์สัปดาห์, copy
  README.md
```

## ฟอนต์ Sarabun

ไซต์ใช้ **Sarabun** แบบ self-host (ไม่พึ่ง CDN) — วางไฟล์ต่อไปนี้ใน `assets/fonts/`:

```
Sarabun-Regular.woff2
Sarabun-Italic.woff2
Sarabun-Medium.woff2
Sarabun-SemiBold.woff2
Sarabun-Bold.woff2
```

ดาวน์โหลดจาก Google Fonts (OFL) แล้วแปลงเป็น woff2  
ถ้ายังไม่มีไฟล์ ไซต์จะถอยไปใช้ Leelawadee UI / ฟอนต์ไทยของระบบโดยอัตโนมัติ — ไม่พัง

## แก้ไขเนื้อหา

| ต้องการเปลี่ยน | แก้ไฟล์ |
|----------------|---------|
| สัปดาห์ปัจจุบัน / ประกาศสั้น | `js/course-data.js` → `meta.currentWeek`, `meta.notice` |
| หัวข้อสัปดาห์ งานส่ง prompt ลิงก์ | `js/course-data.js` → `weeks` |
| เครื่องมือ / LO / โครงงาน / แหล่งเรียนรู้ | `js/course-data.js` |
| สี ฟอนต์ เลย์เอาต์ | `css/styles.css` |
| รายการเมนู | `js/layout.js` |

### ตั้งค่าสัปดาห์ปัจจุบัน (อาจารย์)

ใน `js/course-data.js` → `COURSE.meta`:

```js
currentWeek: 0,   // 0 = ก่อนเปิดภาค; 1–15 = สัปดาห์ที่กำลังสอน
notice: "",       // ข้อความประกาศสั้น; ว่าง = ซ่อน
lastUpdated: "2026-07-30"
```

ไม่ auto-advance จากวันที่ — ตั้งค่าเองเมื่อเลื่อนคาบ/วันหยุด

หลังแก้ `course-data.js` รีเฟรชเบราว์เซอร์ (hard refresh ถ้า cache) — ไม่ต้อง build

## ทดลองบนเครื่อง (local)

```bash
cd site
python3 -m http.server 8080
```

เปิด <http://localhost:8080>  
(แนะนำใช้ local server มากกว่าเปิดไฟล์ตรง ๆ — บางเบราว์เซอร์จำกัด `file://` และ clipboard)

## เผยแพร่บน Hostinger VPS

### แบบง่าย — อัปโหลด static

1. เชื่อมต่อ VPS (SSH หรือ File Manager)
2. คัดลอก**ทั้งโฟลเดอร์** `site/` ไปที่ document root เช่น  
   - `/var/www/arttechno/`  
   - หรือ `public_html/arttechno/`  
3. ตั้ง virtual host / subdomain ให้ชี้ที่โฟลเดอร์นั้น  
4. เปิด HTTPS (Let's Encrypt ผ่าน Hostinger หรือ certbot)

### ตัวอย่าง Nginx

```nginx
server {
    listen 80;
    server_name arttechno.yourdomain.com;
    root /var/www/arttechno;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~* \.(css|js|mp4|jpg|png|webp)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

### ตัวอย่าง Apache (`.htaccess` ใน root ของไซต์)

```apache
DirectoryIndex index.html
Options -Indexes
```

### ซับพาธ (เช่น `https://domain.com/arttechno/`)

อัปโหลดเนื้อใน `site/` ไปที่ `public_html/arttechno/`  
ลิงก์ในไซต์เป็นแบบ relative อยู่แล้ว ใช้ได้โดยไม่ต้องแก้ base URL

## คุณสมบัติฝั่งผู้เรียน

- แดชบอร์ด: ตอนนี้ / ถัดไป / หมุดหมาย W8·W15 / โครงภาคเรียน  
- แผน 15 สัปดาห์ + ตัวกรองประเภทและเครื่องมือ + นับผลลัพธ์  
- หน้าละเอียดแต่ละสัปดาห์: แผงงานสัปดาห์นี้ · คัดลอก prompt · เครื่องมือ · disclosure  
- แม่แบบเปิดเผยการใช้ AI คัดลอก/พิมพ์ได้ (ไม่ส่งข้อมูลไปเซิร์ฟเวอร์)  
- ทำเครื่องหมาย “ผ่านสัปดาห์นี้แล้ว” ใน `localStorage` คีย์ `arttechno-week-done-v2` — **ไม่ใช่ระบบคะแนน**  
- ล้างความคืบหน้าในเครื่องได้จากหน้าแรก  
- รองรับมือถือ (เป้าสัมผัส 44px) · พิมพ์ handout ได้ (พื้นขาว)  
- ฟอนต์ระบบ — ใช้ได้แม้ไม่มีเน็ต/CDN  

## ทดสอบสั้น ๆ ก่อน deploy

1. เปิดทุกหน้าหลัก + สัปดาห์ 1, 8, 15 — ไม่มี error ใน console  
2. เมนูมือถือ: เปิด/ปิด/Escape · มี `aria-current` เพียงหนึ่งรายการ  
3. ตัวกรองสัปดาห์ + รีเซ็ต + นับจำนวน  
4. คัดลอก prompt / แม่แบบ disclosure  
5. ทำเครื่องหมายสัปดาห์ → รีโหลดยังอยู่ → ล้างความคืบหน้า  
6. `currentWeek: 0` แสดงสถานะก่อนเปิดภาค  
7. พิมพ์หน้า ethics / สัปดาห์ — พื้นขาว อ่านได้  

## สิ่งที่ยังไม่ใช่

- ไม่มี login / ไม่เก็บงานผู้เรียนบนเซิร์ฟเวอร์  
- ไม่แทนที่ Blackboard / Google Classroom / ระบบคะแนน  
- วันกำหนดเป็น**เป้า** — ยืนยันกับปฏิทินจุฬาฯ  
- ไม่มี analytics / service worker / framework  

## แหล่งต้นทางในรีโป

- แผนรายวิชา: `../arttechnoplan-th.md`
- สเปกไซต์ v1: `../artechnositev1.md`
- แหล่ง beginner: `../resources-beginner-ai-th.md`
- ข้อจำกัดแล็บ: `../arttechno.md`
