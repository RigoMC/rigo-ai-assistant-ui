'use client';
import {getSession, signIn} from "next-auth/react";
import Image from "next/image";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {signOut} from "next-auth/react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        signOut({redirect: false});
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (result?.ok) {
            const session = await getSession();
            localStorage.setItem("token", session?.accessToken || "");
            router.push("/");
        } else {
            alert("¡Parece que tus credenciales no son correctas!");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md ml-10">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Rigo AI Assistant
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
                    >
                        Iniciar sesión
                    </button>

                    <button
                        type="button"
                        onClick={() => signIn("google", {callbackUrl: "/"})}
                        className="w-full border text-black px-4 py-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                        <Image src="/google.png" alt="Google" width={24} height={24}/>
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        ¿Olvidaste tu contraseña?
                        <a
                            href="/Auth/Forgotpass"
                            className="text-blue-500 hover:underline ml-2"
                        >
                            Recupérala aquí
                        </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        ¿No tienes una cuenta?
                        <Link
                            href="/api/auth/new-user"
                            className="text-blue-500 hover:underline ml-2"
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
