import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/shared/services/cocktail.service';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {

  cocktail!: Cocktail;
  private index: any;
  public subcription: Subscription = new Subscription;

  constructor(private PanierService : PanierService, private activatedRoute: ActivatedRoute, private cocktailService: CocktailService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (this.subcription) {
        this.subcription.unsubscribe();
      }
      this.index = paramMap.get('index');
      this.subcription = this.cocktailService
        .getCocktail(this.index)
        .subscribe((cocktail: Cocktail) => {
          this.cocktail = cocktail;
        });
    });
  }

  addToPanier() {
    this.PanierService.addToPanier(this.cocktail.ingredients);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
