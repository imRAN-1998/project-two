import { Component, OnInit, Input} from '@angular/core';
import { RecipesServices } from '../../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input('toChildItem') r;
  @Input ('indexValue') id;
  // @Output() out1=new EventEmitter<any>();
  onclicka(){
    // this.out1.emit(this.r);
    // this.recipesService1.selectedItem.emit(this.r); 
    // this.router1.navigate([this.r.id,'detail'],{relativeTo : this.route1})
  }

  constructor(private recipesService1 : RecipesServices,
    private router1 : Router,
    private route1 : ActivatedRoute) { }

  ngOnInit(): void {
    
    // console.log(this.r);
  }

}
