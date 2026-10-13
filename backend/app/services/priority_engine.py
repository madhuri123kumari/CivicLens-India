from dataclasses import dataclass

@dataclass(frozen=True)
class PriorityResult:
    score: int
    level: str
    reasons: list[str]

def calculate_priority(category: str, description: str) -> PriorityResult:
    text = f"{category} {description}".lower()
    score = 35
    reasons = ["Base score from civic incident classification."]
    safety_terms = ("accident", "danger", "school", "hospital", "open manhole", "fire", "electric")
    if any(term in text for term in safety_terms):
        score += 35
        reasons.append("Safety-sensitive wording detected.")
    if category in {"ROAD_DAMAGE", "WATERLOGGING", "STREETLIGHT", "DRAINAGE"}:
        score += 10
        reasons.append("Infrastructure category has operational impact.")
    score = min(score, 100)
    level = "CRITICAL" if score >= 90 else "HIGH" if score >= 70 else "MEDIUM" if score >= 40 else "LOW"
    return PriorityResult(score, level, reasons)
