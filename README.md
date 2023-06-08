# o-bing-front

Font of the O-bing project

# Local dev deployment

### Install dependencies

Run the following commands to install project's dependencies :

```.\cd obing-dev\```

```npm install```

- If you see any vulnerabilities while installing dependencies, run the following ```npm audit fix```.

- If there are still vulnerabilities, check your Angular version.

- That also may be due to some dependencies updates that this repository didn't use since it's last deployment (inform me plz)

### Launch local server

```ng serve```

You shoulld be able to vist your website locally deployed at ```http://localhost:4200/```.

As Angular handle 'hot reload', saving your files will update your website vizualisation.

# Firebase deployment

### Account logout/login

Run the following commands :

```firebase logout``` (to be sure you don't try to connect with the wrong account)

```firebase login```

### Project deployment

Run the following commands :

```firebase init```

```ng build```

Find the ```"firebase.json``` file and make it look like this :

.
.
.
 "hosting": {
    "site": "o-bing-pld",
    "public": "dist/obing-dev",
    "ignore": [
.
.
.

Finally, run the following command to deploy your website on firebase hosting :

```firebase deploy --only hosting:o-bing-pld```