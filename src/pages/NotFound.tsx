
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-20">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Page introuvable</h2>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
