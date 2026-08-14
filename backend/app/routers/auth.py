import os

from fastapi import APIRouter, Depends, HTTPException, status
from google.auth.transport import requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user, get_db
from app.auth.schemas import (
    GoogleAuthRequest,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserOut,
)
from app.auth.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower()

    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(
        name=data.name.strip(),
        email=email,
        password_hash=hash_password(data.password),
        auth_provider="email",
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)

    return TokenResponse(
        access_token=token,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower()

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This account uses Google Sign-In.",
        )

    if not verify_password(
        data.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = create_access_token(user.id)

    return TokenResponse(
        access_token=token,
    )


@router.post(
    "/google",
    response_model=TokenResponse,
)
def google_login(
    data: GoogleAuthRequest,
    db: Session = Depends(get_db),
):
    google_client_id = os.getenv("GOOGLE_CLIENT_ID")

    if not google_client_id:
        raise HTTPException(
            status_code=500,
            detail="Google authentication is not configured.",
        )

    try:
        google_user = id_token.verify_oauth2_token(
            data.credential,
            requests.Request(),
            google_client_id,
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google authentication.",
        )

    google_id = google_user.get("sub")
    email = google_user.get("email")
    name = google_user.get("name")
    picture = google_user.get("picture")

    if not google_id or not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google account information is incomplete.",
        )

    email = email.lower()

    user = (
        db.query(User)
        .filter(User.google_id == google_id)
        .first()
    )

    if not user:
        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    if user:
        if user.google_id is None:
            user.google_id = google_id

        if picture:
            user.profile_image = picture

        if not user.name and name:
            user.name = name

        db.commit()
        db.refresh(user)

    else:
        user = User(
            name=name or email.split("@")[0],
            email=email,
            auth_provider="google",
            google_id=google_id,
            profile_image=picture,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(user.id)

    return TokenResponse(
        access_token=token,
    )


@router.get(
    "/me",
    response_model=UserOut,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.post("/logout")
def logout():
    return {
        "message": "Logged out successfully."
    }