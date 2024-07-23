## Steps for Developing Backend

1) Create a virtual environment outside the cloned github repository(ie, when git status throws an error) using the following commands:
``` 
python3 -m venv backend
source backend/bin/activate
```

2) Install requirements using the following commands:
```
cd ClassroomPlatform
cd backend_v1
pip install -r requirements.txt
```

3) Add Backend Changes

4) Save python dependencies in requirements.txt with the following commands:
```
cd ClassroomPlatform
cd backend_v1
pipreqs --force .  
```

*The following line needs to be added manually to the end of the requirements.txt file:*
```
pipreqs==0.5.0
fastapi==0.111.1
starlette==0.37.2
pydantic==2.8.2
pydantic_core==2.20.1
uvicorn==0.30.3
h11==0.14.0
httptools==0.6.1
websockets==12.0
uvloop==0.19.0
httpx==0.27.0
httpcore==1.0.5
sniffio==1.3.1
idna==3.7
certifi==2024.7.4
urllib3==2.2.2
python-multipart==0.0.9
email_validator==2.2.0
dnspython==2.6.1
python-dotenv==1.0.1
fastapi-cli==0.0.4
click==8.1.7
typer==0.12.3
shellingham==1.5.4
```

5) Push changes:
- *Remember to pull before pushing to deal with conflicts locally, or your push will fail.*
- *Remember to push it is git add -A, git commit -m "message", then git push*