from fastapi import APIRouter, Request, Response, Header, HTTPException
import os
import stripe
import hmac
import hashlib


router = APIRouter(prefix="/webhooks")


@router.post("/stripe")
async def stripe_webhook(request: Request, stripe_signature: str | None = Header(default=None, alias="Stripe-Signature")):
	payload = await request.body()
	secret = os.getenv("STRIPE_WEBHOOK_SECRET")
	if not secret:
		raise HTTPException(status_code=500, detail="Stripe webhook secret not configured")
	try:
		event = stripe.Webhook.construct_event(payload=payload, sig_header=stripe_signature or "", secret=secret)
	except Exception:
		raise HTTPException(status_code=400, detail="Invalid signature")
	return Response(status_code=200)


@router.post("/twilio")
async def twilio_webhook(request: Request, twilio_signature: str | None = Header(default=None, alias="X-Twilio-Signature")):
	# For Twilio, validation needs raw URL and params; here we check presence only as a placeholder.
	if not os.getenv("TWILIO_AUTH_TOKEN"):
		raise HTTPException(status_code=500, detail="Twilio auth token not configured")
	return Response(status_code=200)

