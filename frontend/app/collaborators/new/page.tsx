'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCollaboratorPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/collaborators/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    name,
                    role,
                    department,
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.error(data);
                throw new Error('Erro ao criar colaborador');
            }

            router.push('/collaborators');
        } catch {
            setError('Erro ao salvar colaborador');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF]">
            {/* HEADER */}
            <header className="bg-[#1F241C] text-white pt-16 pb-40 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-wide">
                        GCB Investimentos
                    </h1>
                    <p className="text-[#C8D1B8] mt-2 max-w-xl">
                        Cadastro de novo colaborador
                    </p>
                </div>
            </header>

            {/* FORM */}
            <section className="flex justify-center mt-16 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#E0DED8]"
                >
                    <h2 className="text-3xl font-bold text-[#1F241C] mb-6">
                        Novo Colaborador
                    </h2>

                    {error && (
                        <p className="text-red-600 mb-4 text-sm">{error}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-gray-500 bg-white"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Cargo"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-gray-500 bg-white"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Setor"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-gray-500 bg-white"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-gray-500 bg-white"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 p-3 border rounded-xl text-black placeholder:text-gray-500 bg-white"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#6E8B3D] hover:bg-[#5F7A34] disabled:opacity-70 text-white py-3 rounded-xl transition"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </form>
            </section>
        </main>
    );
}
