const API_URL = "http://localhost:3000"

export async function apiFetch(path, method = "GET", body = null) {
    const headers = { "Content-type": "application/json" }

    const token = localStorage.getItem("token")
    if (token) {
        headers.Authorization = "Bearer " + token
    }


    const response = await fetch(API_URL + path, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erreur " + response.status)
    }

    return data
}