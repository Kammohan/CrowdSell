const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(init?.headers || {}),
		},
	});
	if (!res.ok) {
		throw new Error(`API error ${res.status}`);
	}
	return res.json();
}


