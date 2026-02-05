'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            router.push('/');
        } catch {
            setError('Usuário ou senha inválidos');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF]">
            {/* HEADER — IGUAL AO DA HOME */}
            <header className="bg-[#1F241C] text-white pt-16 pb-40 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-wide">
                        GCB Investimentos
                    </h1>
                    <p className="text-[#C8D1B8] mt-2 max-w-xl">
                        Excelência, transparência e decisões inteligentes para alta performance.
                    </p>
                </div>
            </header>

            {/* CARD — MESMA POSIÇÃO DA HOME */}
            <section className="flex justify-center mt-12 px-4">
                <form
                    onSubmit={handleLogin}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#E0DED8]"
                >
                    <h2 className="text-3xl font-bold text-[#1F241C] mb-4">
                        Acesso ao Sistema
                    </h2>

                    <p className="text-[#5A5A5A] mb-6">
                        Entre com suas credenciais para acessar o sistema interno.
                    </p>

                    {error && (
                        <p className="text-red-600 mb-4 text-sm">{error}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-[#1F241C] placeholder:text-black"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-[#1F241C] placeholder:text-black"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6E8B3D] hover:bg-[#5F7A34] disabled:opacity-70 text-white py-3 rounded-xl transition"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </section>
        </main>
    );
}
