from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import structlog
import uuid

from .api.routes import router as api_router
from .webhooks.routes import router as webhooks_router
from .settings import settings
from .middleware.idempotency import IdempotencyMiddleware
import redis


logger = structlog.get_logger()

app = FastAPI(title=settings.APP_NAME)

if settings.CORS_ORIGINS:
	app.add_middleware(
		CORSMiddleware,
		allow_origins=settings.CORS_ORIGINS,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)


@app.middleware("http")
async def add_request_id(request: Request, call_next):
	req_id = request.headers.get(settings.REQUEST_ID_HEADER) or str(uuid.uuid4())
	response = await call_next(request)
	response.headers[settings.REQUEST_ID_HEADER] = req_id
	return response


redis_client = None
if settings.REDIS_URL:
	try:
		redis_client = redis.Redis.from_url(settings.REDIS_URL)
	except Exception:
		redis_client = None

app.add_middleware(IdempotencyMiddleware, redis_client=redis_client)


@app.get("/health")
async def health():
	return {"status": "ok"}


@app.get("/ready")
async def readiness():
	# TODO: check DB/Redis connectivity
	return {"ready": True}


app.include_router(api_router)
app.include_router(webhooks_router)

