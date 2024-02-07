from fastapi import FastAPI
from react import serve_react_app
from fastapi.middleware.cors import CORSMiddleware

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

path_to_react_app_build_dir = "./build"
app = serve_react_app(app, path_to_react_app_build_dir)