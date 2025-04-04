/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';
import { NgpCanDisable, NgpDisabledToken, setupInteractions } from 'ng-primitives/internal';
import { buttonState, provideButtonState } from './button-state';

@Directive({
  selector: '[ngpButton]',
  exportAs: 'ngpButton',
  providers: [{ provide: NgpDisabledToken, useExisting: NgpButton }, provideButtonState()],
  host: {
    '[attr.data-disabled]': 'state.disabled() ? "" : null',
    '[attr.disabled]': 'isButton && state.disabled() ? true : null',
  },
})
export class NgpButton implements NgpCanDisable {
  /**
   * Get the native element of the button.
   */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Whether the button is disabled.
   */
  readonly disabled = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  /**
   * Detect if this is an HTML button element.
   */
  protected readonly isButton = this.elementRef.nativeElement.tagName.toLowerCase() === 'button';

  /**
   * The button state.
   */
  protected readonly state = buttonState<NgpButton>(this);

  constructor() {
    // setup the hover, press, and focus-visible listeners
    setupInteractions({ disabled: this.state.disabled });
  }
}
