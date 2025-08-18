# Basic DevOps

---
## a. Linux Kernel vs Distro

### Linux Kernel
Kernel adalah kode/program bagian paling dalam (lowest level) dari sebuah Operating System (OS). Kernel bertindak sebagai perantara antara software dan hardware.

Linux kernel sendiri adalah kernel yang dikembangkan oleh Linus Torvalds pada tahun 1991 sebagai alternatif gratis dari Unix. 

### Linux Distro
Linux distro (distribution) adalah sebuah OS yang menggunakan linux kernel.

**Sumber:**
- https://www.ibm.com/think/topics/linux-kernel
- https://www.quora.com/What-is-the-difference-between-a-Linux-kernel-and-a-distribution
- https://en.wikipedia.org/wiki/Linux_distribution


---
## b. Linux FHS (File Hierarchy Structure)

**Sumber:**
- https://www.geeksforgeeks.org/linux-unix/linux-file-hierarchy-structure/
- https://www.tembolok.id/memahami-struktur-partisi-dan-file-system-pada-linux/

![Linux FHS](img/Pasted%20image%2020250815200617.png)

FHS adalah aturan yang menentukan struktur folder yang digunakan oleh sistem operasi linux. Aturan ini disesuaikan dengan perkembangan linux, versi terakhir dari aturan FHS adalah versi 3.0 yang dirilis pada tanggal 18 Mei 2015.

![Linux FHS Tree](img/Pasted%20image%2020250815201220.png)


---
## c. Sistem Permission dan Owner pada Linux

Ownership (kepemilikan) di Linux ada 3 jenis:
1. **User (owner)** → biasanya orang yang membuat file.
2. **Group** → sekelompok user yang bisa berbagi akses.
3. **Others** → pengguna lain yang tidak termasuk sebagai owner dan group.

Permission (izin) menentukan apa yang boleh dilakukan tiap jenis ownership terhadap file/direktori:
1. **r (read)** → boleh membaca isi file / melihat isi folder.
2. **w (write)** → boleh mengubah isi file / menambah-menghapus isi folder.
3. **x (execute)** → boleh menjalankan file (jika program/script) / masuk ke folder.

**Contoh:** `-rwxr-xr--`
- `rwx` → owner bisa baca, tulis, jalankan.
- `r-x` → group bisa baca & jalankan, tapi tidak tulis.
- `r--` → others cuma bisa baca.


---
## d. Prinsip Enkripsi pada SSH

**Sumber:**  
https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process

SSH (Secure Shell) menggunakan beberapa teknik enkripsi dan hashing: enkripsi simetris, enkripsi asimetris, dan hashing.

### 1. Enkripsi Simetris
Menggunakan satu kunci untuk enkripsi dan dekripsi. Dalam SSH, digunakan untuk mengamankan seluruh koneksi (bukan autentikasi). Contoh algoritma: AES, Blowfish, 3DES, ChaCha20.

### 2. Enkripsi Asimetris
Menggunakan sepasang kunci: **public key** dan **private key**.  
Digunakan untuk:
- Proses key exchange awal agar tercipta kunci simetris.  
- Autentikasi berbasis SSH key.  

### 3. Hashing
Proses membuat “sidik jari digital” dari data. Dipakai dalam HMAC untuk menjaga integritas pesan.  

**Ringkasan:**
- Enkripsi simetris → melindungi sesi komunikasi dengan satu kunci.  
- Enkripsi asimetris → dipakai untuk key exchange & autentikasi SSH key.  
- Hashing (HMAC) → menjaga integritas pesan.  


---
## e. Perbedaan HTTP dan HTTPS

**Sumber:**  
https://aws.amazon.com/id/compare/the-difference-between-https-and-http/

### Perbedaan
- **HTTP (Hypertext Transfer Protocol)** → komunikasi dalam plaintext, rentan disadap.  
- **HTTPS (Hypertext Transfer Protocol Secure)** → menggunakan SSL/TLS untuk enkripsi.  

### HTTP vs HTTPS

| Aspek        | HTTP | HTTPS |
|--------------|------|-------|
| **Keamanan** | Data plaintext, mudah disadap | Data terenkripsi |
| **Kepercayaan** | Tidak ada verifikasi identitas | SSL/TLS membuktikan keaslian |
| **SEO & User** | Ranking lebih rendah, ikon tidak aman | Lebih dipercaya, ikon gembok |
| **Performa** | Lebih lambat | Lebih cepat & akurat |

### Versi Modern
- HTTP/1.1 (lama)  
- HTTP/2 (lebih cepat, multiplexing)  
- HTTP/3 (real-time, modern)  

👉 Singkatnya: **HTTPS lebih aman, cepat, dan dipercaya dibanding HTTP.**


---
## f. Docker OCI Compliance Standard

**Sumber:**  
https://sudip-says-hi.medium.com/what-is-an-oci-compliant-container-image-61c633b33783

### Apa itu OCI?
Open Container Initiative (OCI) adalah standar industri untuk image & runtime container.  

### Standar OCI
1. **Image Format**  
2. **Runtime**  
3. **Signature**  

### Manfaat
- Portabilitas lintas platform  
- Keamanan (image terverifikasi)  
- Manajemen lebih mudah  

👉 Singkatnya: **OCI menjamin container aman, konsisten, dan portable.**


---
## g. Perbedaan Container dan VM

**Sumber:** _Docker Deep Dive_ oleh Nigel Poulton (2025)

![Container vs VM](img/Pasted%20image%2020250818081530.png)

### Ringkasan
- **VM** → virtualisasi hardware, tiap VM punya OS sendiri.  
- **Container** → virtualisasi OS, lebih ringan & efisien.  

👉 Singkatnya: **VM meniru server fisik, container meniru OS.**


---
## h. Image Layer pada Docker

![Docker Image Layer](img/Pasted%20image%2020250818083611.png)


---
## i. Docker Volume dan Network

### Docker Volume
**Sumber:** _Docker Deep Dive_ oleh Nigel Poulton (2025)

![Docker Volume](img/Pasted%20image%2020250818095244.png)

- Volume adalah penyimpanan terpisah yang tidak hilang meski container dihapus.  
- Bisa dipasang ke banyak container.  

### Docker Network
**Sumber:**  
- _Docker Deep Dive_ oleh Nigel Poulton (2025)  
- https://blog.bytescrum.com/docker-networking-advantages-and-basics  

![Docker CNM](img/Pasted%20image%2020250818095701.png)  
![Docker CNM Components](img/Pasted%20image%2020250818095722.png)

- CNM → Sandbox, Endpoint, Network.  
- Bridge → komunikasi antar container 1 host.  
- Overlay → komunikasi antar container beda host.  


---
## j. Web Server dan Reverse Proxy

### Web Server
Web server adalah software yang melayani permintaan HTTP/HTTPS dari browser, lalu mengirim respon berupa halaman web.  

**Tujuan:**
1. Menyediakan data sesuai permintaan.  
2. Membersihkan cache & dokumen tak terpakai.  
3. Memeriksa keamanan permintaan HTTP.  

### Reverse Proxy
**Sumber:** https://www.biznetgio.com/news/apa-itu-reverse-proxy

Reverse proxy bertindak sebagai perantara antara klien dan server.  
**Tujuan:**
1. Menyembunyikan IP asli pengguna.  
2. Melindungi server dari serangan siber (DDoS, malware, dll).  


---

## Soal
🔗 https://docs.google.com/document/d/1Ci2Sg_J1OJ9YJKaMHXPbC5MLi8En9cgyW5zI36bWV1o/edit?tab=t.0
