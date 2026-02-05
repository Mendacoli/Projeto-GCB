'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Request = {
    id: number;
    title: string;
    description: string;
    status: string;
};

export default function EditRequestPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('OPEN');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        async function loadRequest() {
            try {
                const res = await fetch(
                    `http://127.0.0.1:8000/api/requests/${id}/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error();

                const data: Request = await res.json();

                setTitle(data.title ?? '');
                setDescription(data.description ?? '');
                setStatus(data.status ?? 'OPEN');
            } catch {
                router.push('/requests');
            } finally {
                setLoading(false);
            }
        }

        loadRequest();
    }, [id, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        await fetch(
            `http://127.0.0.1:8000/api/requests/${id}/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                }),
            }
        );

        router.push('/requests?page=9999');
    }

    if (loading) {
        return <p className="p-10 text-black">Carregando...</p>;
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF]">
            {/* HEADER */}
            <header className="bg-[#1F241C] text-black pt-14 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold">
                        GCB Investimentos
                    </h1>
                    <p className="mt-2">
                        Editar solicitação
                    </p>
                </div>
            </header>

            {/* FORM */}
            <section className="flex justify-center px-4 -mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-xl border border-[#E0DED8] p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-black">
                        Editar Solicitação
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
                        className="w-full border border-[#E0DED8] p-3 rounded-xl mb-4 text-black"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <select
                        className="w-full border border-[#E0DED8] p-3 rounded-xl mb-6 text-black"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">Aberta</option>
                        <option value="IN_PROGRESS">Em andamento</option>
                        <option value="DONE">Concluída</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-[#6E8B3D] hover:bg-[#5F7A34] text-white py-3 rounded-xl transition"
                    >
                        Salvar alterações
                    </button>
                </form>
            </section>
        </main>
    );
}
