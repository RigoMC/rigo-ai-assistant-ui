'use client';
import React, {useState} from "react";
import {sendQuery} from "@/utils/api";
import Image from "next/image";

interface QueryInputProps {
    onSend: (message: string, answer?: string) => void;
}

export default function QueryInput({onSend}: QueryInputProps) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);

        try {
            const response = await sendQuery(input);
            onSend(input, response.answer);
        } catch (error) {
            onSend(input, "Error al obtener respuesta");
        } finally {
            setInput("");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={loading}
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >

                {loading ? "..." : <Image src={"/message_send.png"} alt={"Upload File"} width={25} height={25}/>}
            </button>
        </form>
    );
}
