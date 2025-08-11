'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FileUploaderProps = {
    onFileUpload: (file: File) => void;
};

export default function  FileUploader({ onFileUpload }: FileUploaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
            setIsOpen(false);
        }
    };

    // Cerrar con ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    return (
        <>
            <button
                onClick={handleOpen}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                <Image src={"/file_upload.png"} alt={"Upload File"} width={25} height={25}/>
            </button>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={handleClose}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="file-upload-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="file-upload-title" className="text-lg font-semibold mb-2">
                            Sube un archivo
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Sube un archivo para que el asistente lo analice
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Seleccionar archivo
                            </button>
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
