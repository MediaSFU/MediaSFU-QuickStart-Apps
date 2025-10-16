import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuConference,
  MediasfuWebinar,
  MediasfuChat,
  MediasfuUICustomOverrides
} from 'mediasfu-angular';
import { CustomMainContainerTestComponent } from '../../test-overrides/custom-main-container.component';

/**
 * AppUnique Component
 *
 * A toggle-driven demonstration component that showcases MediaSFU's UI override capabilities.
 * This component mirrors the React SDK's AppUnique example and provides:
 *
 * - Connection scenario toggles (cloud, hybrid, ce)
 * - Experience selector (Generic, Broadcast, Conference, Webinar, Chat)
 * - UI strategy flags (prebuilt UI, custom UI, no UI pre-join)
 * - Custom card examples (video, audio, mini)
 * - UI override demonstrations
 * - Container styling examples
 * - Debug panel showing helper bundle
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MediasfuGeneric,
    MediasfuBroadcast,
    MediasfuConference,
    MediasfuWebinar,
    MediasfuChat,
  ],
  template: `
    <div class="demo-container">
      <!-- Configuration Panel -->
      <div class="config-panel" [class.collapsed]="!showConfig">
        <button class="toggle-config" (click)="showConfig = !showConfig">
          {{ showConfig ? '▼' : '▶' }} Configuration
        </button>

        <div class="config-content" *ngIf="showConfig">
          <h3>Connection Scenario</h3>
          <div class="radio-group">
            <label>
              <input type="radio" [(ngModel)]="connectionScenario" value="cloud">
              MediaSFU Cloud
            </label>
            <label>
              <input type="radio" [(ngModel)]="connectionScenario" value="hybrid">
              Hybrid (CE + Cloud)
            </label>
            <label>
              <input type="radio" [(ngModel)]="connectionScenario" value="ce">
              Community Edition Only
            </label>
          </div>

          <h3>Experience Type</h3>
          <div class="radio-group">
            <label>
              <input type="radio" [(ngModel)]="selectedExperience" value="generic">
              Generic
            </label>
            <label>
              <input type="radio" [(ngModel)]="selectedExperience" value="broadcast">
              Broadcast
            </label>
            <label>
              <input type="radio" [(ngModel)]="selectedExperience" value="conference">
              Conference
            </label>
            <label>
              <input type="radio" [(ngModel)]="selectedExperience" value="webinar">
              Webinar
            </label>
            <label>
              <input type="radio" [(ngModel)]="selectedExperience" value="chat">
              Chat
            </label>
          </div>

          <h3>UI Options</h3>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" [(ngModel)]="showPrebuiltUI">
              Show Prebuilt UI
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableFullCustomUI">
              Enable Full Custom UI
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableNoUIPreJoin">
              Enable No-UI Pre-join
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableCustomCards">
              Enable Custom Cards
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableUICoreOverrides">
              Enable UI Core Overrides
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableModalOverrides">
              Enable Modal Overrides
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="enableContainerStyling">
              Enable Container Styling
            </label>
            <label>
              <input type="checkbox" [(ngModel)]="showDebugPanel">
              Show Debug Panel
            </label>
          </div>
        </div>
      </div>

      <!-- Debug Panel -->
      <div class="debug-panel" *ngIf="showDebugPanel && sourceParameters">
        <h4>Helper Bundle (sourceParameters)</h4>
        <pre>{{ formatParameters(sourceParameters) }}</pre>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Generic Experience -->
        <app-mediasfu-generic
          *ngIf="selectedExperience === 'generic'"
          [localLink]="currentPreset.localLink"
          [connectMediaSFU]="currentPreset.connectMediaSFU"
          [credentials]="currentPreset.credentials!"
          [returnUI]="!enableFullCustomUI && showPrebuiltUI"
          [customVideoCard]="enableCustomCards ? customVideoCard : undefined"
          [customAudioCard]="enableCustomCards ? customAudioCard : undefined"
          [customMiniCard]="enableCustomCards ? customMiniCard : undefined"
          [containerStyle]="enableContainerStyling ? containerStyle : undefined"
          [uiOverrides]="uiOverrides"
          [updateSourceParameters]="updateSourceParameters.bind(this)">
        </app-mediasfu-generic>

        <!-- Broadcast Experience -->
        <app-mediasfu-broadcast
          *ngIf="selectedExperience === 'broadcast'"
          [localLink]="currentPreset.localLink"
          [connectMediaSFU]="currentPreset.connectMediaSFU"
          [credentials]="currentPreset.credentials!"
          [returnUI]="!enableFullCustomUI && showPrebuiltUI"
          [customVideoCard]="enableCustomCards ? customVideoCard : undefined"
          [customAudioCard]="enableCustomCards ? customAudioCard : undefined"
          [customMiniCard]="enableCustomCards ? customMiniCard : undefined"
          [containerStyle]="enableContainerStyling ? containerStyle : undefined"
          [uiOverrides]="uiOverrides"
          [updateSourceParameters]="updateSourceParameters.bind(this)">
        </app-mediasfu-broadcast>

        <!-- Conference Experience -->
        <app-mediasfu-conference
          *ngIf="selectedExperience === 'conference'"
          [localLink]="currentPreset.localLink"
          [connectMediaSFU]="currentPreset.connectMediaSFU"
          [credentials]="currentPreset.credentials!"
          [returnUI]="!enableFullCustomUI && showPrebuiltUI"
          [customVideoCard]="enableCustomCards ? customVideoCard : undefined"
          [customAudioCard]="enableCustomCards ? customAudioCard : undefined"
          [customMiniCard]="enableCustomCards ? customMiniCard : undefined"
          [containerStyle]="enableContainerStyling ? containerStyle : undefined"
          [uiOverrides]="uiOverrides"
          [updateSourceParameters]="updateSourceParameters.bind(this)">
        </app-mediasfu-conference>

        <!-- Webinar Experience -->
        <app-mediasfu-webinar
          *ngIf="selectedExperience === 'webinar'"
          [localLink]="currentPreset.localLink"
          [connectMediaSFU]="currentPreset.connectMediaSFU"
          [credentials]="currentPreset.credentials!"
          [returnUI]="!enableFullCustomUI && showPrebuiltUI"
          [customVideoCard]="enableCustomCards ? customVideoCard : undefined"
          [customAudioCard]="enableCustomCards ? customAudioCard : undefined"
          [customMiniCard]="enableCustomCards ? customMiniCard : undefined"
          [containerStyle]="enableContainerStyling ? containerStyle : undefined"
          [uiOverrides]="uiOverrides"
          [updateSourceParameters]="updateSourceParameters.bind(this)">
        </app-mediasfu-webinar>

        <!-- Chat Experience -->
        <app-mediasfu-chat
          *ngIf="selectedExperience === 'chat'"
          [localLink]="currentPreset.localLink"
          [connectMediaSFU]="currentPreset.connectMediaSFU"
          [credentials]="currentPreset.credentials!"
          [returnUI]="!enableFullCustomUI && showPrebuiltUI"
          [customVideoCard]="enableCustomCards ? customVideoCard : undefined"
          [customAudioCard]="enableCustomCards ? customAudioCard : undefined"
          [customMiniCard]="enableCustomCards ? customMiniCard : undefined"
          [containerStyle]="enableContainerStyling ? containerStyle : undefined"
          [uiOverrides]="uiOverrides"
          [updateSourceParameters]="updateSourceParameters.bind(this)">
        </app-mediasfu-chat>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background: #0f172a;
    }

    .config-panel {
      width: 320px;
      background: #1e293b;
      color: #f1f5f9;
      overflow-y: auto;
      transition: width 0.3s ease;
    }

    .config-panel.collapsed {
      width: 48px;
    }

    .toggle-config {
      width: 100%;
      padding: 16px;
      background: #334155;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
    }

    .toggle-config:hover {
      background: #475569;
    }

    .config-content {
      padding: 16px;
    }

    h3 {
      margin: 24px 0 12px;
      font-size: 14px;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .radio-group, .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    label:hover {
      background: #334155;
    }

    input[type="radio"],
    input[type="checkbox"] {
      margin-right: 8px;
    }

    .debug-panel {
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 400px;
      max-height: 300px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 16px;
      overflow: auto;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .debug-panel h4 {
      margin: 0 0 12px;
      color: #f1f5f9;
      font-size: 14px;
    }

    .debug-panel pre {
      margin: 0;
      font-size: 11px;
      color: #94a3b8;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .main-content {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
  `],
})
export class AppComponent implements OnInit {
  // Connection scenario
  connectionScenario: 'cloud' | 'hybrid' | 'ce' = 'cloud';

  // Experience selector
  selectedExperience: 'generic' | 'broadcast' | 'conference' | 'webinar' | 'chat' = 'generic';

  // UI flags
  showPrebuiltUI = true;
  enableFullCustomUI = false;
  enableNoUIPreJoin = false;
  enableCustomCards = false;
  private _enableUICoreOverrides = false;
  private _enableModalOverrides = false;
  enableContainerStyling = false;
  showDebugPanel = false;
  showConfig = true;

  // Getters and setters to trigger override updates
  get enableUICoreOverrides(): boolean {
    return this._enableUICoreOverrides;
  }
  set enableUICoreOverrides(value: boolean) {
    this._enableUICoreOverrides = value;
    this.updateUIOverrides();
  }

  get enableModalOverrides(): boolean {
    return this._enableModalOverrides;
  }
  set enableModalOverrides(value: boolean) {
    this._enableModalOverrides = value;
    this.updateUIOverrides();
  }

  // Connection presets
  connectionPresets = {
    cloud: {
      credentials: { apiUserName: 'demo', apiKey: 'demo1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab' },
      localLink: '',
      connectMediaSFU: true,
    },
    hybrid: {
      credentials: { apiUserName: 'demo', apiKey: 'demo1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab' },
      localLink: 'http://localhost:3000',
      connectMediaSFU: true,
    },
    ce: {
      credentials: undefined,
      localLink: 'http://localhost:3000',
      connectMediaSFU: false,
    },
  };

  // Source parameters for debug panel
  sourceParameters: Record<string, unknown> = {};

  // Custom card components (would be imported in real implementation)
  customVideoCard: any = undefined;
  customAudioCard: any = undefined;
  customMiniCard: any = undefined;
  customComponent: any = undefined;

  // Container styling
  containerStyle: Record<string, any> = {
    background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
    borderRadius: '32px',
    padding: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  };

  // UI overrides
  uiOverrides: MediasfuUICustomOverrides | undefined;

  ngOnInit(): void {
    this.updateUIOverrides();
  }

  get currentPreset() {
    return this.connectionPresets[this.connectionScenario];
  }

  updateSourceParameters(params: Record<string, unknown>): void {
    this.sourceParameters = params;
  }

  formatParameters(params: Record<string, unknown>): string {
    try {
      // Only show keys, not full objects to avoid circular references
      const summary: Record<string, string> = {};
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (typeof value === 'function') {
          summary[key] = '[Function]';
        } else if (typeof value === 'object' && value !== null) {
          summary[key] = `[Object: ${Object.keys(value).length} keys]`;
        } else {
          summary[key] = String(value);
        }
      });
      return JSON.stringify(summary, null, 2);
    } catch {
      return '{ ... }';
    }
  }

  private updateUIOverrides(): void {
    if (!this.enableUICoreOverrides && !this.enableModalOverrides) {
      this.uiOverrides = undefined;
      return;
    }

    const overrides: MediasfuUICustomOverrides = {};

    if (this.enableUICoreOverrides) {
      // Use the actual custom main container test component
      overrides.mainContainer = { component: CustomMainContainerTestComponent };
      // You can add more core overrides here
      // overrides.pagination = { component: EnhancedPagination };
    }

    if (this.enableModalOverrides) {
      // Example modal overrides (would use actual components in real implementation)
      // overrides.menuModal = { component: FrostedMenuModal };
      // overrides.participantsModal = { component: NeonParticipantsModal };
    }

    this.uiOverrides = Object.keys(overrides).length > 0 ? overrides : undefined;
  }
}

export default AppComponent;
