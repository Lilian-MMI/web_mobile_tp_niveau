## LES COMPTES 

user --> 
    username: user
    password: mdp

admin -->
    username: admin
    password: mdp

superadmin -->
    username: superadmin
    password: mdp

## LANCER LE PROJET LOCALEMENT

Si vous utilisez pnpm vous pouvez lancer la commande suivante pour lancer le projet

```bash
pnpm -r install
pnpm run -r dev
```

Sinon vous devez installer les dépendances de chaque projet avec la commande suivante

```bash
cd back
npm install
npm run dev
cd ../front
npm install
npm run dev
```