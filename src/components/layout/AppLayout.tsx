import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-navy-950 noise-overlay">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[260px] right-0 h-[500px] bg-gradient-radial from-navy-700/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-gold-500/4 via-transparent to-transparent" />
      </div>

      <Sidebar />
      <Navbar />

      <main
        className="ml-[260px] pt-16 min-h-screen"
        style={{ position: "relative" }}
      >
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
