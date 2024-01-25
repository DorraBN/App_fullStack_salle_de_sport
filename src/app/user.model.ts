// user.model.ts
export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    image:string;
    // Ajoutez d'autres propriétés si nécessaire
  }
  // user.model.ts
export class User {
   
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    password: string;
  image:string;
    constructor(
   
      nom: string,
      prenom: string,
      email: string,
      tel: string,
      password: string,
      image:string
    ) {
    
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.tel = tel;
      this.password = password;
      this.image=image
    }
  }
  