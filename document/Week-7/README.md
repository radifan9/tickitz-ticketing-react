
### 🌐 Docker Vite-React NGINX Server

(Running from project root directory)


To Build
```bash
docker build -t vite-server:latest .
```

To Run the builded image
```bash
docker run -d --name tickitz -p 80:80 vite-server:latest 
```

To Access Through My Local Wifi :
```
http://localhost
http://192.168.100.232/
```


---

### 🗝️ Docker SSH Server

(Running from this directory "/document/Week-7/")

Generate Public-Private Key Pair
```bash
ssh-keygen -t ecdsa -C "radif@koda.com" -f radif_ecdsa
```


To Build Image Containing SSH Server
```bash
docker build -t weekly-ssh:latest .
```

To Run the builded image
```bash
docker run -d --name my-ssh weekly-ssh:latest
```


To Connect to SSH
```bash
ssh -i radif_ecdsa radif@172.17.0.3
```