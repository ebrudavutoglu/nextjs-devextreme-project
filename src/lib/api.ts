/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ status: boolean; data: T | string | null }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}${url}`, {
      ...options,
      credentials: "include",
    });
    if (res.status === 401 || res.status === 403) {
      if (typeof window !== "undefined") window.location.href = "/login";

      let text = "Unauthorized";
      try {
        const json = await res.json();
        text = (json as any).message || text;
      } catch {
        text = await res.text();
      }

      return { status: false, data: text };
    }

    if (res.status === 204) return { status: true, data: null };

    let data: T | string | null = null;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }

    return { status: res.ok, data };
  } catch (err: any) {
    return { status: false, data: err.message || "Something went wrong" };
  }
}
