'use client';
import React from "react";
import MessageBubble from "./MessageBubble";

interface ChatProps {
    messages: { text: string; sender: "user" | "bot" }[];
}

export default function Chat({ messages }: ChatProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 rounded-lg max-w-4xl">
            {messages.length === 0 ? (
                <p className="text-gray-400 text-center">No hay mensajes todavía</p>
            ) : (
                messages.map((msg, index) => (
                    <MessageBubble key={index} text={msg.text} sender={msg.sender} />
                ))
            )}
        </div>
    );
}
