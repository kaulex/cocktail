import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/services/cocktail.service';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

  cocktail!: Cocktail;
  private index: any;

  constructor(private PanierService : PanierService, private activatedRoute: ActivatedRoute, private CocktailService: CocktailService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.index = paramMap.get('index');
      console.log(this.index);
      this.cocktail = this.CocktailService.getCocktail(+this.index);
    })
  }

  addToPanier() {
    this.PanierService.addToPanier(this.cocktail.ingredients);
  }

}
