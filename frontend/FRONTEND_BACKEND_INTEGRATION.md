# FertSim Frontend ↔ FastAPI Integration

## What changed

- Connected the simulation flow to `POST /predict`.
- Added a dedicated API service in `src/services/api.js`.
- Expanded the simulation payload to the 28 backend model features.
- Added a real loading/simulation screen.
- The loading screen calls the backend and automatically routes to `/results` after a successful prediction.
- Results are populated from the backend response rather than `mockPrediction.js`.
- Added backend error handling for FastAPI validation errors.

## Run locally

### Backend

Start FastAPI on port 8000, for example:

```bash
uvicorn app.main:app --reload
```

### Frontend

Create `.env` from `.env.example` if needed:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then:

```bash
npm install
npm run dev
```

## Integration test

1. Open `/simulation`.
2. Select crop, region and soil.
3. Adjust N, P and K.
4. Optionally open the advanced inputs.
5. Click **Run Simulation**.
6. The app routes to `/loading`.
7. `/loading` sends the exact model input payload to `POST /predict`.
8. On success the app automatically routes to `/results`.
9. The result cards use the returned predicted yield, profit, environmental score and recommendation when those fields are present.

## Important backend requirement

FastAPI must allow the Vite development origin through CORS. If the backend does not already have CORS middleware, add `CORSMiddleware` for `http://localhost:5173` and `http://127.0.0.1:5173`.
