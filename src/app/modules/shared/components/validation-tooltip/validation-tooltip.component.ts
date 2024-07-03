import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[app-validation-tooltip]',
  templateUrl: './validation-tooltip.component.html',
  styleUrls: ['./validation-tooltip.component.scss']
})
export class ValidationTooltipComponent {
  @Input() validationErrors: string[] = [];

  @HostBinding('class') get class() {
    return 'invalid-tooltip';
  }
}
