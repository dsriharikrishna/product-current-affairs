from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.features.auth.repository import AuthRepository
from app.features.auth.schema import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
    Token,
    UserCreate,
)
from app.features.auth.service import AuthService
from app.shared.dependencies import get_db
from app.shared.responses.schema import SuccessResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    repository = AuthRepository(db)
    return AuthService(repository)


@router.post("/register", response_model=SuccessResponse[Token], status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate,
    service: AuthService = Depends(get_auth_service),
):
    """
    Register a new user.
    """
    user = await service.register_user(user_in)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    token = service.generate_token(user)
    return SuccessResponse(message="User created successfully", data=token)


@router.post("/login", response_model=SuccessResponse[Token])
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    service: AuthService = Depends(get_auth_service),
):
    """
    Login to get an access token.
    Uses OAuth2PasswordRequestForm which requires 'username' and 'password'.
    Please pass the user's email in the 'username' field.
    """
    user = await service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = service.generate_token(user)
    return SuccessResponse(message="Login successful", data=token)


@router.post("/forgot-password", response_model=SuccessResponse)
async def forgot_password(
    request: ForgotPasswordRequest,
    service: AuthService = Depends(get_auth_service),
):
    """
    Generate a password reset token. In production, this would send an email.
    For this MVP, it prints the token to the server logs.
    """
    token = await service.generate_password_reset_token(request.email)
    if token:
        # MVP: print to console since we don't have an email provider
        print(f"PASSWORD RESET TOKEN FOR {request.email}: {token}")
    
    # Always return success to prevent email enumeration
    return SuccessResponse(message="If the email exists, a reset link has been generated.")


@router.post("/reset-password", response_model=SuccessResponse)
async def reset_password(
    request: ResetPasswordRequest,
    service: AuthService = Depends(get_auth_service),
):
    """
    Reset password using the token.
    """
    success = await service.reset_password(request.token, request.new_password)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )
    return SuccessResponse(message="Password reset successfully.")
