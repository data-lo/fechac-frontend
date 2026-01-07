export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 flex flex-col h-[calc(100vh-4rem)] gap-6 relative overflow-auto pt-2 bg-slate-50">
      {children}
    </div>
  );
}
