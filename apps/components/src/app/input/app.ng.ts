import { Component } from '@angular/core';
import { Input } from './input.ng';

@Component({
  selector: 'app-input-example',
  imports: [Input],
  template: '<input app-input type="text" placeholder="Enter text" />',
})
export default class App {}
