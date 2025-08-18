
### 🌐 Docker Vite NGINX Server

To Build
```
docker build -t weekly-react:latest .
```

To Run
```dockerfile
docker run -d --name server-vite -p 80:80 weekly-7:latest 
```

To Access Through Local Wifi :
```
http://192.168.100.232/
```


### 🗝️ Docker SSH Server

Generate Public-Private Key Pair
```
ssh-keygen -t ecdsa -C "radif@koda.com" -f radif_ecdsa
```


To Build Image Containing SSH Server
```
docker build -t weekly-ssh:latest .
```

To Run
```
docker run -d --name my-ssh weekly-ssh:latest
```
