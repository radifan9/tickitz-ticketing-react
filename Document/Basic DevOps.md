
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


## b. Linux FHS (File Hierarchy Structure)
![[Pasted image 20250815200617.png]]
FHS adalah aturan yang menentukan struktur folder yang digunakan oleh sistem operasi linux. Aturan ini disesuaikan dengan perkembangan linux, versi terakhir dari aturan FHS adalah versi 3.0 yang dirilis pada tanggal 18 Mei 2015.

![[Pasted image 20250815201220.png]]


sumber :
https://www.geeksforgeeks.org/linux-unix/linux-file-hierarchy-structure/
https://www.tembolok.id/memahami-struktur-partisi-dan-file-system-pada-linux/


## c. Sistem Permission dan Owner pada Linux
Ownership (kepemilikan) di Linux ada 3 jenis:
1. User (owner) → biasanya orang yang membuat file.
2. Group → sekelompok user yang bisa berbagi akses.
3. Others → semua user lain di sistem.

Permission (izin) menentukan apa yang boleh dilakukan tiap jenis ownership tadi terhadap file/direktori:
1. r (read) → boleh membaca isi file / melihat isi folder.
2. w (write) → boleh mengubah isi file / menambah-menghapus isi folder.
3. x (execute) → boleh menjalankan file (jika program/script) / masuk ke folder.

Contoh: `-rwxr-xr--`
- rwx → owner bisa baca, tulis, jalankan.
- r-x → group bisa baca & jalankan, tapi tidak tulis.
- r-- → others cuma bisa baca.






## Reference
🔗 https://docs.google.com/document/d/1Ci2Sg_J1OJ9YJKaMHXPbC5MLi8En9cgyW5zI36bWV1o/edit?tab=t.0