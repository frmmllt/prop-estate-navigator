
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { 
  Home, 
  Upload, 
  FileText, 
  Filter, 
  ArrowRight, 
  Map, 
  MailOpen 
} from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gradient-to-br from-real-blue/90 to-real-blue">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gestion et Prospection Immobilière Professionnelle
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Importez vos données, gérez vos propriétés, et générez des courriers personnalisés en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-real-blue hover:bg-white/90">
                <Link to="/properties" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>Voir les propriétés</span>
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/upload" className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <span>Importer des données</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tout ce dont vous avez besoin pour votre prospection immobilière
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-real-blue/10 text-real-blue rounded-lg flex items-center justify-center mb-4">
                <Filter className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestion des données</h3>
              <p className="text-gray-600 mb-4">
                Importez vos fichiers Excel, filtrez les données et consultez les fiches détaillées des propriétés en quelques clics.
              </p>
              <Link to="/properties" className="text-real-blue flex items-center gap-1 hover:underline">
                <span>Explorer les propriétés</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-real-teal/10 text-real-teal rounded-lg flex items-center justify-center mb-4">
                <Map className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Localisation et visualisation</h3>
              <p className="text-gray-600 mb-4">
                Visualisez les propriétés sur une carte, accédez aux informations essentielles du quartier et optimisez votre stratégie.
              </p>
              <Link to="/properties" className="text-real-teal flex items-center gap-1 hover:underline">
                <span>Voir la carte</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-real-amber/10 text-real-amber rounded-lg flex items-center justify-center mb-4">
                <MailOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Génération de courriers</h3>
              <p className="text-gray-600 mb-4">
                Créez et personnalisez des modèles de courriers professionnels, puis générez des PDF prêts à être envoyés.
              </p>
              <Link to="/templates" className="text-real-amber flex items-center gap-1 hover:underline">
                <span>Gérer les modèles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à améliorer votre prospection immobilière ?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Commencez à utiliser notre outil dès maintenant et simplifiez votre travail quotidien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/upload" className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <span>Importer vos données</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/templates" className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Gérer les modèles</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
