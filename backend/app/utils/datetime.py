from datetime import datetime

def format_datetime(dt: datetime, fmt="%Y-%m-%d %H:%M:%S"):
    return dt.strftime(fmt)