from pathlib import Path
def inference_job(media_path: str) -> dict:
    path = Path(media_path)
    if not path.exists():
        raise FileNotFoundError(media_path)
    return {"status":"queued-for-model-inference","path":str(path)}
