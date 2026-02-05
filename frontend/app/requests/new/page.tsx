'use client';

import { useState } from 'react';

export default function NewRequestPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status] = useState('OPEN');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '/login';
            return;
        }

        const res = await fetch('http://127.0.0.1:8000/api/requests/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                title,
                description,
                status,
            }),
        });

        if (!res.ok) {
            alert('Erro ao criar solicitação');
            setLoading(false);
            return;
        }

        window.location.href = '/requests?page=9999';
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF] flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#E0DED8]"
            >
                <h2 className="text-2xl font-bold mb-6 text-black">
                    Nova Solicitação
                </h2>

                <input
                    type="text"
                    placeholder="Título"
                    className="w-full border border-[#E0DED8] p-3 rounded-xl mb-4 text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Descrição"
                    className="w-full border border-[#E0DED8] p-3 rounded-xl mb-6 text-black"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
        </main>
    );
}
