import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-form-row]',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent {
  @Input() label: string;
  @Input() errors?: string[];
}
