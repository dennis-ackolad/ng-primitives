/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { contentChild, Directive } from '@angular/core';
import { NgpHeaderToken } from 'ng-primitives/common';
import { NgpListboxSectionToken } from './listbox-section-token';

@Directive({
  selector: '[ngpListboxSection]',
  exportAs: 'ngpListboxSection',
  providers: [{ provide: NgpListboxSectionToken, useExisting: NgpListboxSection }],
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'header()?.id()',
  },
})
export class NgpListboxSection {
  /**
   * Access the header of the section if it exists.
   */
  protected readonly header = contentChild(NgpHeaderToken, { descendants: true });
}
