
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">
            <img
              src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
              alt="SPLYCAPITAL"
              className="h-8"
            />
          </Link>
        </div>

        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        ) : (
          <div className="flex space-x-6">
            {/* Home link removed from here */}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 py-4 px-6">
          <div className="flex flex-col space-y-4">
            {/* Also removed Home link from mobile menu */}
          </div>
        </div>
      )}
    </nav>
  );
};
