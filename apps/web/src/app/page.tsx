import {
  PROVIDER_CAPABILITY_MATRIX,
  type ProviderCapability
} from "@pasarela/payment-core";

function summarizeCapabilities(capabilities: ProviderCapability[]) {
  const providerCount = new Set(
    capabilities.map((capability) => capability.providerCode)
  ).size;

  const methodCount = new Set(
    capabilities.map((capability) => capability.methodFamily)
  ).size;

  return { providerCount, methodCount };
}

const workflowPhases = [
  "Investigacion y requisitos",
  "Planificacion y orquestacion",
  "Implementacion por slices",
  "Validacion humana y QA",
  "Deploy y continuidad operativa"
];

export default function HomePage() {
  const { providerCount, methodCount } = summarizeCapabilities(
    PROVIDER_CAPABILITY_MATRIX
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10 md:px-10">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[0_30px_80px_rgba(20,33,61,0.08)] backdrop-blur">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--deep)]">
            Payment orchestration para Colombia
          </p>
          <h1
            className="max-w-4xl text-5xl font-semibold tracking-tight text-[var(--deep)] md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Un repositorio que ya piensa como producto, como plataforma y como
            equipo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/72">
            Este esqueleto arranca con dominio de pagos, monorepo, backoffice,
            rutas API, Supabase, Vercel y flujo multiagente, antes de entrar a
            los adapters reales de proveedores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-[var(--deep)] px-4 py-2 text-sm font-medium text-white">
              Next.js 16 + App Router
            </span>
            <span className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--deep)]">
              Supabase
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--deep)]">
              Turborepo
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--deep)]">
              Payment Core
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--deep)] p-6 text-white shadow-[0_30px_80px_rgba(20,33,61,0.18)]">
            <p className="text-sm uppercase tracking-[0.2em] text-white/65">
              Capacidad modelada
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold">{providerCount}</p>
                <p className="mt-1 text-sm text-white/70">proveedores base</p>
              </div>
              <div>
                <p className="text-4xl font-semibold">{methodCount}</p>
                <p className="mt-1 text-sm text-white/70">familias de metodo</p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--line)] bg-white/86 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.06)]">
            <p className="text-sm uppercase tracking-[0.2em] text-black/50">
              Superficies del producto
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-black/72">
              <li>Checkout y handoff bancario para PSE y Bre-B.</li>
              <li>Backoffice operativo con timeline y conciliacion.</li>
              <li>API para webhooks, ordenes e integraciones futuras.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {workflowPhases.map((phase, index) => (
          <article
            key={phase}
            className="rounded-[1.5rem] border border-[var(--line)] bg-white/80 p-5 shadow-[0_20px_45px_rgba(17,17,17,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Fase {index + 1}
            </p>
            <h2
              className="mt-3 text-2xl font-semibold text-[var(--deep)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {phase}
            </h2>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-white/74 p-8 shadow-[0_30px_80px_rgba(20,33,61,0.08)] backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-black/48">
              Proveedores y rieles observados
            </p>
            <h2
              className="mt-2 text-3xl font-semibold text-[var(--deep)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              La matriz tecnica ya vive dentro del codigo.
            </h2>
          </div>
          <a
            className="inline-flex w-fit items-center rounded-full border border-[var(--deep)] px-4 py-2 text-sm font-semibold text-[var(--deep)] transition hover:bg-[var(--deep)] hover:text-white"
            href="/operations"
          >
            Ver operacion
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROVIDER_CAPABILITY_MATRIX.slice(0, 6).map((capability: ProviderCapability) => (
            <article
              key={`${capability.providerCode}-${capability.methodFamily}-${capability.direction}`}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[#fffdfa] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-[var(--deep)]">
                  {capability.providerCode}
                </p>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {capability.direction}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-black/75">
                {capability.methodFamily}
              </p>
              <p className="mt-3 text-sm leading-6 text-black/62">
                {capability.notes}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
