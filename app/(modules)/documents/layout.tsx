export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 flex flex-col h-screen gap-6 relative overflow-auto pt-16 bg-slate-50
">
      {children}
    </div>
  );
}
