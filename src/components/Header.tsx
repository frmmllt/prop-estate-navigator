
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Upload, FileText, Settings, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="container py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-real-blue" />
          <span className="font-bold text-xl text-real-blue hidden sm:inline">PropEstateNavigator</span>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-2">
          {!isMobile && (
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
          
          <Button asChild variant="ghost" size="icon">
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size={isMobile ? "icon" : "sm"}>
            <Link to="/profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {!isMobile && <span>Connexion</span>}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
