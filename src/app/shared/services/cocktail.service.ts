import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  public cocktails$: BehaviorSubject<Cocktail[]> = new BehaviorSubject([
    {
      name: 'Mojito',
      img:
        'https://static.750g.com/images/622-auto/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg',
      description:
        'Le Mojito est un classique cubain très demandé. On rajoute de la glace pilée ou des glaçons.',
      ingredients: [
        {
          name: 'rhum blanc',
          quantity: '2cl',
        },
        {
          name: 'Jus de citron vert',
          quantity: '1cl',
        },
        {
          name: 'Perrier',
          quantity: '20cl',
        },
        {
          name: 'Sucre de canne',
          quantity: '5g',
        },
        {
          name: 'Menthe fraîche',
          quantity: '6 feuilles',
        },
      ],
    },
    {
      name: 'Mai Tai',
      img:
        'https://www.cocktails-faciles.fr/get/img/cocktailspreview/258-mai-tai.jpg',
      description: 'Cocktail de type tropical',
      ingredients: [
        {
          name: 'rhum blanc',
          quantity: '2cl',
        },
        {
          name: 'rhum brun',
          quantity: '1cl',
        },
        {
          name: 'triple sec',
          quantity: '1cl',
        },
        {
          name: "sirop d'orgeat",
          quantity: '5g',
        },
        {
          name: 'Citron vert',
          quantity: '6 gouttes',
        },
        {
          name: 'Sirop de sucre',
          quantity: '1cl',
        },
      ],
    },
    {
      name: 'Moscow Mule',
      img:
        'https://bakingamoment.com/wp-content/uploads/2019/08/IMG_5823-moscow-mule.jpg',
      description:
        ' Il est très populaire chez les Américains. Composé de vodka, de citron vert, de gingembre et de soda, il est servi dans des mugs en cuivre.',
      ingredients: [
        {
          name: 'Vodka',
          quantity: '2cl',
        },
        {
          name: 'Jus de citron vert',
          quantity: '1cl',
        },
        {
          name: 'Gingembre',
          quantity: '3g',
        },
        {
          name: 'Soda',
          quantity: '20cl',
        },
      ],
    },
  ]);

  public getCocktail(index: number) {
    const cocktails = this.cocktails$.value;
    return cocktails[index];
  }

  constructor() {}
}
