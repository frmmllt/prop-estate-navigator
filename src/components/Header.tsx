
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Upload, FileText, Settings, User, LogIn, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-real-blue" />
          <span className="font-bold text-xl text-real-blue hidden sm:inline">PropEstateNavigator</span>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          {isAuthenticated && !isMobile && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/properties" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Propriétés</span>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="sm">
                <Link to="/upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Importer</span>
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="sm">
                <Link to="/templates" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Modèles</span>
                </Link>
              </Button>
            </>
          )}
          
          {isAuthenticated && (
            <Button asChild variant="ghost" size="icon">
              <Link to="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          {isAuthenticated ? (
            <Button 
              onClick={logout}
              variant="outline" 
              size={isMobile ? "icon" : "sm"}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              {!isMobile && <span>Déconnexion</span>}
            </Button>
          ) : (
            <Button 
              asChild
              variant="outline" 
              size={isMobile ? "icon" : "sm"}
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                {!isMobile && <span>Connexion</span>}
              </Link>
            </Button>
          )}
          
          {isAuthenticated && user && (
            <div className="ml-2 hidden sm:flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
