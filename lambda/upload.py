import json
import os
import uuid
from datetime import datetime, timezone

import boto3

s3 = boto3.client("s3")
BUCKET = os.environ["BUCKET_NAME"]
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB


def handler(event, context):
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event["body"])
    except (json.JSONDecodeError, KeyError, TypeError):
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid request body"}),
        }

    pet_name = body.get("name", "").strip()
    content_type = body.get("contentType", "")

    if not pet_name or len(pet_name) > 50:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Pet name required (max 50 chars)"}),
        }

    if content_type not in ALLOWED_TYPES:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid image type. Use jpg, png, gif, or webp."}),
        }

    pet_id = str(uuid.uuid4())
    ext = content_type.split("/")[1]
    if ext == "jpeg":
        ext = "jpg"
    photo_key = f"community/photos/{pet_id}.{ext}"

    presigned_url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": BUCKET,
            "Key": photo_key,
            "ContentType": content_type,
        },
        ExpiresIn=300,
    )

    pet_entry = {
        "id": pet_id,
        "name": pet_name,
        "photoKey": photo_key,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    s3.put_object(
        Bucket=BUCKET,
        Key=f"community/pets/{pet_id}.json",
        Body=json.dumps(pet_entry),
        ContentType="application/json",
    )

    _update_manifest(pet_entry)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps(
            {
                "uploadUrl": presigned_url,
                "photoKey": photo_key,
                "petId": pet_id,
            }
        ),
    }


def _update_manifest(new_entry):
    manifest_key = "community/manifest.json"
    try:
        resp = s3.get_object(Bucket=BUCKET, Key=manifest_key)
        pets = json.loads(resp["Body"].read())
    except s3.exceptions.NoSuchKey:
        pets = []

    pets.insert(0, new_entry)

    s3.put_object(
        Bucket=BUCKET,
        Key=manifest_key,
        Body=json.dumps(pets),
        ContentType="application/json",
        CacheControl="no-cache",
    )
