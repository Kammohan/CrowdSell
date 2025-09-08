from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class AppSettings(BaseSettings):
	model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

	APP_NAME: str = "Event Growth Copilot API"
	ENV: str = "development"
	PORT: int = 8000
	CORS_ORIGINS: List[str] = []
	REDIS_URL: str | None = None
	DATABASE_URL: str | None = None
	STRIPE_WEBHOOK_SECRET: str | None = None
	TWILIO_AUTH_TOKEN: str | None = None
	REQUEST_ID_HEADER: str = "X-Request-ID"


settings = AppSettings()


