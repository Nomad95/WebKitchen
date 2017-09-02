//import Component from angular core

//import our Carousel Component
import {CSSCarouselComponent} from './carousel.component';
import {Component} from "@angular/core";

//@Component decorator
@Component({
    //tag
    selector: 'my-app2',
    //template
    template: `
	<div class="wrapper">
    <css-carousel></css-carousel>
        Abcd
    </div>
  `,
    //css
    styles: [`
   .wrapper{
      width: 60%;
      margin: 60px auto;
    }
  `],
    //tell angular we are using the css-carousel tag in this component
})
//actual class
export class SliderComponent { }
