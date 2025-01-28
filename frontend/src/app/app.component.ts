import { Component } from '@angular/core';

@Component({
  selector: 'app-root',                  // This defines the custom HTML tag that represents this component in the template. It's how Angular identifies where to render the component in the HTML view. (<app-root />)
  templateUrl: './app.component.html',   // Path to the HTML template for this component.
  styleUrl: './app.component.css',       // Path to the CSS styles for this component.
  standalone: false                      // The component is not standalone. It is a part of an Angular module and must be declared inside a module (AppModule).
})
export class AppComponent {}
