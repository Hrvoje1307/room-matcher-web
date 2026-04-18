type Data = {
  url: string;
  signal?: AbortSignal;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function fetchData({ url, signal, method = "GET", body }: Data) {
   console.log(process.env);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      credentials: "include",
      signal,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = new Error(
        `HTTP error! status: ${response.status}`,
      ) as Error & { status: number; respone: Response };
      error.status = response.status;
      error.respone = response;
      throw error;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
