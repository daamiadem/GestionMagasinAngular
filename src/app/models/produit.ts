import { DetailFacture } from "./detailFacture";
import { DetailProduitEntity } from "./detailProduitEntity";
import { Fournisseur } from "./fournisseur";
import { Rayon } from "./rayon";
import { Stock } from "./stock";

export class Produit {
  idProduit: number | undefined;
  codeProduit: string | undefined;
  libelleProduit: string | undefined;
  prixUnitaire: number | undefined;
  stock: Stock;
  rayon: Rayon;
  fournisseurs: Fournisseur[];
  detailProduitEntity: DetailProduitEntity;
 // detailFactures: DetailFacture[];
}
