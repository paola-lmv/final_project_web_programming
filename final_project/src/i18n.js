import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Recipe Gallery": "Recipe Gallery",
      " Registration List":" Registration List",
      "Add New Recipe":"Add New Recipe",
      "Recipe Manager":"Recipe Manager",
      "Database Control":"Database Control",
      "Order Management":"Order Management",
      "The Forecast":"The Forecast",
      "Login":"Login",
      "Inscription":"Inscription",
      "Log Out":"Log Out",
      "Ingredient":"Ingredient",
      "Supplier":"Supplier",
      "Web Link of the ingredient":"Web Link of the ingredient",
      "Quantity":"Quantity",
      "Measure":"Measure",
      "Price €":"Price €",
      "Loading":"Loading",
      "Save":"Save",
      "Ingredients Table":"Ingredients Table",
      "Name":"Name",
      "Minimum Purchase Quantity":"Minimum Purchase Quantity",
      "Chosen Purchase Quantity":"Chosen Purchase Quantity",
      "Save and Recalculate":"Save and Recalculate",
      "Add a New Ingredient":"Add a New Ingredient",
      "Add":"Add",
      "Create a New Recipe":"Create a New Recipe",
      "Title":"Title",
      "Portion":"Portion",
      "Description":"Description",
      "Image":"Image",
      "Create":"Create",
      "The recipe is for":"The recipe is for",
      "people":"people",
      "Delete":"Delete",
      "Edit Description & Image":"Edit Description & Image",
      "Actions":"Actions",
      "Add Ingredient":"Add Ingredient",
      "Delete Recipe":"Delete Recipe",
      "Save Changes":"Save Changes",
      "Cancel":"Cancel",
      "New Ingredient":"New Ingredient",
      "Surname":"Surname",
      "Your Surname":"Your Surname",
      "LastName":"LastName",
      "Your Last Name":"Your Last Name",
      "Select an option":"",
      "Yes":"Yes",
      "No":"No",
      "Submit":"Submit",
      "Are you a member of the BDE?":"Are you a member of the BDE?",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":""

    }
  },
  fr: {
    translation: {
     "Recipe Gallery" : "Galerie de Recettes",
      "Registration List" : "Liste d'Inscription",
      "Add New Recipe" : "Ajouter une Recette",
      "Recipe Manager" : "Gestionnaire de Recettes",
      "Database Control" : "Contrôle de la Base de Données",
      "Order Management" : "Gestion des Commandes",
      "The Forecast":"Le Prévisionel",
      "Login":"Connexion",
      "Inscription":"Inscription",
      "Log Out":"Deconnexion",
      "Ingredient":"Ingrédient",
      "Supplier":"Fournisseur",
      "Web Link of the ingredient":"Site Web de l'Ingrédient",
      "Quantity":"Quantité",
      "Measure":"Unité",
      "Price €":"Prix €",
      "Loading":"Chargement",
      "Save ":"Sauvegarder ",
      "Ingredients Table":"Tableau des Ingrédients",
      "Name":"Nom",
      "Minimum Purchase Quantity":"Quantité minimale d'achat",
      "Chosen Purchase Quantity":"Quantité d'achat choisie",
      "Save and Recalculate":"Sauvegarder et Recalculer",
      "Add a New Ingredien":"Ajouter un Ingrédient",
      "Add":"Ajouter",
      "Create a New Recipe":"Crée une Nouvelle Recette",
      "Title":"Titre",
      "Portion":"Portion",
      "Description":"Description",
      "Image":"Image",
      "Create":"Créer",
      "The recipe is for":"La recette est pour",
      "people":"personne",
      "Delete":"Supprimer",
      "Edit Description & Image":"Modifier la Description et l'Image",
      "Actions":"Actions",
      "Add Ingredient":"Ajouter un Ingrédient",
      "Delete Recipe":"Supprimer la Recette",
      "Save Changes":"Sauvegarder les Changements",
      "Cancel":"Fermer",
      "New Ingredient":"Nouvel Ingrédient",
      "Surname":"Prénom",
      "Your Surname":"Ton Prénom",
      "LastName":"Nom de Famille",
      "Your Last Name":"Ton Nom de Famille",
      "Submit":"Soumettre",
      "Yes":"Oui",
      "No":"Non",
      "Are you a member of the BDE?":"Es-tu un membre du BDE?",
      "Select an option":"Selectioner une option",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":"",
      "":""

      
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n