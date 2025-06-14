
import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen } from "lucide-react";

const adminDoc = (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold flex gap-2 items-center">
      <BookOpen className="h-6 w-6 text-real-blue" /> Documentation Administrateur
    </h2>
    <ul className="list-disc ml-6 space-y-2 text-gray-700">
      <li>Gérez les accès utilisateurs par section géographique (panneau administrateur).</li>
      <li>Ajoutez, modifiez ou supprimez les utilisateurs et configurez les “sections autorisées”.</li>
      <li>
        Retrouvez la gestion complète des <b>propriétés</b> : filtrage, import Excel, édition, association à une section, et gestion des droits.
      </li>
      <li>
        Générez des <b>modèles de courriers</b> personnalisés pour communication avec les propriétaires.
      </li>
      <li>
        Accédez à la <b>carte interactive</b> pour visualiser localisations, sections, et données avancées via Mapbox.
      </li>
      <li>
        Accédez à toutes les fonctionnalités utilisateur, et configurez les accès pour chaque rôle.
      </li>
      <li>
        Astuce : N'oubliez pas de sauvegarder après toute modification des accès utilisateurs !
      </li>
    </ul>
    <hr className="my-6" />
    <h3 className="text-xl font-semibold mt-2">Contact et ressources</h3>
    <ul className="list-disc ml-6 text-gray-600">
      <li>Pour toute aide ou demande spécifique, contactez l’administrateur technique de la plateforme.</li>
      <li>
        Documentation technique avancée : reportez-vous à la documentation interne ou au support si besoin d’intégrations personnalisées.
      </li>
    </ul>
  </div>
);

const userDoc = (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold flex gap-2 items-center">
      <BookOpen className="h-6 w-6 text-real-blue" /> Documentation Utilisateur
    </h2>
    <ul className="list-disc ml-6 space-y-2 text-gray-700">
      <li>
        <b>Consultez les propriétés</b> accessibles selon vos autorisations de section (<b>tableau et carte</b>).
      </li>
      <li>
        Utilisez les filtres pour rechercher une propriété par référence, adresse, prix, surface, etc.
      </li>
      <li>
        Visualisez vos propriétés sur la <b>carte interactive</b> et obtenez des informations de localisation.
      </li>
      <li>
        Générez et téléchargez des <b>modèles de courriers</b> (documents PDF) pour vos envois.
      </li>
      <li>
        <b>Profil&nbsp;:</b> accédez à vos informations de compte en cliquant sur l’icône utilisateur.
      </li>
    </ul>
    <hr className="my-6" />
    <p className="text-gray-600">
      Pour tout problème ou question d’usage, contactez votre administrateur.
    </p>
  </div>
);

const DocumentationPage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="container max-w-3xl py-10">
        {user?.role === "admin" ? adminDoc : userDoc}
      </div>
    </Layout>
  );
};

export default DocumentationPage;
