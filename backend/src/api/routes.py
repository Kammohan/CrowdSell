from fastapi import APIRouter, Header


router = APIRouter(prefix="/api")


@router.get("/health")
async def health():
	return {"status": "ok"}


@router.get("/events/{event_id}/stats")
async def get_event_stats(event_id: str):
	return {"event_id": event_id, "sales": 0}


@router.post("/events")
async def create_event(idempotency_key: str | None = Header(default=None, alias="Idempotency-Key")):
	# TODO: persist event; respect idempotency key in storage
	return {"ok": True}

