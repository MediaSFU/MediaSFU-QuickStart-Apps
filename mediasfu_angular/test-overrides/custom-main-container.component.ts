import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from 'mediasfu-angular';

/**
 * Custom Main Container Component - Test Override
 *
 * This component demonstrates UI override capabilities by wrapping
 * the default MainContainerComponent with custom styling.
 */
@Component({
  selector: 'app-custom-main-container-test',
  standalone: true,
  imports: [CommonModule, MainContainerComponent],
  template: `
    <div class="custom-wrapper" [ngStyle]="wrapperStyle">
      <div class="custom-header">
        <h3>🎨 Custom Main Container (UI Override Active)</h3>
        <p>This purple border indicates the UI override is working!</p>
      </div>

      <app-main-container-component
        [backgroundColor]="backgroundColor!"
        [containerWidthFraction]="containerWidthFraction!"
        [containerHeightFraction]="containerHeightFraction!"
        [marginLeft]="marginLeft!"
        [marginRight]="marginRight!"
        [marginTop]="marginTop!"
        [marginBottom]="marginBottom!"
        [padding]="padding!"
        [containerStyle]="containerStyle"
        [customTemplate]="customTemplate">
      </app-main-container-component>
    </div>
  `,
  styles: [`
    .custom-wrapper {
      border: 4px dashed #8b5cf6;
      border-radius: 16px;
      padding: 16px;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1));
      position: relative;
    }

    .custom-header {
      background: linear-gradient(135deg, #8b5cf6, #6366f1);
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .custom-header h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .custom-header p {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
    }
  `]
})
export class CustomMainContainerTestComponent {
  @Input() backgroundColor?: string;
  @Input() containerWidthFraction?: number;
  @Input() containerHeightFraction?: number;
  @Input() marginLeft?: number;
  @Input() marginRight?: number;
  @Input() marginTop?: number;
  @Input() marginBottom?: number;
  @Input() padding?: number;
  @Input() containerStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  wrapperStyle = {
    position: 'relative',
    height: '100%',
    width: '100%',
  };
}
