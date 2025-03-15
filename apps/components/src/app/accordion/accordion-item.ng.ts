import { Component, input } from '@angular/core';
import {
  NgpAccordionContent,
  NgpAccordionItem,
  NgpAccordionTrigger,
} from 'ng-primitives/accordion';
import { NgpButton } from 'ng-primitives/button';

@Component({
  selector: 'app-accordion-item',
  hostDirectives: [
    {
      directive: NgpAccordionItem,
      inputs: ['ngpAccordionItemValue:value', 'ngpAccordionItemDisabled:disabled'],
    },
  ],
  imports: [NgpAccordionContent, NgpAccordionTrigger, NgpButton],
  template: `
    <button ngpAccordionTrigger ngpButton>{{ heading() }}</button>

    <div ngpAccordionContent>
      <ng-content />
    </div>
  `,
  styles: `
    :host {
    }

    [ngpAccordionContent] {
      display: none;
    }

    [ngpAccordionContent][data-open] {
      display: block;
    }

    [ngpAccordionTrigger][data-focus-visible] {
    }
  `,
})
export class AccordionItem {
  /** The accordion item heading */
  readonly heading = input.required<string>();
}
