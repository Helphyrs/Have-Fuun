- commande pour lancer le serveur : docker-compose up --build

Si lors de la création, il y a des soucis, il se pourrait que la persistence des données ne soit plus présentes, donc s'il s'agit des utilisateurs, il faut 
décommenter dans le dossier Fixtures > Fichier loadFixtures.js la partie des Users ;

Il faudra recréer le build, donc il faudra faire la commande ng build, car le ng build que le docker fait, est sur la machine, donc s'il y a des modifications sur des éléments html ts, dans le dossier d'angular, il ne seront pas traitées 

=> Dans le Dockerfile, il va build le projet angular puis envoyé le dossier browser dans dist, donc tout changement qui se situe autrepart que dans le dist ne 
sera pas interprété.

J'ai fais des tests complémentaires, et en essayant d'aller sur un article précisément, il renvoie une erreur  Unknown column 'a.ID_article' in 'on clause 
j'ai l'impression que les aliases (ex : FROM Articles a ) est mal interprété 