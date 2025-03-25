
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LPLayoutProps {
  children: React.ReactNode;
}

export const LPLayout = ({ children }: LPLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
