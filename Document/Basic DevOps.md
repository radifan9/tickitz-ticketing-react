
## a. Linux Kernel vs Distro

### Linux Kernel
Kernel adalah kode/program bagian paling dalam (lowest level) dari sebuah Operating System (OS). Kernel bertindak sebagai perantara antara software dan hardware.

Linux kernel sendiri adalah kernel yang dikembangkan oleh Linus Torvalds pada tahun 1991 sebagai alternatif gratis dari Unix. 

### Linux Distro
Linux distro (distribution) adalah sebuah OS yang menggunakan linux kernel.


sumber : 
https://www.ibm.com/think/topics/linux-kernel
https://www.quora.com/What-is-the-difference-between-a-Linux-kernel-and-a-distribution
https://en.wikipedia.org/wiki/Linux_distribution


---
## b. Linux FHS (File Hierarchy Structure)
sumber :
- https://www.geeksforgeeks.org/linux-unix/linux-file-hierarchy-structure/
- https://www.tembolok.id/memahami-struktur-partisi-dan-file-system-pada-linux/

![[Pasted image 20250815200617.png]]
FHS adalah aturan yang menentukan struktur folder yang digunakan oleh sistem operasi linux. Aturan ini disesuaikan dengan perkembangan linux, versi terakhir dari aturan FHS adalah versi 3.0 yang dirilis pada tanggal 18 Mei 2015.

![[Pasted image 20250815201220.png]]


---
## c. Sistem Permission dan Owner pada Linux
Ownership (kepemilikan) di Linux ada 3 jenis:
1. User (owner) → biasanya orang yang membuat file.
2. Group → sekelompok user yang bisa berbagi akses.
3. Others → pengguna lain yang tidak termasuk sebagai owner dan group

Permission (izin) menentukan apa yang boleh dilakukan tiap jenis ownership tadi terhadap file/direktori:
1. r (read) → boleh membaca isi file / melihat isi folder.
2. w (write) → boleh mengubah isi file / menambah-menghapus isi folder.
3. x (execute) → boleh menjalankan file (jika program/script) / masuk ke folder.

Contoh: `-rwxr-xr--`
- rwx → owner bisa baca, tulis, jalankan.
- r-x → group bisa baca & jalankan, tapi tidak tulis.
- r-- → others cuma bisa baca.


---
## d. Prinsip enkripsi pada SSH
sumber : https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process

Memahami Enkripsi Simetris, Asimetris, dan Hash pada SSH

Untuk mengamankan komunikasi, SSH (Secure Shell) menggunakan beberapa teknik enkripsi dan hashing. Tiga konsep utama yang dipakai adalah enkripsi simetris, enkripsi asimetris, dan hash.


### 1. Enkripsi Simetris
Enkripsi simetris menggunakan satu kunci yang sama untuk enkripsi maupun dekripsi. Artinya, siapa pun yang memiliki kunci tersebut bisa membaca dan menulis pesan.
Dalam SSH, enkripsi simetris digunakan untuk mengamankan seluruh koneksi (bukan untuk autentikasi). Kunci rahasia ini dibuat melalui proses key exchange, di mana client dan server berbagi data publik lalu menghasilkan kunci yang sama secara independen.
Beberapa algoritma simetris yang digunakan SSH misalnya AES, Blowfish, 3DES, CAST128, dan ChaCha20. Pemilihan algoritma ditentukan berdasarkan daftar preferensi client dan server.


### 2. Enkripsi Asimetris
Enkripsi asimetris menggunakan sepasang kunci:
- Public key: boleh dibagikan ke siapa saja
- Private key: harus dirahasiakan

Public key hanya bisa digunakan untuk mengenkripsi, sedangkan private key digunakan untuk mendekripsi.

Dalam SSH, enkripsi asimetris dipakai untuk:

1. Proses awal pertukaran kunci (key exchange) agar tercipta kunci simetris.
2. Autentikasi berbasis SSH key. Client membuat pasangan kunci, lalu public key disimpan di server (file ~/.ssh/authorized_keys). Saat login, server menguji apakah client memiliki private key yang sesuai.


### 3. Hashing
Hashing adalah proses membuat “sidik jari digital” dari suatu data. Hash:
- Tidak bisa dibalik ke data asli.
- Berubah total jika data sedikit saja diubah.
- Digunakan untuk integritas data.

Dalam SSH, hashing dipakai pada HMAC (Hash-based Message Authentication Code) untuk memastikan pesan yang diterima tidak diubah di tengah jalan. Setiap paket data dilengkapi MAC agar keaslian dan integritas bisa diverifikasi.

Ringkasan
- Enkripsi simetris → melindungi seluruh sesi komunikasi dengan satu kunci rahasia.
- Enkripsi asimetris → digunakan untuk pertukaran kunci dan autentikasi berbasis SSH key.
- Hashing (HMAC) → memastikan pesan tetap utuh dan tidak dimodifikasi.
Dengan kombinasi tiga mekanisme ini, SSH mampu memberikan komunikasi yang aman antara client dan server.


---
## e. Perbedaan antara HTTP dan HTTPS
sumber : https://aws.amazon.com/id/compare/the-difference-between-https-and-http/


**HTTP (Hypertext Transfer Protocol)** adalah protokol komunikasi antara browser dan server. Data ditransmisikan dalam bentuk **plaintext**, sehingga bisa disadap pihak ketiga.

**HTTPS (Hypertext Transfer Protocol Secure)** adalah versi lebih aman dari HTTP. Ia menambahkan lapisan enkripsi dengan **SSL/TLS** agar data terlindungi saat dikirim.

### Cara Kerja

- **HTTP**: Browser mengirim permintaan (GET, POST, dll.), server membalas dengan respons (misalnya kode 200 OK atau 404 Not Found). Semua data dikirim tanpa enkripsi.
    
- **HTTPS**: Browser dan server terlebih dahulu melakukan **handshake SSL/TLS** untuk memverifikasi sertifikat dan membuat kunci sesi rahasia. Setelah itu, semua data ditransmisikan secara **terenkripsi**.
    

### HTTP vs HTTPS

|Aspek|HTTP|HTTPS|
|---|---|---|
|**Keamanan**|Data plaintext, mudah disadap|Data terenkripsi, aman dari penyadapan|
|**Kepercayaan**|Tidak ada verifikasi identitas|Sertifikat SSL/TLS membuktikan keaslian|
|**SEO & User**|Ranking lebih rendah di mesin pencari, ikon tidak aman di browser|Lebih dipercaya, ikon gembok di browser|
|**Performa**|Lebih lambat, rujukan analitik kurang akurat|Lebih cepat, analitik lebih akurat|

### Versi Modern

- **HTTP/1.1**: Versi lama.
    
- **HTTP/2**: Lebih cepat, berbasis biner, mendukung multiplexing.
    
- **HTTP/3**: Dirancang untuk streaming real-time dan kebutuhan modern.
    
- **HTTPS** saat ini umumnya menggunakan **HTTP/2 + SSL/TLS**, dan ke depannya akan beralih ke **HTTP/3**.
    

---

👉 Singkatnya: **HTTP itu dasar komunikasi web, tapi tidak aman. HTTPS adalah versi terenkripsi yang lebih cepat, aman, dan dipercaya pengguna maupun mesin pencari.**


---
## f.  Docker OCI Compliance Standard
sumber : https://sudip-says-hi.medium.com/what-is-an-oci-compliant-container-image-61c633b33783

### Apa itu OCI?

**Open Container Initiative (OCI)** adalah proyek Linux Foundation yang menetapkan standar industri untuk **image dan runtime container**. Tujuannya agar pembuatan, distribusi, dan eksekusi container lebih konsisten serta interoperabel. OCI didukung oleh ekosistem besar seperti Docker, Kubernetes, dan Red Hat.

### Standar OCI Compliance
Agar sebuah container image disebut **OCI-compliant**, ia harus mengikuti tiga spesifikasi utama:

1. **Image Format** – aturan cara kemasan, distribusi, dan penyimpanan image.
2. **Runtime** – aturan cara menjalankan dan mengelola container.
3. **Signature** – aturan penandatanganan dan verifikasi image.


### Manfaat

- **Portabilitas**: dapat digunakan lintas platform dan lingkungan.
- **Keamanan**: image bisa diverifikasi & ditandatangani, mencegah manipulasi.
- **Manajemen lebih mudah**: update dan pelacakan image lebih konsisten.

👉 Singkatnya, **OCI compliance menjamin container lebih aman, konsisten, dan dapat digunakan di mana saja.**





---
## g. Perbedaan Container dan VM
Sumber: _Docker Deep Dive_ oleh Nigel Poulton (2025)

![[Pasted image 20250818081530.png]]

*Container* dan *Virtual Machine (VM)* sama-sama teknologi *virtualization* untuk menjalankan aplikasi di laptop, server fisik, maupun cloud. Bedanya:

* *VM* memvirtualisasi **hardware**
* *Container* memvirtualisasi **sistem operasi (OS)**

### Virtual Machine (VM)
Pada VM, hypervisor mengambil alih resource hardware (CPU, RAM, storage, jaringan). Untuk menjalankan aplikasi, hypervisor membuat VM dengan virtual CPU/RAM, lalu di dalamnya dipasang OS dan aplikasi. VM bekerja seolah-olah seperti server fisik.

### Container
Pada container, server langsung menjalankan OS. Lalu dipasang container runtime (misalnya Docker). Saat aplikasi dijalankan, Docker membagi resource OS (proses, filesystem, dll.) dan membungkusnya dalam container. Container tampak seperti OS biasa, tapi lebih ringan.

### Ringkasan
* **VM**: virtualisasi hardware → butuh OS di setiap VM.
* **Container**: virtualisasi OS → lebih efisien, bisa menjalankan lebih banyak aplikasi pada server yang sama.

👉 Singkatnya: **VM meniru server fisik, sedangkan container meniru OS. Container lebih ringan dan efisien dibanding VM.**


---
## Definisi dan manfaat dari image layer pada docker
![[Pasted image 20250818083611.png]]


---
## i. Kegunaan dari penggunaan docker volume dan network beserta contohnya

### Docker Volume
sumber : _Docker Deep Dive_ oleh Nigel Poulton (2025)

![[Pasted image 20250818095244.png]]

**Docker volume** digunakan untuk aplikasi _stateful_ yang menghasilkan atau menyimpan data penting. Volume adalah objek terpisah yang dapat dipasang (_mount_) ke dalam container, dan memiliki siklus hidup sendiri. Artinya, data di volume **tidak hilang meski container dihapus**, bahkan bisa dipasang ke container lain.

#### Alasan Menggunakan Volume
1. **Independen** – volume tidak terikat pada lifecycle container.
2. **Fleksibel** – bisa dihubungkan ke sistem penyimpanan eksternal.
3. **Berbagi data** – beberapa container (bahkan di host berbeda) bisa mengakses volume yang sama.

#### Cara Kerja
- Buat volume → buat container → _mount_ volume ke direktori dalam filesystem container (misalnya `/data`).
- Semua data yang ditulis ke direktori tersebut tersimpan di volume.
- Jika container dihapus, data tetap aman di volume dan bisa digunakan lagi oleh container lain.


### Docker Network
sumber :
- _Docker Deep Dive_ oleh Nigel Poulton (2025)
- https://blog.bytescrum.com/docker-networking-advantages-and-basics


Docker networking dibangun di atas tiga komponen utama:
1. **Container Network Model (CNM)** – spesifikasi desain dasar jaringan Docker.
2. **Libnetwork** – implementasi nyata dari CNM.
3. **Drivers** – memperluas model untuk mendukung topologi jaringan tertentu (misalnya VXLAN overlay).

#### CNM
![[Pasted image 20250818095701.png]]

CNM mendefinisikan tiga elemen utama:
- **Sandbox** → stack jaringan terisolasi dalam container (berisi interface, port, routing, DNS, dll.).
- **Endpoint** → interface virtual yang menghubungkan sandbox ke network.
- **Network** → switch virtual (bridge) yang menghubungkan dan mengisolasi endpoint.


![[Pasted image 20250818095722.png]]

Setiap container memiliki **sandbox sendiri** yang memuat seluruh konfigurasi jaringan. Sandbox ini dihubungkan ke **network** melalui **endpoint**, sehingga container bisa saling berkomunikasi atau dipisahkan sesuai kebutuhan.

#### Kegunaan Docker Network
Docker network memungkinkan **container saling berkomunikasi atau diisolasi**. Dengan **CNM**, tiap container punya **sandbox** (stack jaringan), dihubungkan ke **network** lewat **endpoint**.

#### Contoh Penggunaan
- **Bridge**: Menghubungkan beberapa container dalam satu jaringan virtual (misalnya API ↔ Database).
- **Overlay**: Menghubungkan container di host berbeda dalam cluster.


## j. Definisi dan Tujuan dari Penggunaan Web Server dan Reverse-Proxy
### Web Server
sumber : 

Web server adalah sebuah _software_ (perangkat lunak) yang memberikan layanan berupa data. Berfungsi untuk menerima permintaan HTTP atau HTTPS dari klien atau kita kenal dengan web browser (Chrome, Firefox). Selanjutnya ia akan mengirimkan respon atas permintaan tersebut kepada _client_ dalam bentuk halaman web.

#### Tujuan penggunaan web server:
1. Menyediakan data berdasarkan _request_ atau permintaan yang masuk agar dapat menjamin keamanan sistem yang berjalan dengan lancar.
2. Membersihkan berbagai _cache_ yang terdapat pada penyimpanan serta semua dokumen yang tidak terpakai lagi.
3. Melakukan pemeriksaan terhadap sistem _security_ yang berasal dari permintaan HTTP berdasarkan _request_ klien atau web browser.



### Reverse-Proxy
sumber : https://www.biznetgio.com/news/apa-itu-reverse-proxy

*Reverse proxy* adalah sebuah server yang bertindak sebagai perantara antara klien dan server tujuan. Ketika klien melakukan permintaan, reverse proxy akan menerima permintaan tersebut dan akan mengirimkannya ke server tujuan. Kemudian, server tujuan akan memberikan respons ke reverse proxy, dan reverse proxy akan meneruskannya kembali ke klien.

Walaupun tidak kentara, proxy dan reverse proxy berbeda, proxy biasa berada di sisi klien untuk memastikan bahwa tidak ada server yang bisa berkomunikasi langsung dengan klien. Sedangkan reverse proxy berada di sisi server untuk memastikan bahwa tidak ada klien yang pernah berkomunikasi langsung dengan server.

#### Tujuan penggunaan reverse proxy:
1. **Membuat Privasi lebih tinggi**
	Dengan menggunakan reverse proxy, alamat IP asli pengguna internet disembunyikan, sehingga sulit bagi penyerang untuk melacak identitas pengguna internet.
2. **Melindungi dari serangan siber**
	Dalam konteks keamanan, reverse proxy juga dapat membantu melindungi server tujuan dari serangan DDoS, serangan virus dan malware, serta peretasan. Reverse proxy dapat memblokir akses ke situs web yang terinfeksi atau menghalangi lalu lintas yang mencurigakan.




## Soal
🔗 https://docs.google.com/document/d/1Ci2Sg_J1OJ9YJKaMHXPbC5MLi8En9cgyW5zI36bWV1o/edit?tab=t.0