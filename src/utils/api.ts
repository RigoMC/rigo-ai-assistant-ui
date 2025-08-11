export async function sendQuery(message: string) {
    try {
        const res = await fetch("http://localhost:4000/api/query", { // Cambia el puerto si tu backend usa otro
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: message}),
        });
        if (!res.ok) {
            throw new Error(`Error del servidor: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Wrong request:", error);
        throw error;
    }
}

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Fail uploading file");
    }
    return res.json();
}

export async function createChat(title: string) {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title}),
    });
    if (!res.ok) throw new Error("Error creating chat");
    return res.json();
}

export async function sendMessage(chatId: string, role: "system" | "user" | "assistant", content: string) {
    const res = await fetch(`/api/chat/${chatId}/messages`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({role, content}),
    });
    if (!res.ok) throw new Error("Error sending menssage");
    return res.json();
}

export async function login({email, password}: { email: string; password: string }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Login error");
        }
        const data = await res.json();
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Login error:", err.message);
            throw err;
        } else {
            throw ("Failed to login");
        }
    }
}
