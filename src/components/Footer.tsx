
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-real-slate text-white py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">PropEstateNavigator</h3>
            <p className="text-sm text-gray-300">
              Outil de prospection immobilière professionnel pour gérer vos données et générer des courriers personnalisés.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/properties" className="hover:text-white transition">Propriétés</a></li>
              <li><a href="/upload" className="hover:text-white transition">Importer des données</a></li>
              <li><a href="/templates" className="hover:text-white transition">Modèles de courriers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/help" className="hover:text-white transition">Documentation</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} PropEstateNavigator. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
