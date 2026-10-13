import asyncio
import smtplib
from dataclasses import dataclass
from email.message import EmailMessage

from app.core.config import settings


@dataclass(frozen=True)
class NotificationResult:
    delivered: bool
    channel: str
    message: str


def _send_email(recipient: str, body: str) -> None:
    if not all(
        [
            settings.smtp_host,
            settings.smtp_username,
            settings.smtp_password,
            settings.smtp_from,
        ]
    ):
        raise RuntimeError("Email SMTP settings are incomplete.")

    email = EmailMessage()
    email["Subject"] = "CivicLens India Notification"
    email["From"] = settings.smtp_from
    email["To"] = recipient
    email.set_content(body)

    with smtplib.SMTP(
        settings.smtp_host,
        settings.smtp_port,
        timeout=20,
    ) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(
            settings.smtp_username,
            settings.smtp_password,
        )
        server.send_message(email)


async def dispatch(
    channel: str,
    recipient: str,
    message: str,
) -> NotificationResult:
    if channel not in {"in_app", "email", "sms", "push"}:
        raise ValueError("Unsupported notification channel")

    if channel == "email":
        try:
            await asyncio.to_thread(
                _send_email,
                recipient,
                message,
            )
        except (smtplib.SMTPException, OSError, RuntimeError, ValueError) as exc:
            print(f"Email delivery failed: {exc}")
            return NotificationResult(
                False,
                channel,
                "Email could not be sent. Check SMTP settings.",
            )

        return NotificationResult(
            True,
            channel,
            "Email sent successfully.",
        )

    return NotificationResult(
        False,
        channel,
        "Provider is not configured; notification was not sent.",
    )
