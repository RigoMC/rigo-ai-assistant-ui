import { useEffect, useState } from "react";

interface Chat {
    id: string;
    title: string;
    created_at: string;
}

export default function ChatHistory() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChats = async () => {
        return;
        /*try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized");
                setLoading(false);
                return;
            }

            const res = await fetch("http://localhost:3000/api/chats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error fetching chats");

            const data = await res.json();
            setChats(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Error");
            }
        } finally {
            setLoading(false);
        }*/
    };

    const createChat = async () => {
        alert("coming soon!");
        return;
        /*try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:3000/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: "Nuevo chat" }),
            });

            if (!res.ok) throw new Error("Error creating chat");

            const newChat = await res.json();
            setChats((prev) => [newChat, ...prev]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Error");
            }
        }*/
    };

    useEffect(() => {
        fetchChats();
    }, []);

    if (loading) return <p className="text-gray-500">Loading chats...</p>;

    return (
        <div className="w-full p-4">
            <h2 className="text-lg font-bold mb-3">Chat History</h2>
            <ul className="space-y-2">
                <li>
                    <button
                        onClick={createChat}
                        className="w-full p-3 border rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
                    >
                        + New
                    </button>
                </li>
                {chats.map((chat) => (
                    <li
                        key={chat.id}
                        className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        <p className="font-medium">{chat.title}</p>
                        <span className="text-xs text-gray-500">
              {new Date(chat.created_at).toLocaleString()}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
