'use client';

import React, {useEffect, useState} from "react";
import FileUploader from "../components/FileUploader";
import Chat from "../components/Chat";
import QueryInput from "../components/QueryInput";
import UploadedFilesList from "@/components/UploadedFilesList";
import {uploadFile} from "@/utils/api";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import ChatHistory from "@/components/ChatHistory";

export default function Home() {
    const {data: session, status} = useSession();
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) return router.push("api/auth/signin");
    }, []);


    const handleSend = (message: string, answer?: string) => {
        if (!message.trim()) return;
        setMessages((prev) => [...prev, {text: message, sender: "user"}]);
        setTimeout(() => {
            setMessages((prev) => [...prev, {text: `"${answer ? answer : "Sin respuesta..."}"`, sender: "bot"}]);
        }, 800);
    };

    const handleUpload = async (file: File) => {
        try {
            setUploadedFiles((prev) => [...prev, file]);
            const result = await uploadFile(file);
            alert(`Archivo procesado con ${result.inserted} fragmentos agregados y ${result.skipped} saltados.`);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(`Error: ${err.message}`);
            } else {
                alert("Ocurrió un error desconocido");
            }
        }

    };

    return (
        <div className="grid grid-cols-6 h-screen w-full">
            <div className="col-span-1 flex flex-col border-e border-gray-700">
                <div className="flex flex-col items-center justify-center w-full ">
                    <div className="w-full bg-gray-500 mb-2">
                        <h2 className="text-2xl p-5">
                            Rigo AI Assistant
                        </h2>
                    </div>
                    <ChatHistory/>
                </div>
            </div>
            <div className="col-span-5 flex flex-col justify-between p-4 overflow-hidden w-full">
                <div className="flex-1 flex flex-col overflow-auto items-center w-full">
                    <main className="flex-1 p-4 flex flex-col gap-4 overflow-auto w-full max-w-3xl">
                        <Chat messages={messages}/>
                    </main>
                    <div className="w-full max-w-3xl">
                        <UploadedFilesList files={uploadedFiles}/>
                    </div>
                </div>
                <div className="p-4 border-t grid grid-cols-6 w-full max-w-3xl mx-auto">
                    <div className="col-span-1">
                        <FileUploader onFileUpload={handleUpload}/>
                    </div>
                    <div className="col-span-5">
                        <QueryInput onSend={handleSend}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
