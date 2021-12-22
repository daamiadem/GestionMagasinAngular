import { Facture } from "./facture";

export class Client {
  idClient: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  profession: string;
  categorieClient: string;
  facture!: Facture;
    //picture!: string;
}
