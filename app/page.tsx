import ClientMap from "./client-map";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ClientMap></ClientMap>
      </main>
    </div>
  );
}
