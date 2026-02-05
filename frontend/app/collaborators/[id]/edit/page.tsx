'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCollaboratorPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        async function loadCollaborator() {
            const res = await fetch(
                `http://127.0.0.1:8000/api/collaborators/${id}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!res.ok) {
                router.push('/collaborators');
                return;
            }

            const data = await res.json();
            setName(data.name);
            setRole(data.role);
            setDepartment(data.department);
            setLoading(false);
        }

        loadCollaborator();
    }, [id, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        await fetch(
            `http://127.0.0.1:8000/api/collaborators/${id}/`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    name,
                    role,
                    department,
                }),
            }
        );

        router.push('/collaborators');
    }

    if (loading) {
        return <p className="p-10">Carregando...</p>;
    }

    return (
        <main className="min-h-screen bg-[#F4F3EF]">
            <header className="bg-[#1F241C] text-white pt-14 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold">
                        Editar Colaborador
                    </h1>
                </div>
            </header>

            <section className="flex justify-center px-4 -mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border"
                >
                    <input
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        required
                    />

                    <input
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-black"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Cargo"
                        required
                    />

                    <input
                        className="w-full mb-4 p-3 border rounded-xl text-black placeholder:text-black"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Setor"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#6E8B3D] hover:bg-[#5F7A34] text-white py-3 rounded-xl"
                    >
                        Salvar Alterações
                    </button>
                </form>
            </section>
        </main>
    );
}
