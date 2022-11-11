from fastapi import FastAPI, Request, Body
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
app = FastAPI()
origins = [
    "http://localhost:8080/log",
    "http://localhost:8080"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

class Medico(BaseModel):
    id: int
    nombreCompleto: str
    especialidad: str
@app.post("/log")
async def guardarLog(request: Request):
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S: ")
    info = await request.json()
    text = "\n" + dt_string + json.dumps(info)
    print((text))
    with open("log.txt", "a") as f:
        f.write(text)
    return "Llegó a python"