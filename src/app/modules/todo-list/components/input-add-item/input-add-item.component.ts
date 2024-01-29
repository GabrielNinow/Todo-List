import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, input } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public InputText!: ElementRef;

  @Input({ required: true }) public inputListItems: IListItems[] = [];
  @Output() public outputAddListItems = new EventEmitter<IListItems>();

  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.InputText.nativeElement.value = '';

      const id = `ID ${new Date().getTime()}`

      this.outputAddListItems.emit({
        id,
        checked: false,
        value
      });

      return this.InputText.nativeElement.focus();
    }
  }
}
