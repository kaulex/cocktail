import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cocktail } from 'src/app/shared/interfaces/cocktail.interface';
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
  public cocktail!: Cocktail;

  constructor(
    private formBuilder: FormBuilder,
    private cocktailService: CocktailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get("index");
      if (index !== null) {
        this.cocktailService
          .getCocktail(Number(index))
          .pipe(first())
          .subscribe((cocktail: Cocktail) => {
            this.cocktail = cocktail;
            this.initForm(this.cocktail);
          });
      } else {
        this.initForm();
      }
    });
  }

  public initForm(
    cocktail: Cocktail = { name: '', img: '', description: '', ingredients: [] }
  ) {
    this.cocktailForm = this.formBuilder.group({
      name: [cocktail.name, Validators.required],
      img: [cocktail.img, Validators.required],
      description: [cocktail.description, Validators.required],
      ingredients: this.formBuilder.array(
        cocktail.ingredients.map((ingredients) =>
          this.formBuilder.group({
            name: [ingredients.name, Validators.required],
            quantity: [ingredients.quantity, Validators.required],
          })
        ),
        Validators.required
      ),
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
    if (this.cocktail) {
      this.cocktailService.editCocktail(this.cocktail._id!, this.cocktailForm.value).subscribe();
    } else {
      this.cocktailService.addCocktail(this.cocktailForm.value).subscribe();
    }

    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
