import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from 'src/app/shared/services/cocktail.service';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.scss'],
})
export class CocktailFormComponent implements OnInit {
  public cocktailForm!: FormGroup;
  get ingredients() {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cocktailService: CocktailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cocktailForm = this.formBuilder.group({
      name: ['', Validators.required],
      img: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.formBuilder.array([], Validators.required),
    });
  }

  public addIngredient(): void {
    this.ingredients.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        quantity: [0, Validators.required],
      })
    );
  }

  public submit(): void {
    this.cocktailService.addCocktail(this.cocktailForm.value);
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
