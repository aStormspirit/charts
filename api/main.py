from fastapi import FastAPI
from get_data import data
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime


app = FastAPI()

# Определите список разрешенных источников (origin), методов, заголовков и др.
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Referer"],
)

@app.get("/")
def read_root() -> dict:
    return {"data": data(), "date": datetime.now().strftime("%d.%m.%Y")
}