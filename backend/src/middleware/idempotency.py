from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from typing import Callable, Awaitable
import hashlib
import json

try:
	import redis
except Exception:  # pragma: no cover
	redis = None


class IdempotencyMiddleware(BaseHTTPMiddleware):
	def __init__(self, app, redis_client=None, header_name: str = "Idempotency-Key"):
		super().__init__(app)
		self.redis = redis_client
		self.header = header_name

	async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]):
		if request.method in ("POST", "PUT", "PATCH", "DELETE"):
			key = request.headers.get(self.header)
			if key and self.redis:
				redis_key = f"idem:{key}"
				if self.redis.get(redis_key):
					return Response(status_code=409)
				self.redis.setex(redis_key, 60 * 10, "1")
		response = await call_next(request)
		return response


