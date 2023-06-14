export enum Page {
    Accueil = "accueil",
    CreatePost = "create-post",
    Inscription = "inscription",
    Connection = "connection",
    Profile = "profile",
    Contact = "contact",
    Comment = "comment",
    Post = "body-post"
  }
  
  export interface RouteData {
    page: Page;
    title: string;
    navbarName: string;
  }
  