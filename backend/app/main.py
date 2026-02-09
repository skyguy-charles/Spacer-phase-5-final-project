from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.routes import router as auth_router
from app.spaces.routes import router as spaces_router
from app.bookings.routes import router as bookings_router
from app.payments.routes import router as payments_router
from app.users.routes import router as users_router

app = FastAPI(title="Spacer API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-six-zeta-786mmpz7hq.vercel.app",  # Replace with your actual Vercel URL
        "http://localhost:5173",  # For local testing
        "http://localhost:3000",  # Alternative local port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Spacer Commune API is running",
        "docs": "/docs"
    }

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(spaces_router, prefix="/spaces", tags=["Spaces"])
app.include_router(bookings_router, prefix="/bookings", tags=["Bookings"])
app.include_router(payments_router, prefix="/payments", tags=["Payments"])
app.include_router(users_router, prefix="/users", tags=["Users"])