'use client';

import { useEffect, useState } from 'react';

type Request = {
    id: number;
    title: string;
    description: string;
    status: string;
};

type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Request[];
};

export default function RequestsPage() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '/login';
            return;
        }

        async function loadRequests() {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://127.0.0.1:8000/api/requests/?page=${page}`,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error('Unauthorized');

                const json: ApiResponse = await res.json();
                setData(json);
            } catch {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        }

        loadRequests();
    }, [page]);

    // ✅ FUNÇÃO DELETE (NOVA)
    async function handleDelete(id: number) {
        const confirmDelete = confirm('Tem certeza que deseja excluir esta solicitação?');
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        if (!token) return;

        await fetch(`http://127.0.0.1:8000/api/requests/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        // remove da lista sem recarregar
        setData((prev) =>
            prev
                ? {
                    ...prev,
                    results: prev.results.filter((r) => r.id !== id),
                }
                : prev
        );
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF]">
            {/* HEADER */}
            <header className="bg-[#1F241C] text-white pt-14 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold tracking-wide">
                        GCB Investimentos
                    </h1>
                    <p className="text-[#C8D1B8] mt-2 max-w-xl">
                        Gestão interna de solicitações.
                    </p>
                </div>
            </header>

            {/* CONTEÚDO */}
            <section className="flex justify-center px-4 -mt-10">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E0DED8] p-8">
                        <a
                            href="/requests/new"
                            className="inline-block mb-6 bg-[#6E8B3D] hover:bg-[#5F7A34] text-white px-5 py-2 rounded-xl transition"
                        >
                            + Nova Solicitação
                        </a>

                        <h2 className="text-2xl font-bold text-[#1F241C] mb-6">
                            Solicitações
                        </h2>

                        {loading ? (
                            <p>Carregando solicitações...</p>
                        ) : data && data.results.length === 0 ? (
                            <p>Nenhuma solicitação cadastrada.</p>
                        ) : data ? (
                            <div className="space-y-4">
                                {data.results.map((r) => (
                                    <div
                                        key={r.id}
                                        className="border border-[#E0DED8] rounded-xl p-4 flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="text-sm text-black">
                                                {r.title}
                                            </h3>
                                            <p className="text-sm text-black">
                                                {r.description}
                                            </p>
                                            <p className="text-sm text-black font-medium">
                                                Status: {
                                                    r.status === 'OPEN'
                                                        ? 'Aberta'
                                                        : r.status === 'IN_PROGRESS'
                                                            ? 'Em andamento'
                                                            : 'Concluída'
                                                }
                                            </p>
                                        </div>

                                        {/* BOTÕES */}
                                        <div className="flex gap-2">
                                            <a
                                                href={`/requests/${r.id}/edit`}
                                                className="px-4 py-2 border border-[#6E8B3D] rounded-lg text-black hover:bg-[#6E8B3D] hover:text-white transition"
                                            >
                                                Editar
                                            </a>

                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                className="px-4 py-2 border border-red-500 rounded-lg text-black hover:bg-red-500 hover:text-white transition"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}

                        {/* PAGINAÇÃO */}
                        {data && (
                            <div className="flex justify-between mt-12">
                                <button
                                    disabled={!data.previous}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="px-4 py-2 border rounded-lg text-black disabled:opacity-40"
                                >
                                    Anterior
                                </button>

                                <button
                                    disabled={!data.next}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-4 py-2 border rounded-lg text-black disabled:opacity-40"
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
