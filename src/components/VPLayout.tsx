
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface VPLayoutProps {
  children: React.ReactNode;
}

export const VPLayout = ({ children }: VPLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/venturepartners/auth");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/venturepartners/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Deals",
      href: "/venturepartners/deals",
      icon: FileText,
    },
    {
      name: "Limited Partners",
      href: "/venturepartners/lps",
      icon: Users,
    },
    {
      name: "Commissions",
      href: "/venturepartners/commissions",
      icon: DollarSign,
    },
    {
      name: "Settings",
      href: "/venturepartners/settings",
      icon: Settings,
    },
  ];

  const NavLinks = () => (
    <nav className="flex flex-col space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-900">
            <div className="flex flex-col h-0 flex-1">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Link to="/" className="text-white text-xl font-bold">
                    SPLY CAPITAL
                  </Link>
                </div>
                <div className="mt-8 flex-1 px-2 space-y-1">
                  <NavLinks />
                </div>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
                        {user?.email?.[0].toUpperCase() || "U"}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {user?.email}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center text-xs text-gray-300 hover:text-white"
                      >
                        <LogOut className="mr-1 h-3 w-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobile && (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden absolute top-4 left-4 z-50"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Link to="/" className="text-white text-xl font-bold">
                    SPLY CAPITAL
                  </Link>
                </div>
                <div className="mt-8 flex-1 px-2 space-y-1">
                  <NavLinks />
                </div>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
                        {user?.email?.[0].toUpperCase() || "U"}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {user?.email}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center text-xs text-gray-300 hover:text-white"
                      >
                        <LogOut className="mr-1 h-3 w-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Menu />
                </Button>
              )}
              <h1 className="text-2xl font-semibold">Venture Partner Portal</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
