from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CivicLens India"
    app_env: str = "development"
    api_prefix: str = "/api/v1"

    database_url: str = (
        "postgresql+asyncpg://civiclens:civiclens@localhost:5432/civiclens"
    )
    redis_url: str = "redis://localhost:6379/0"

    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = 60

    cors_origins: str = (
        "http://localhost:5173,http://localhost:5174,http://localhost:5175"
    )

    upload_dir: str = "./uploads"
    max_upload_mb: int = 20

    ai_model_path: str | None = None
    ai_api_key: str | None = None
    ai_base_url: str = "https://api.openai.com/v1"
    ai_model: str = "gpt-4o-mini"
    ai_timeout_seconds: float = 60.0

    geocoding_provider: str | None = None
    geocoding_api_key: str | None = None

    # Gmail SMTP settings
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    @property
    def language_names(self) -> dict[str, str]:
        return {
            "en": "English",
            "hi": "Hindi",
        }

    @property
    def cors_list(self) -> list[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
