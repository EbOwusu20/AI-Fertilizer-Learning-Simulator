const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export async function predictFertilizer(data) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error(
      "You must be logged in to run a prediction."
    );
  }

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error(
      "FastAPI prediction error:",
      result
    );

    if (response.status === 401) {
      throw new Error(
        "Your session has expired. Please log in again."
      );
    }

    throw new Error(
      result?.detail
        ? JSON.stringify(result.detail, null, 2)
        : "Prediction request failed"
    );
  }

  return result;
} 

export async function getSimulation(simulationId) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You must be logged in.");
  }

  const response = await fetch(
    `${API_URL}/history/${simulationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Your session has expired. Please log in again."
      );
    }

    throw new Error(
      result?.detail || "Unable to load simulation."
    );
  }

  return result;
}