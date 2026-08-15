from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Integer, String, Float, ForeignKey, JSON

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    institution = Column(String(255), nullable=True)

    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash = Column(String(255), nullable=True)

    auth_provider = Column(
        String(20),
        nullable=False,
        default="email",
    )

    google_id = Column(
        String(255),
        unique=True,
        nullable=True,
    )

    profile_image = Column(
        String(500),
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )


class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)

    # The user who created this simulation
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    # Basic simulation information
    crop = Column(String(100), nullable=False)
    fertilizer_type = Column(String(100), nullable=False)

    # Main results
    predicted_yield = Column(Float, nullable=False)
    profit = Column(Float, nullable=False)
    environmental_score = Column(Float, nullable=False)

    # Optimization information
    optimization_score = Column(Float, nullable=True)

    # Store the complete input and output
    # so we don't lose any information from the simulation.
    input_data = Column(JSON, nullable=False)
    result_data = Column(JSON, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )