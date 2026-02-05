'use client';

import { useEffect, useState } from 'react';

type Collaborator = {
    id: number;
    name: string;
    role: string;
    department: string;
};

type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Collaborator[];
};

export default function CollaboratorsPage() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState<string | null>(null);

    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token')
            : null;

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
            return;
        }

        async function load() {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://127.0.0.1:8000/api/collaborators/?page=${page}`,
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

        load();
    }, [page, token]);

    async function handleDelete(id: number) {
        if (!confirm('Deseja realmente excluir este colaborador?')) return;

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/collaborators/${id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!res.ok) throw new Error();

            setMessage('Colaborador excluído com sucesso');

            // Recarrega lista
            setData((prev) =>
                prev
                    ? {
                        ...prev,
                        results: prev.results.filter((c) => c.id !== id),
                    }
                    : prev
            );
        } catch {
            setMessage('Erro ao excluir colaborador');
        }
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
                        Gestão interna de colaboradores.
                    </p>
                </div>
            </header>

            {/* CONTEÚDO */}
            <section className="flex justify-center px-4 -mt-10">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-[#E0DED8] p-8">
                        {/* FEEDBACK */}
                        {message && (
                            <div className="mb-6 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg p-3">
                                {message}
                            </div>
                        )}

                        {/* AÇÕES */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#1F241C]">
                                Colaboradores
                            </h2>

                            <a
                                href="/collaborators/new"
                                className="bg-[#6E8B3D] hover:bg-[#5F7A34] text-white px-5 py-2 rounded-xl transition"
                            >
                                + Novo
                            </a>
                        </div>

                        {/* LISTA */}
                        {loading ? (
                            <p className="text-[#5A5A5A]">
                                Carregando colaboradores...
                            </p>
                        ) : data && data.results.length === 0 ? (
                            <p className="text-[#5A5A5A]">
                                Nenhum colaborador cadastrado.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {data?.results.map((c) => (
                                    <div
                                        key={c.id}
                                        className="flex justify-between items-center border border-[#E0DED8] rounded-xl p-4"
                                    >
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#1F241C]">
                                                {c.name}
                                            </h3>
                                            <p className="text-sm text-[#5A5A5A]">
                                                Cargo: {c.role}
                                            </p>
                                            <p className="text-sm text-[#5A5A5A]">
                                                Setor: {c.department}
                                            </p>
                                        </div>

                                        <div className="flex gap-3 pl-4">
                                            <a
                                                href={`/collaborators/${c.id}/edit`}
                                                className="px-4 py-2 border border-[#6E8B3D] rounded-lg text-sm text-black hover:bg-[#6E8B3D] hover:text-white transition"
                                            >
                                                Editar
                                            </a>

                                            <button
                                                onClick={() =>
                                                    handleDelete(c.id)
                                                }
                                                className="px-4 py-2 border border-red-400 rounded-lg text-sm text-black hover:bg-red-500 hover:text-white transition"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PAGINAÇÃO */}
                        {data && (
                            <div className="flex justify-between items-center mt-12">
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
