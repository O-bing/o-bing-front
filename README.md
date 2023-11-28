# o-bing-front

Font of the [O-bing](https://o-bing-pld.web.app/) project

## :warning::warning: Project in developpement :warning::warning:

# Local dev deployment

### Install dependencies

Run the following commands to install project's dependencies :

```
.\cd obing-dev\
```

```
npm install
```

- If you see any vulnerabilities while installing dependencies, run the following 
```
npm audit fix
```

- If there are still vulnerabilities, check your Angular version.

- That also may be due to some dependencies updates that this repository didn't use since it's last deployment (inform me about it at [obing.pro@hotmail.com](obing.pro@hotmail.com))

### Launch local server

```
ng serve
```

You shoulld be able to vist your website locally deployed at [http://localhost:4200/](http://localhost:4200/).

As Angular handle 'hot reload', saving your files will update your website vizualisation.

# Firebase deployment

### Packages errors

#### There is an error in the type definiition of the ```node_modules/@angular/fire/compat/firestore/interfaces.d.ts``` file.

Run the ```.github/workflows/package-patcher.js``` script to replace the following file content : 

```
export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot {
    data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot {
    readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange {
    readonly doc: QueryDocumentSnapshot<T>;
}


```

with :

```
export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot<T> {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot<T> {
    data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot<T> {
    readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange<T> {
    readonly doc: QueryDocumentSnapshot<T>;
}
```

### Firebase package installation & Account logout/login

Run the following commands :

```
npm install -g firebase-tools
```

```
firebase logout
```
(to be sure you don't try to connect with the wrong account)

```
firebase login
```

### Project deployment

Run the following commands :

```
firebase init
```

Choose to use the already existing configuration files for every step

During the ```firebase init``` compilation, you will have to select the following options :
```
 (*) Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 (*) Firestore: Configure security rules and indexes files for Firestore
 ( ) Functions: Configure a Cloud Functions directory and its files
 (*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ( ) Hosting: Set up GitHub Action deploys
 (*) Storage: Configure a security rules file for Cloud Storage
```

You will also have to give the build folder path :

```? What do you want to use as your public directory?```
```
dist/obing-dev
```

After completing every ```firebase init``` steps, run :

```
ng build
```

Find the ```firebase.json``` file and make the ```hosting``` part look like this :
```
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
```

Finally, run the following command to deploy your website on firebase hosting :

```
firebase deploy --only hosting:o-bing-pld
```
