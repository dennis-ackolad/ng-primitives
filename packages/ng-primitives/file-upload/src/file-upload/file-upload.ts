/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BooleanInput, coerceStringArray } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgpFocusVisible, NgpHover, NgpPress } from 'ng-primitives/interactions';
import { fileUploadState, provideFileUploadState } from './file-upload-state';

@Directive({
  selector: '[ngpFileUpload]',
  exportAs: 'ngpFileUpload',
  providers: [provideFileUploadState()],
  host: {
    '[attr.data-disabled]': 'state.disabled() ? "" : null',
    '[attr.data-dragover]': 'isDragOver() ? "" : null',
  },
  hostDirectives: [NgpHover, NgpFocusVisible, NgpPress],
})
export class NgpFileUpload {
  /**
   * Access the host element.
   */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * The accepted file types.
   */
  readonly fileTypes = input<string[] | undefined, string>(undefined, {
    alias: 'ngpFileUploadFileTypes',
    transform: coerceStringArray,
  });

  /**
   * Whether to allow multiple files to be selected.
   */
  readonly multiple = input<boolean, BooleanInput>(false, {
    alias: 'ngpFileUploadMultiple',
    transform: booleanAttribute,
  });

  /**
   * Whether to allow the user to select directories.
   */
  readonly directory = input<boolean, BooleanInput>(false, {
    alias: 'ngpFileUploadDirectory',
    transform: booleanAttribute,
  });

  /**
   * Whether drag-and-drop is enabled.
   */
  readonly dragAndDrop = input<boolean, BooleanInput>(true, {
    alias: 'ngpFileUploadDragDrop',
    transform: booleanAttribute,
  });

  /**
   * Whether the file upload is disabled.
   */
  readonly disabled = input<boolean, BooleanInput>(false, {
    alias: 'ngpFileUploadDisabled',
    transform: booleanAttribute,
  });

  /**
   * Emits when the user selects files.
   */
  readonly selected = output<FileList | null>({
    alias: 'ngpFileUploadSelected',
  });

  /**
   * Emits when the user selects files.
   */
  readonly canceled = output<void>({
    alias: 'ngpFileUploadCanceled',
  });

  /**
   * Emits when the user drags a file over the file upload.
   */
  readonly dragOver = output<boolean>({
    alias: 'ngpFileUploadDragOver',
  });

  /**
   * Whether the user is currently dragging a file over the file upload.
   */
  protected readonly isDragOver = signal<boolean>(false);

  /**
   * Store the file input element.
   */
  private input: HTMLInputElement = document.createElement('input');

  /**
   * The file upload state.
   */
  protected readonly state = fileUploadState<NgpFileUpload>(this);

  constructor() {
    this.input.type = 'file';
    this.input.addEventListener('change', () => this.state.selected.emit(this.input.files));
    this.input.addEventListener('cancel', () => this.state.canceled.emit());
  }

  @HostListener('click')
  protected showFileDialog(): void {
    if (this.state.disabled()) {
      return;
    }

    const fileTypes = this.state.fileTypes()?.join(',');

    if (fileTypes) {
      this.input.accept = fileTypes;
    }

    this.input.multiple = this.state.multiple();
    this.input.webkitdirectory = this.state.directory();
    this.input.click();
  }

  @HostListener('dragenter', ['$event'])
  protected onDragEnter(event: DragEvent): void {
    if (this.state.disabled() || !this.state.dragAndDrop()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
    this.state.dragOver.emit(true);
  }

  @HostListener('dragover', ['$event'])
  protected onDragOver(event: DragEvent): void {
    if (this.state.disabled() || !this.state.dragAndDrop()) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    this.isDragOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  protected onDragLeave(event: DragEvent): void {
    if (this.state.disabled() || !this.state.dragAndDrop() || !this.isDragOver()) {
      return;
    }

    // if the element we are dragging over is a child of the file upload, ignore the event
    if (this.elementRef.nativeElement.contains(event.relatedTarget as Node)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    this.dragOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  protected onDrop(event: DragEvent): void {
    if (this.state.disabled() || !this.state.dragAndDrop()) {
      return;
    }

    event.preventDefault();
    this.isDragOver.set(false);
    this.state.dragOver.emit(false);

    if (event.dataTransfer?.files) {
      this.state.selected.emit(event.dataTransfer.files);
    }
  }
}
