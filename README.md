DOCUMENT TECHNIQUE — APPLICATION MOBILE IMMOBILIÈRE

1. Présentation du projet
Nom du projet : OPHRUS Immo
Client : OPHRUS Groupe 
Développé par : CyberFusion
Date de début : Avril 2025
Technologie utilisée : React Native (Expo) + Backend Node.js / Express

2. Objectif de l'application
Ce projet vise à créer une application mobile simple d’utilisation qui facilite la recherche de maisons, d’appartements ou de terrains à louer ou à vendre au Congo. L’idée principale est de rendre les démarches immobilières plus faciles pour tous, en centralisant les offres sur une seule application fiable.

3. Fonctionnement général
Pour les utilisateurs :
•	Ils doivent se créer un compte ou se connecter pour accéder aux annonces
•	Ils peuvent parcourir les biens disponibles, lire les descriptions, voir les photos, et utiliser un bouton "Je suis intéressé / Mise en contact" pour manifester leur intérêt
Pour l’agence :
•	Elle garde le contrôle total sur la mise en relation avec les propriétaires
•	Elle reçoit les demandes et contacte les clients si elle juge la demande sérieuse
4. Authentification
•	Accès au contenu uniquement après inscription ou connexion
•	Connexion sécurisée avec mot de passe chiffré
•	Récupération de mot de passe possible (par e-mail ou SMS)
5. Gestion des demandes (Tickets)
Un "ticket" est une sorte de fiche de demande qu’un utilisateur envoie lorsqu’il est intéressé par un bien. Ce ticket est traité par l’agence.
Exemple :
•	M. Alvine voit une maison qui l’intéresse
•	Il clique sur “Je suis intéressé” et peut écrire un petit message
•	L’agence reçoit une alerte et peut accepter ou refuser la demande

6. Application mobile (Frontend avec React Native)
Les écrans principaux :
•	Page d’accueil
•	Liste des annonces
•	Détail d’un bien
•	Formulaire de demande
•	Espace personnel avec historique

7. Serveur (Backend avec Node.js / Express)
Ce qui se passe dans les coulisses :
•	Le serveur gère les utilisateurs, les annonces, et les tickets
•	Il protège les données et contrôle qui peut faire quoi

8. Modèle économique (Comment l’entreprise gagne de l’argent)
a. Commission sur transaction (Modèle principal)
L’agence prend une part sur chaque location ou vente conclue grâce à l’application.
b. Mise en avant des biens (future option)
Certains biens peuvent être mis en avant moyennant paiement
c. Accès agence partenaire (future option)
Des agences tierces peuvent diffuser leurs annonces via un abonnement
d. Données analytiques (future option)
Analyse de tendances immobilières vendue aux professionnels

9. Sécurité
•	Données protégées par des identifiants uniques et des jetons d’accès (JWT)
•	Seules les personnes autorisées peuvent voir ou modifier les données

10. Évolutions futures (après la première version)
•	Chatbot d’accueil pour guider les utilisateurs
•	Paiement en ligne pour réserver un bien
•	Carte interactive avec géolocalisation

11. Livraison
•	Démo client : Vendredi 25 avril 2025
•	APK de test : Généré avec Expo (Android uniquement pour l’instant)
•	Documents livrés :
o	Application testable
o	Ce document technique 
o	Cahier des charges + budget prévisionnel (voir ci-dessous)

________________________________________

ANNEXE – Cahier des charges & Budget prévisionnel
Deux scénarios d’infrastructure sont proposés pour le projet OPHRUS Immo :
1.	Phase 1 – Lancement MVP (Minimum Viable Product).
2.	Phase 2 – Passage en production (scalable, pro, monétisable)

________________________________________
Option 1 : Démarrage Économique
Objectif : Minimiser les coûts initiaux tout en gardant une structure sérieuse, scalable et sécurisée.
Cette option permet de développer et tester l’application avec des outils cloud reconnus, sans frais directs.
Poste	Détails	Coût estimé 
Hébergement Backend (Railway Free)	Hébergement gratuit avec limites de ressources. Suffisant pour dev/test.	0 XAF/an
Base de données (MongoDB Atlas M0)	Cluster gratuit (512 Mo, trafic limité) idéal pour prototypage.	0 XAF/an
Nom de domaine (.com ou .cd)	Nom de domaine pour l’appli ou l’admin.	6 000 XAF/an
Envoi d’e-mails transactionnels (MailerSend)	Plan gratuit (jusqu’à 3 000 mails/mois).	0 XAF/an
Main-d'œuvre de conception et développement	Paiement unique. 30% à la commande.	600 000 XAF (180 000 XAF à la commande)
Frais de publication Google Play Store	Frais uniques (25 USD).	14 500 XAF
Frais de publication Apple App Store	À reporter pour plus tard.	0 XAF (prévu)
Authentification via Email ou WhatsApp / OTP	Firebase propose OTP et email jusqu’à une certaine limite gratuitement.	0 XAF
TOTAL ESTIMÉ DÉMARRAGE		620 500 XAF

________________________________________


Option 2 : Production Complète
Objectif : Offrir une solution robuste, rapide, scalable et sécurisée, prête à gérer un trafic important, avec des outils premium.
Cette version est idéale dès que le service commence à recevoir des utilisateurs actifs ou qu’une mise en ligne publique est prévue.
Poste	Détails	Coût estimé 
Hébergement Backend (Railway Pro)	Offre Pro, rapide et stable pour Node.js.	120 000 XAF/an (~10 000 XAF/mois)
Base de données (MongoDB Atlas Flex)	Cluster flexible et scalable, ~8–18 USD/mois selon usage.	216 000 XAF/an (~18 000 XAF/mois)
Nom de domaine (.com ou .cd)	Nom de domaine professionnel.	8 000 XAF/an
Envoi d’e-mails transactionnels (MailerSend)	Envoi de mails automatisés (plan pro).	36 000 XAF/an (~3 000 XAF/mois)
Main-d'œuvre de conception et développement	Paiement unique. 30% à la commande.	600 000 XAF (180 000 XAF à la commande)
Frais de publication Google Play Store	Paiement unique.	14 500 XAF
Frais de publication Apple App Store	Compte développeur Apple annuel.	57 100 XAF/an (~99 USD/an)
Authentification OTP via Firebase	Option gratuite ou en fonction du volume.	Gratuit (limite Firebase)
TOTAL ESTIMÉ PRODUCTION		1 051 600 XAF

________________________________________

Au 18 avril 2025, le taux de change du dollar américain (USD) vers le franc CFA BEAC (XAF) est d'environ 576,72 XAF pour 1 USD, selon les données de Xe.
Pourquoi cette double approche ?
Le projet OPHRUS Immo est conçu pour être économique au départ, mais scalable et robuste dès que l’activité augmente.
Ce choix progressif permet de maîtriser les dépenses tout en anticipant la croissance du service.

