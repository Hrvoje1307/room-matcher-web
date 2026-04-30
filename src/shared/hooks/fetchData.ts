type Data = {
  url: string;
  signal?: AbortSignal;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
};

export async function fetchData({ url, signal, method = "GET", body }: Data) {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      signal,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });

    if (!response.ok) {
      const error = new Error(
        `HTTP error! status: ${response.status}`,
      ) as Error & { status: number; response: Response };
      error.status = response.status;
      error.response = response;
      throw error;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
