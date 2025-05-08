
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userRoles: Record<string, string> = {
    student: "Student",
    admin: "Administrator",
    faculty: "Faculty Member",
    hod: "Head of Department"
  };

  const navItems = [
    { label: "Home", path: "/" },
    ...(isLoggedIn 
      ? [{ label: "Dashboard", path: "/dashboard" }] 
      : [
          { label: "Login", path: "/login" },
          { label: "Register", path: "/register" }
        ]),
    { label: "Track Complaint", path: "/track" }
  ];

  return (
    <nav className="bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 
            onClick={() => navigate("/")}
            className="text-primary-foreground text-xl font-bold cursor-pointer"
          >
            EduComplaint
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              onClick={() => navigate(item.path)}
              className="text-primary-foreground hover:bg-primary/90"
            >
              {item.label}
            </Button>
          ))}
          
          {isLoggedIn && (
            <div className="flex items-center ml-4">
              <div className="mr-4 text-primary-foreground">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs opacity-80">{user?.role && userRoles[user.role]}</p>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleLogout}
                className="text-primary-foreground border-primary-foreground hover:bg-primary/90"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            className="text-primary-foreground"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-6 bg-primary border-t border-primary-foreground/10">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Button 
                key={item.path}
                variant="ghost" 
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="text-primary-foreground justify-start hover:bg-primary/90"
              >
                {item.label}
              </Button>
            ))}
            
            {isLoggedIn && (
              <>
                <div className="py-2 border-t border-primary-foreground/10 text-primary-foreground">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs opacity-80">{user?.role && userRoles[user.role]}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-primary-foreground border-primary-foreground hover:bg-primary/90"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
