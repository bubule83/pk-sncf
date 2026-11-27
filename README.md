# PK SNCF

Application web (PWA) non officielle, créée par Yann Hochet, qui affiche la ligne et le point kilométrique (PK) SNCF à partir du GPS.
Elle est indicative et ne remplace pas les procédures de sécurité officielles. Elle n'est affiliée ni à la SNCF ni à SNCF Réseau.

## Sources et licences

- Contient des informations issues de la Base de données SNCF OPEN DATA, mises à disposition aux conditions de la licence SNCF OPEN DATA (https://data.sncf.com/pages/licence) : liste des gares (SNCF Réseau), horaires temps réel (SNCF Voyageurs, via transport.data.gouv.fr).
- Points kilométriques (`pks.json`) : base dérivée de https://github.com/nicolaswurtz/extras-opendata-sncf-reseau, elle-même reconstituée à partir des données ouvertes de SNCF Réseau, licence ODbL. Cette base dérivée est mise à disposition sous licence ODbL.
- Points d'accès (`acces.json`) : carte « SNCF 930 ».
- Fond de carte © contributeurs OpenStreetMap (ODbL), bibliothèque Leaflet.
- Météo : Open-Meteo.com (CC BY 4.0).
- Logo SNCF Réseau et jingle : droits réservés à leurs propriétaires respectifs.
