import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';


@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {

  @Input()
  public cocktails: Cocktail[] = [] || null;


  constructor() { }

  ngOnInit(): void {
  }

}
