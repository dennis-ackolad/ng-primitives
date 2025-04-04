/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InjectionToken, inject } from '@angular/core';
import type { NgpSeparator } from './separator';

export const NgpSeparatorToken = new InjectionToken<NgpSeparator>('NgpSeparatorToken');

/**
 * Inject the Separator directive instance
 */
export function injectSeparator(): NgpSeparator {
  return inject(NgpSeparatorToken);
}
