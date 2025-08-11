'use client';
import React, { useEffect, useState } from "react";

type UploadedFilesListProps = {
    files: File[];
};

export default function UploadedFilesList({ files }: UploadedFilesListProps) {
    const [nonEmptyFiles, setNonEmptyFiles] = useState<File[]>([]);

    useEffect(() => {
        const checkFilesContent = async () => {
            const validFiles: File[] = [];

            for (const file of files) {
                const content = await file.text();
                if (content.trim().length > 0) {
                    validFiles.push(file);
                }
            }

            setNonEmptyFiles(validFiles);
        };

        if (files.length > 0) {
            checkFilesContent();
        } else {
            setNonEmptyFiles([]);
        }
    }, [files]);

    if (nonEmptyFiles.length === 0) return null;

    return (
        <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Files Uploaded to knowledge base:</h3>
            <ul className="list-disc list-inside text-gray-300">
                {nonEmptyFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
}
