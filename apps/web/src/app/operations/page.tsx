const operationsTracks = [
  {
    title: "Backoffice",
    detail: "Timeline operativa, busqueda por referencias, conciliacion y soporte."
  },
  {
    title: "Asincronia",
    detail: "Webhook inbox, polling, jobs y eventos durables."
  },
  {
    title: "Gobierno",
    detail: "GitFlow, skills internas, backlog y trazabilidad hacia Azure DevOps."
  }
];

export default function OperationsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 md:px-10">
      <a
        className="inline-flex w-fit rounded-full border border-black/15 bg-white/80 px-4 py-2 text-sm font-semibold text-black/70"
        href="/"
      >
        Volver al overview
      </a>

      <section className="rounded-[2rem] border border-black/10 bg-white/78 p-8 shadow-[0_30px_80px_rgba(17,17,17,0.06)]">
        <p className="text-sm uppercase tracking-[0.24em] text-black/45">
          Superficie operativa
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#14213d]">
          El producto no se queda en el checkout: tambien nace para operar.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-black/66">
          Esta vista sirve como placeholder del futuro panel operativo donde se
          unificaran estados, intentos, eventos, payouts, reconciliaciones y
          excepciones manuales.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {operationsTracks.map((track) => (
          <article
            key={track.title}
            className="rounded-[1.5rem] border border-black/10 bg-[#fffdfa] p-5 shadow-[0_18px_40px_rgba(17,17,17,0.04)]"
          >
            <h2 className="text-2xl font-semibold text-[#14213d]">
              {track.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-black/65">{track.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
