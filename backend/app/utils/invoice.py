import uuid
from datetime import datetime

def generate_invoice_number():
    return f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"