'use client';
import React from "react";

interface MessageBubbleProps {
    text: string;
    sender: "user" | "bot";
}

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
    const isUser = sender === "user";
    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}>
            <div
                className={`px-4 py-2 rounded-lg ${
                    isUser
                        ? "bg-gray-500 text-white rounded-br-none max-w-xs"
                        : "text-white max-w-lg"
                }`}
            >
                {text}
            </div>
        </div>
    );
}
