import Header from '../components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F3EF]">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO */}
      <section className="flex justify-center mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full border border-[#E0DED8]">
          <h2 className="text-3xl font-bold text-[#1F241C] mb-4">
            Sistema Interno GCB
          </h2>

          <p className="text-[#5A5A5A] mb-8">
            Painel interno para gestão de colaboradores e solicitações internas.
          </p>

          <div className="flex gap-4">
            <a
              href="/collaborators"
              className="flex-1 text-center bg-[#6E8B3D] hover:bg-[#5F7A34] text-white py-3 rounded-xl transition"
            >
              Colaboradores
            </a>

            <a
              href="/requests"
              className="flex-1 text-center bg-[#6E8B3D] hover:bg-[#5F7A34] text-white py-3 rounded-xl transition"
            >
              Solicitações
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
