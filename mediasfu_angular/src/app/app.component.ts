/**
 * AppUniqueComponent - MediaSFU SDK Custom UI Override Example
 *
 * This component demonstrates how to properly use custom UI overrides with the
 * MediaSFU Angular SDK. It shows all five MediaSFU experiences with custom components:
 * - Generic: Flexible event type
 * - Broadcast: Live streaming experience
 * - Conference: Multi-party meetings
 * - Webinar: Panel presentations
 * - Chat: Real-time messaging
 *
 * Custom Override Pattern:
 * 1. Create custom components that wrap or extend SDK components
 * 2. Build a uiOverrides object with your custom components
 * 3. Pass the uiOverrides to the MediaSFU component
 *
 * Card Override Pattern:
 * 1. Create custom card components (VideoCard, AudioCard, MiniCard)
 * 2. Pass them as inputs: customVideoCard, customAudioCard, customMiniCard
 *
 * Modify the constants below to test different scenarios.
 */

import { Component, OnInit, Input, Inject, Optional, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuConference,
  MediasfuWebinar,
  MediasfuChat,
  MediasfuUICustomOverrides,
  PreJoinPage,
  CreateRoomOnMediaSFU,
  JoinRoomOnMediaSFU,
  CreateMediaSFURoomOptions,
  JoinMediaSFURoomOptions,
  // Import components for custom overrides
  VideoCard,
  AudioCard,
  MiniCard,
  MainContainerComponent,
  AlertComponent,
  MenuModal,
  ConfirmExitModal,
} from 'mediasfu-angular';

// =============================================================================
// CUSTOM COMPONENTS - Enhanced UI components with custom styling
// =============================================================================

/**
 * CustomVideoCardTestComponent
 * Purple gradient with enhanced shadows
 *
 * IMPORTANT: Custom card components receive props via dependency injection.
 * All VideoCard inputs must be accepted and passed through.
 */
@Component({
  selector: 'app-custom-video-card-test',
  standalone: true,
  imports: [CommonModule, VideoCard],
  template: `
    <app-video-card
      [customStyle]="combinedStyle"
      [name]="name"
      [barColor]="barColor"
      [textColor]="textColor"
      [imageSource]="imageSource"
      [roundedImage]="roundedImage"
      [imageStyle]="imageStyle"
      [remoteProducerId]="remoteProducerId"
      [eventType]="eventType"
      [forceFullDisplay]="forceFullDisplay"
      [videoStream]="videoStream"
      [showControls]="showControls"
      [showInfo]="showInfo"
      [videoInfoComponent]="videoInfoComponent"
      [videoControlsComponent]="videoControlsComponent"
      [controlsPosition]="controlsPosition"
      [infoPosition]="infoPosition"
      [participant]="participant"
      [backgroundColor]="backgroundColor"
      [audioDecibels]="audioDecibels"
      [doMirror]="doMirror"
      [parameters]="parameters">
    </app-video-card>
  `,
})
class CustomVideoCardTestComponent {
  @Input() customStyle: any = {};
  @Input() name: string = '';
  @Input() barColor: string = 'red';
  @Input() textColor: string = 'white';
  @Input() imageSource: string = '';
  @Input() roundedImage: boolean = false;
  @Input() imageStyle: any = {};
  @Input() remoteProducerId: string = '';
  @Input() eventType: any;
  @Input() forceFullDisplay: boolean = false;
  @Input() videoStream: any = null;
  @Input() showControls: boolean = true;
  @Input() showInfo: boolean = true;
  @Input() videoInfoComponent: any;
  @Input() videoControlsComponent: any;
  @Input() controlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft';
  @Input() infoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @Input() participant: any;
  @Input() backgroundColor: string = '';
  @Input() audioDecibels: any[] = [];
  @Input() doMirror: boolean = false;
  @Input() parameters: any;

  constructor(
    @Optional() @Inject('customStyle') injectedCustomStyle?: any,
    @Optional() @Inject('name') injectedName?: string,
    @Optional() @Inject('barColor') injectedBarColor?: string,
    @Optional() @Inject('textColor') injectedTextColor?: string,
    @Optional() @Inject('imageSource') injectedImageSource?: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage?: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle?: any,
    @Optional() @Inject('remoteProducerId') injectedRemoteProducerId?: string,
    @Optional() @Inject('eventType') injectedEventType?: any,
    @Optional() @Inject('forceFullDisplay') injectedForceFullDisplay?: boolean,
    @Optional() @Inject('videoStream') injectedVideoStream?: any,
    @Optional() @Inject('showControls') injectedShowControls?: boolean,
    @Optional() @Inject('showInfo') injectedShowInfo?: boolean,
    @Optional() @Inject('videoInfoComponent') injectedVideoInfoComponent?: any,
    @Optional() @Inject('videoControlsComponent') injectedVideoControlsComponent?: any,
    @Optional() @Inject('controlsPosition') injectedControlsPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional() @Inject('infoPosition') injectedInfoPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional() @Inject('participant') injectedParticipant?: any,
    @Optional() @Inject('backgroundColor') injectedBackgroundColor?: string,
    @Optional() @Inject('audioDecibels') injectedAudioDecibels?: any[],
    @Optional() @Inject('doMirror') injectedDoMirror?: boolean,
    @Optional() @Inject('parameters') injectedParameters?: any,
  ) {
    if (injectedCustomStyle !== undefined && injectedCustomStyle !== null) this.customStyle = injectedCustomStyle;
    if (injectedName !== undefined && injectedName !== null) this.name = injectedName;
    if (injectedBarColor !== undefined && injectedBarColor !== null) this.barColor = injectedBarColor;
    if (injectedTextColor !== undefined && injectedTextColor !== null) this.textColor = injectedTextColor;
    if (injectedImageSource !== undefined && injectedImageSource !== null) this.imageSource = injectedImageSource;
    // Booleans: accept null as a valid value
    if (injectedRoundedImage !== undefined) this.roundedImage = injectedRoundedImage;
    if (injectedImageStyle !== undefined && injectedImageStyle !== null) this.imageStyle = injectedImageStyle;
    if (injectedRemoteProducerId !== undefined && injectedRemoteProducerId !== null) this.remoteProducerId = injectedRemoteProducerId;
    if (injectedEventType !== undefined && injectedEventType !== null) this.eventType = injectedEventType;
    if (injectedForceFullDisplay !== undefined) this.forceFullDisplay = injectedForceFullDisplay;
    if (injectedVideoStream !== undefined && injectedVideoStream !== null) this.videoStream = injectedVideoStream;
    if (injectedShowControls !== undefined) this.showControls = injectedShowControls;
    if (injectedShowInfo !== undefined) this.showInfo = injectedShowInfo;
    if (injectedVideoInfoComponent !== undefined && injectedVideoInfoComponent !== null) this.videoInfoComponent = injectedVideoInfoComponent;
    if (injectedVideoControlsComponent !== undefined && injectedVideoControlsComponent !== null) this.videoControlsComponent = injectedVideoControlsComponent;
    if (injectedControlsPosition !== undefined && injectedControlsPosition !== null) this.controlsPosition = injectedControlsPosition;
    if (injectedInfoPosition !== undefined && injectedInfoPosition !== null) this.infoPosition = injectedInfoPosition;
    if (injectedParticipant !== undefined && injectedParticipant !== null) this.participant = injectedParticipant;
    if (injectedBackgroundColor !== undefined && injectedBackgroundColor !== null) this.backgroundColor = injectedBackgroundColor;
    if (injectedAudioDecibels !== undefined && injectedAudioDecibels !== null) this.audioDecibels = injectedAudioDecibels;
    if (injectedDoMirror !== undefined) this.doMirror = injectedDoMirror;
    if (injectedParameters !== undefined && injectedParameters !== null) this.parameters = injectedParameters;
  }

  get enhancedStyle() {
    return {
      borderRadius: '20px',
      border: '3px solid #8b5cf6',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    };
  }

  get combinedStyle() {
    return { ...this.customStyle, ...this.enhancedStyle };
  }
}

/**
 * CustomAudioCardTestComponent
 * Green gradient styling
 *
 * IMPORTANT: Custom card components receive props via dependency injection.
 * All AudioCard inputs must be accepted and passed through.
 */
@Component({
  selector: 'app-custom-audio-card-test',
  standalone: true,
  imports: [CommonModule, AudioCard],
  template: `
    <app-audio-card
      [controlUserMedia]="controlUserMedia"
      [customStyle]="combinedStyle"
      [name]="name"
      [barColor]="customBarColor"
      [textColor]="textColor"
      [imageSource]="imageSource"
      [roundedImage]="roundedImage"
      [imageStyle]="imageStyle"
      [showControls]="showControls"
      [showInfo]="showInfo"
      [videoInfoComponent]="videoInfoComponent"
      [videoControlsComponent]="videoControlsComponent"
      [controlsPosition]="controlsPosition"
      [infoPosition]="infoPosition"
      [participant]="participant"
      [backgroundColor]="backgroundColor"
      [audioDecibels]="audioDecibels"
      [parameters]="parameters">
    </app-audio-card>
  `,
})
class CustomAudioCardTestComponent {
  @Input() controlUserMedia: any;
  @Input() customStyle: any = {};
  @Input() name: string = '';
  @Input() barColor: string = 'red';
  @Input() textColor: string = 'white';
  @Input() imageSource: string = '';
  @Input() roundedImage: boolean = false;
  @Input() imageStyle: any = {};
  @Input() showControls: boolean = true;
  @Input() showInfo: boolean = true;
  @Input() videoInfoComponent: any;
  @Input() videoControlsComponent: any;
  @Input() controlsPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topLeft';
  @Input() infoPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' = 'topRight';
  @Input() participant: any;
  @Input() backgroundColor: string = '';
  @Input() audioDecibels: any;
  @Input() parameters: any;

  constructor(
    @Optional() @Inject('controlUserMedia') injectedControlUserMedia?: any,
    @Optional() @Inject('customStyle') injectedCustomStyle?: any,
    @Optional() @Inject('name') injectedName?: string,
    @Optional() @Inject('barColor') injectedBarColor?: string,
    @Optional() @Inject('textColor') injectedTextColor?: string,
    @Optional() @Inject('imageSource') injectedImageSource?: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage?: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle?: any,
    @Optional() @Inject('showControls') injectedShowControls?: boolean,
    @Optional() @Inject('showInfo') injectedShowInfo?: boolean,
    @Optional() @Inject('videoInfoComponent') injectedVideoInfoComponent?: any,
    @Optional() @Inject('videoControlsComponent') injectedVideoControlsComponent?: any,
    @Optional() @Inject('controlsPosition') injectedControlsPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional() @Inject('infoPosition') injectedInfoPosition?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
    @Optional() @Inject('participant') injectedParticipant?: any,
    @Optional() @Inject('backgroundColor') injectedBackgroundColor?: string,
    @Optional() @Inject('audioDecibels') injectedAudioDecibels?: any,
    @Optional() @Inject('parameters') injectedParameters?: any,
  ) {
    if (injectedControlUserMedia !== undefined && injectedControlUserMedia !== null) this.controlUserMedia = injectedControlUserMedia;
    if (injectedCustomStyle !== undefined && injectedCustomStyle !== null) this.customStyle = injectedCustomStyle;
    if (injectedName !== undefined && injectedName !== null) this.name = injectedName;
    if (injectedBarColor !== undefined && injectedBarColor !== null) this.barColor = injectedBarColor;
    if (injectedTextColor !== undefined && injectedTextColor !== null) this.textColor = injectedTextColor;
    if (injectedImageSource !== undefined && injectedImageSource !== null) this.imageSource = injectedImageSource;
    // Booleans: accept null as a valid value
    if (injectedRoundedImage !== undefined) this.roundedImage = injectedRoundedImage;
    if (injectedImageStyle !== undefined && injectedImageStyle !== null) this.imageStyle = injectedImageStyle;
    if (injectedShowControls !== undefined) this.showControls = injectedShowControls;
    if (injectedShowInfo !== undefined) this.showInfo = injectedShowInfo;
    if (injectedVideoInfoComponent !== undefined && injectedVideoInfoComponent !== null) this.videoInfoComponent = injectedVideoInfoComponent;
    if (injectedVideoControlsComponent !== undefined && injectedVideoControlsComponent !== null) this.videoControlsComponent = injectedVideoControlsComponent;
    if (injectedControlsPosition !== undefined && injectedControlsPosition !== null) this.controlsPosition = injectedControlsPosition;
    if (injectedInfoPosition !== undefined && injectedInfoPosition !== null) this.infoPosition = injectedInfoPosition;
    if (injectedParticipant !== undefined && injectedParticipant !== null) this.participant = injectedParticipant;
    if (injectedBackgroundColor !== undefined && injectedBackgroundColor !== null) this.backgroundColor = injectedBackgroundColor;
    if (injectedAudioDecibels !== undefined && injectedAudioDecibels !== null) this.audioDecibels = injectedAudioDecibels;
    if (injectedParameters !== undefined && injectedParameters !== null) this.parameters = injectedParameters;
  }

  get customBarColor() {
    return '#22c55e'; // Override with custom green color
  }

  get enhancedStyle() {
    return {
      borderRadius: '16px',
      border: '2px solid #22c55e',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(21, 128, 61, 0.4))',
      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
    };
  }

  get combinedStyle() {
    return { ...this.customStyle, ...this.enhancedStyle };
  }
}

/**
 * CustomMiniCardTestComponent
 * Amber dashed border styling
 *
 * IMPORTANT: Custom card components receive props via dependency injection.
 * All MiniCard inputs must be accepted and passed through.
 */
@Component({
  selector: 'app-custom-mini-card-test',
  standalone: true,
  imports: [CommonModule, MiniCard],
  template: `
    <app-mini-card
      [initials]="initials"
      [fontSize]="fontSize"
      [customStyle]="combinedStyle"
      [imageSource]="imageSource"
      [roundedImage]="roundedImage"
      [imageStyle]="imageStyle">
    </app-mini-card>
  `,
})
class CustomMiniCardTestComponent {
  @Input() initials: string = '';
  @Input() fontSize: number = 14;
  @Input() customStyle: any = {};
  @Input() imageSource: string = '';
  @Input() roundedImage: boolean = false;
  @Input() imageStyle: any = {};

  constructor(
    @Optional() @Inject('initials') injectedInitials?: string,
    @Optional() @Inject('fontSize') injectedFontSize?: number,
    @Optional() @Inject('customStyle') injectedCustomStyle?: any,
    @Optional() @Inject('imageSource') injectedImageSource?: string,
    @Optional() @Inject('roundedImage') injectedRoundedImage?: boolean,
    @Optional() @Inject('imageStyle') injectedImageStyle?: any,
  ) {
    if (injectedInitials !== undefined && injectedInitials !== null) this.initials = injectedInitials;
    if (injectedFontSize !== undefined && injectedFontSize !== null) this.fontSize = injectedFontSize;
    if (injectedCustomStyle !== undefined && injectedCustomStyle !== null) this.customStyle = injectedCustomStyle;
    if (injectedImageSource !== undefined && injectedImageSource !== null) this.imageSource = injectedImageSource;
    // Booleans: accept null as a valid value
    if (injectedRoundedImage !== undefined) this.roundedImage = injectedRoundedImage;
    if (injectedImageStyle !== undefined && injectedImageStyle !== null) this.imageStyle = injectedImageStyle;
  }

  get enhancedStyle() {
    return {
      borderRadius: '12px',
      border: '2px dashed #f59e0b',
      background: '#fffbeb',
      color: '#92400e',
      fontWeight: '700',
      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)',
    };
  }

  get combinedStyle() {
    return { ...this.customStyle, ...this.enhancedStyle };
  }
}

/**
 * CustomAlertTestComponent
 * Orange bordered alert
 *
 * IMPORTANT: UI override components receive all necessary props via dependency injection.
 */
@Component({
  selector: 'app-custom-alert-test',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  template: `
    <div [ngStyle]="wrapperStyle">
      <app-alert-component
        [visible]="visible"
        [message]="message"
        [type]="type"
        [duration]="duration"
        [textColor]="textColor"
        [onHide]="onHide"
        [alertStyle]="alertStyle"
        [customTemplate]="customTemplate">
      </app-alert-component>
    </div>
  `,
})
class CustomAlertTestComponent {
  @Input() visible: boolean = false;
  @Input() message: string = '';
  @Input() type: 'success' | 'danger' = 'success';
  @Input() duration: number = 3000;
  @Input() textColor: string = 'black';
  @Input() onHide!: () => void;
  @Input() alertStyle?: any;
  @Input() customTemplate?: any;

  constructor(
    @Optional() @Inject('visible') injectedVisible?: boolean,
    @Optional() @Inject('message') injectedMessage?: string,
    @Optional() @Inject('type') injectedType?: 'success' | 'danger',
    @Optional() @Inject('duration') injectedDuration?: number,
    @Optional() @Inject('textColor') injectedTextColor?: string,
    @Optional() @Inject('onHide') injectedOnHide?: () => void,
    @Optional() @Inject('alertStyle') injectedAlertStyle?: any,
    @Optional() @Inject('customTemplate') injectedCustomTemplate?: any,
  ) {
    // Booleans: accept null as a valid value
    if (injectedVisible !== undefined) this.visible = injectedVisible;
    if (injectedMessage !== undefined && injectedMessage !== null) this.message = injectedMessage;
    if (injectedType !== undefined && injectedType !== null) this.type = injectedType;
    if (injectedDuration !== undefined && injectedDuration !== null) this.duration = injectedDuration;
    if (injectedTextColor !== undefined && injectedTextColor !== null) this.textColor = injectedTextColor;
    if (injectedOnHide !== undefined && injectedOnHide !== null) this.onHide = injectedOnHide;
    if (injectedAlertStyle !== undefined && injectedAlertStyle !== null) this.alertStyle = injectedAlertStyle;
    if (injectedCustomTemplate !== undefined && injectedCustomTemplate !== null) this.customTemplate = injectedCustomTemplate;
  }

  get wrapperStyle() {
    return {
      border: '2px solid #f97316',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(249, 115, 22, 0.2)',
    };
  }
}

/**
 * CustomMenuModalTestComponent - Custom wrapper with style overrides
 *
 * IMPORTANT: The SDK automatically handles prop updates via dependency injection.
 * When modal visibility changes, the SDK re-injects props with the new isVisible value.
 * No manual subscription to BehaviorSubjects is needed!
 */
@Component({
  selector: 'app-custom-menu-modal-test',
  standalone: true,
  imports: [CommonModule, MenuModal],
  template: `
    <app-menu-modal
      [backgroundColor]="backgroundColor"
      [isVisible]="isVisible"
      [customButtons]="customButtons"
      [shareButtons]="shareButtons"
      [position]="position"
      [roomName]="roomName"
      [adminPasscode]="adminPasscode"
      [islevel]="islevel"
      [eventType]="eventType"
      [localLink]="localLink"
      [title]="title"
      [overlayStyle]="customOverlayStyle"
      [contentStyle]="contentStyle"
      [customTemplate]="customTemplate"
      [onClose]="onClose">
    </app-menu-modal>
  `,
})
class CustomMenuModalTestComponent implements OnChanges {
  @Input() backgroundColor: string = '#83c0e9';
  @Input() isVisible: boolean = false;
  @Input() customButtons: any[] = [];
  @Input() shareButtons: boolean = true;
  @Input() position: string = 'bottomRight';
  @Input() roomName: string = '';
  @Input() adminPasscode: string = '';
  @Input() islevel: string = '0';
  @Input() eventType: any = 'conference';
  @Input() localLink: string = '';
  @Input() title?: string;
  @Input() overlayStyle?: any;
  @Input() contentStyle?: any;
  @Input() customTemplate?: any;
  @Input() onClose!: () => void;
  @Input() parameters?: any; // Contains all source parameters including BehaviorSubjects

  constructor(
    @Optional() @Inject('backgroundColor') injectedBackgroundColor?: string,
    @Optional() @Inject('isVisible') injectedIsVisible?: boolean,
    @Optional() @Inject('customButtons') injectedCustomButtons?: any[],
    @Optional() @Inject('shareButtons') injectedShareButtons?: boolean,
    @Optional() @Inject('position') injectedPosition?: string,
    @Optional() @Inject('roomName') injectedRoomName?: string,
    @Optional() @Inject('adminPasscode') injectedAdminPasscode?: string,
    @Optional() @Inject('islevel') injectedIslevel?: string,
    @Optional() @Inject('eventType') injectedEventType?: any,
    @Optional() @Inject('localLink') injectedLocalLink?: string,
    @Optional() @Inject('title') injectedTitle?: string,
    @Optional() @Inject('overlayStyle') injectedOverlayStyle?: any,
    @Optional() @Inject('contentStyle') injectedContentStyle?: any,
    @Optional() @Inject('customTemplate') injectedCustomTemplate?: any,
    @Optional() @Inject('onClose') injectedOnClose?: () => void,
    @Optional() @Inject('parameters') injectedParameters?: any,
  ) {
    // Accept all injected values from SDK's UI override system
    if (injectedBackgroundColor !== undefined && injectedBackgroundColor !== null) this.backgroundColor = injectedBackgroundColor;
    if (injectedIsVisible !== undefined) this.isVisible = injectedIsVisible;
    if (injectedCustomButtons !== undefined && injectedCustomButtons !== null) this.customButtons = injectedCustomButtons;
    if (injectedShareButtons !== undefined) this.shareButtons = injectedShareButtons;
    if (injectedPosition !== undefined && injectedPosition !== null) this.position = injectedPosition;
    if (injectedRoomName !== undefined && injectedRoomName !== null) this.roomName = injectedRoomName;
    if (injectedAdminPasscode !== undefined && injectedAdminPasscode !== null) this.adminPasscode = injectedAdminPasscode;
    if (injectedIslevel !== undefined && injectedIslevel !== null) this.islevel = injectedIslevel;
    if (injectedEventType !== undefined && injectedEventType !== null) this.eventType = injectedEventType;
    if (injectedLocalLink !== undefined && injectedLocalLink !== null) this.localLink = injectedLocalLink;
    if (injectedTitle !== undefined && injectedTitle !== null) this.title = injectedTitle;
    if (injectedOverlayStyle !== undefined && injectedOverlayStyle !== null) this.overlayStyle = injectedOverlayStyle;
    if (injectedContentStyle !== undefined && injectedContentStyle !== null) this.contentStyle = injectedContentStyle;
    if (injectedCustomTemplate !== undefined && injectedCustomTemplate !== null) this.customTemplate = injectedCustomTemplate;
    if (injectedOnClose !== undefined && injectedOnClose !== null) this.onClose = injectedOnClose;
    if (injectedParameters !== undefined && injectedParameters !== null) this.parameters = injectedParameters;

  }

  ngOnChanges(changes: SimpleChanges): void {
    // This is called when WithOverrideDirective updates props via Object.assign
    // This handles reactive updates when SDK state changes (e.g., isMenuModalVisible changes)
    if (changes['isVisible']) {
      console.log('[CustomMenuModal] ngOnChanges - isVisible changed from',
        changes['isVisible'].previousValue,
        'to',
        changes['isVisible'].currentValue);
    }

    // Note: Angular will automatically update the child component's inputs
    // when our @Input properties change, so we don't need to manually propagate
  }

  get customOverlayStyle() {
    return {
      ...(this.overlayStyle || {}),
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95))',
      backdropFilter: 'blur(10px)',
      border: '2px solid #5CF6F6FF',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
    };
  }
}

/**
 * SIMPLER ALTERNATIVE: Just customize styles without creating a full component
 *
 * Instead of CustomMenuModalTestComponent above, you could use the `render` function
 * to just return the default component with custom style props:
 *
 * overrides.menuModal = {
 *   render: (props) => {
 *     // Modify props to add custom styling
 *     props.overlayStyle = {
 *       ...props.overlayStyle,
 *       background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(254, 202, 87, 0.95))',
 *     };
 *     props.backgroundColor = '#ff6b9d';
 *     // Return undefined to use default MenuModal with modified props
 *     return undefined;
 *   }
 * };
 */

/**
 * CustomConfirmExitModalTestComponent
 * Pink themed exit confirmation
 *
 * IMPORTANT: UI override components receive all necessary props via dependency injection.
 */
@Component({
  selector: 'app-custom-confirm-exit-modal-test',
  standalone: true,
  imports: [CommonModule, ConfirmExitModal],
  template: `
    <app-confirm-exit-modal
      [isConfirmExitModalVisible]="isConfirmExitModalVisible"
      [onConfirmExitClose]="onConfirmExitClose || noop"
      [position]="position"
      [backgroundColor]="customBackgroundColor"
      [exitEventOnConfirm]="exitEventOnConfirm"
      [member]="member"
      [ban]="ban"
      [roomName]="roomName"
      [socket]="socket"
      [islevel]="islevel"
      [overlayStyle]="customOverlayStyle"
      [contentStyle]="contentStyle"
      [customTemplate]="customTemplate">
    </app-confirm-exit-modal>
  `,
})
class CustomConfirmExitModalTestComponent {
  @Input() isConfirmExitModalVisible: boolean = false;
  @Input() onConfirmExitClose!: () => void;
  @Input() position: string = 'topRight';
  @Input() backgroundColor: string = '#83c0e9';
  @Input() exitEventOnConfirm!: (options: any) => void;
  @Input() member: string = '';
  @Input() ban: boolean = false;
  @Input() roomName: string = '';
  @Input() socket: any;
  @Input() islevel: string = '0';
  @Input() overlayStyle?: any;
  @Input() contentStyle?: any;
  @Input() customTemplate?: any;

  noop = () => {};

  constructor(
    @Optional() @Inject('isConfirmExitModalVisible') injectedIsConfirmExitModalVisible?: boolean,
    @Optional() @Inject('onConfirmExitClose') injectedOnConfirmExitClose?: () => void,
    @Optional() @Inject('position') injectedPosition?: string,
    @Optional() @Inject('backgroundColor') injectedBackgroundColor?: string,
    @Optional() @Inject('exitEventOnConfirm') injectedExitEventOnConfirm?: (options: any) => void,
    @Optional() @Inject('member') injectedMember?: string,
    @Optional() @Inject('ban') injectedBan?: boolean,
    @Optional() @Inject('roomName') injectedRoomName?: string,
    @Optional() @Inject('socket') injectedSocket?: any,
    @Optional() @Inject('islevel') injectedIslevel?: string,
    @Optional() @Inject('overlayStyle') injectedOverlayStyle?: any,
    @Optional() @Inject('contentStyle') injectedContentStyle?: any,
    @Optional() @Inject('customTemplate') injectedCustomTemplate?: any,
  ) {
    // For booleans, accept undefined only (not null, which means "not provided by SDK")
    if (injectedIsConfirmExitModalVisible !== undefined) this.isConfirmExitModalVisible = injectedIsConfirmExitModalVisible;
    if (injectedOnConfirmExitClose !== undefined && injectedOnConfirmExitClose !== null) this.onConfirmExitClose = injectedOnConfirmExitClose;
    if (injectedPosition !== undefined && injectedPosition !== null) this.position = injectedPosition;
    if (injectedBackgroundColor !== undefined && injectedBackgroundColor !== null) this.backgroundColor = injectedBackgroundColor;
    if (injectedExitEventOnConfirm !== undefined && injectedExitEventOnConfirm !== null) this.exitEventOnConfirm = injectedExitEventOnConfirm;
    if (injectedMember !== undefined && injectedMember !== null) this.member = injectedMember;
    if (injectedBan !== undefined) this.ban = injectedBan;
    if (injectedRoomName !== undefined && injectedRoomName !== null) this.roomName = injectedRoomName;
    if (injectedSocket !== undefined && injectedSocket !== null) this.socket = injectedSocket;
    if (injectedIslevel !== undefined && injectedIslevel !== null) this.islevel = injectedIslevel;
    if (injectedOverlayStyle !== undefined && injectedOverlayStyle !== null) this.overlayStyle = injectedOverlayStyle;
    if (injectedContentStyle !== undefined && injectedContentStyle !== null) this.contentStyle = injectedContentStyle;
    if (injectedCustomTemplate !== undefined && injectedCustomTemplate !== null) this.customTemplate = injectedCustomTemplate;
  }

  get customBackgroundColor() {
    return '#fce7f3'; // Pink background
  }

  get customOverlayStyle() {
    return {
      ...(this.overlayStyle || {}),
      background: '#fce7f3',
      border: '3px solid #ec4899',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)',
    };
  }
}

// =============================================================================
// CONFIGURATION CONSTANTS - Modify these to test different scenarios
// =============================================================================

type ConnectionScenario = 'cloud' | 'hybrid' | 'ce';
type ExperienceKey = 'generic' | 'broadcast' | 'webinar' | 'conference' | 'chat';

// Select deployment target
const connectionScenario: ConnectionScenario = 'cloud';

// Select which experience to render
const selectedExperience: ExperienceKey = 'generic';

// UI Strategy
const showPrebuiltUI = true;            // Show the default MediaSFU UI
const enableFullCustomUI = false;       // Use entirely custom UI (bypasses MediaSFU UI)
const enableNoUIPreJoin = false;        // Skip pre-join page, auto-join directly

// Customization Layers
const enableCardBuilders = true;        // Enable custom video/audio/mini card components
const enableUICoreOverrides = true;     // Enable core UI component overrides
const enableModalOverrides = true;      // Enable modal component overrides
const enableContainerStyling = true;    // Apply custom container styling
const enableBackendProxyHooks = true;   // Use backend proxy for create/join

type ModalOverrideMode = 'component' | 'render';
const modalOverrideMode: ModalOverrideMode = 'component'; // Switch to 'render' to demo style-only overrides

// Connection Presets
const connectionPresets: Record<ConnectionScenario, {
  credentials?: { apiUserName: string; apiKey: string };
  localLink: string;
  connectMediaSFU: boolean;
}> = {
  cloud: {
    credentials: {
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    localLink: '',
    connectMediaSFU: true,
  },
  hybrid: {
    credentials: {
      apiUserName: 'dummyUsr',
      apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    localLink: 'http://localhost:3000',
    connectMediaSFU: true,
  },
  ce: {
    credentials: undefined,
    localLink: 'http://localhost:3000',
    connectMediaSFU: false,
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MediasfuGeneric,
    MediasfuBroadcast,
    MediasfuConference,
    MediasfuWebinar,
    MediasfuChat,
  ],
  template: `
    <div class="app-container">
      <!-- Generic Experience -->
      <app-mediasfu-generic
        *ngIf="selectedExperience === 'generic'"
        [PrejoinPage]="preJoinRenderer"
        [localLink]="preset.localLink"
        [connectMediaSFU]="preset.connectMediaSFU"
        [credentials]="preset.credentials!"
        [returnUI]="returnUI"
        [noUIPreJoinOptions]="noUIPreJoinOptions"
        [customVideoCard]="cardOverrides.customVideoCard"
        [customAudioCard]="cardOverrides.customAudioCard"
        [customMiniCard]="cardOverrides.customMiniCard"
        [containerStyle]="containerStyle"
        [uiOverrides]="uiOverrides"
        [createMediaSFURoom]="enableBackendProxyHooks ? createRoomOnMediaSFU.createRoomOnMediaSFU : undefined"
        [joinMediaSFURoom]="enableBackendProxyHooks ? joinRoomOnMediaSFU.joinRoomOnMediaSFU : undefined">
      </app-mediasfu-generic>

      <!-- Broadcast Experience -->
      <app-mediasfu-broadcast
        *ngIf="selectedExperience === 'broadcast'"
        [PrejoinPage]="preJoinRenderer"
        [localLink]="preset.localLink"
        [connectMediaSFU]="preset.connectMediaSFU"
        [credentials]="preset.credentials!"
        [returnUI]="returnUI"
        [noUIPreJoinOptions]="noUIPreJoinOptions"
        [customVideoCard]="cardOverrides.customVideoCard"
        [customAudioCard]="cardOverrides.customAudioCard"
        [customMiniCard]="cardOverrides.customMiniCard"
        [containerStyle]="containerStyle"
        [uiOverrides]="uiOverrides"
        [createMediaSFURoom]="enableBackendProxyHooks ? createRoomOnMediaSFU.createRoomOnMediaSFU : undefined"
        [joinMediaSFURoom]="enableBackendProxyHooks ? joinRoomOnMediaSFU.joinRoomOnMediaSFU : undefined">
      </app-mediasfu-broadcast>

      <!-- Conference Experience -->
      <app-mediasfu-conference
        *ngIf="selectedExperience === 'conference'"
        [PrejoinPage]="preJoinRenderer"
        [localLink]="preset.localLink"
        [connectMediaSFU]="preset.connectMediaSFU"
        [credentials]="preset.credentials!"
        [returnUI]="returnUI"
        [noUIPreJoinOptions]="noUIPreJoinOptions"
        [customVideoCard]="cardOverrides.customVideoCard"
        [customAudioCard]="cardOverrides.customAudioCard"
        [customMiniCard]="cardOverrides.customMiniCard"
        [containerStyle]="containerStyle"
        [uiOverrides]="uiOverrides"
        [createMediaSFURoom]="enableBackendProxyHooks ? createRoomOnMediaSFU.createRoomOnMediaSFU : undefined"
        [joinMediaSFURoom]="enableBackendProxyHooks ? joinRoomOnMediaSFU.joinRoomOnMediaSFU : undefined">
      </app-mediasfu-conference>

      <!-- Webinar Experience -->
      <app-mediasfu-webinar
        *ngIf="selectedExperience === 'webinar'"
        [PrejoinPage]="preJoinRenderer"
        [localLink]="preset.localLink"
        [connectMediaSFU]="preset.connectMediaSFU"
        [credentials]="preset.credentials!"
        [returnUI]="returnUI"
        [noUIPreJoinOptions]="noUIPreJoinOptions"
        [customVideoCard]="cardOverrides.customVideoCard"
        [customAudioCard]="cardOverrides.customAudioCard"
        [customMiniCard]="cardOverrides.customMiniCard"
        [containerStyle]="containerStyle"
        [uiOverrides]="uiOverrides"
        [createMediaSFURoom]="enableBackendProxyHooks ? createRoomOnMediaSFU.createRoomOnMediaSFU : undefined"
        [joinMediaSFURoom]="enableBackendProxyHooks ? joinRoomOnMediaSFU.joinRoomOnMediaSFU : undefined">
      </app-mediasfu-webinar>

      <!-- Chat Experience -->
      <app-mediasfu-chat
        *ngIf="selectedExperience === 'chat'"
        [PrejoinPage]="preJoinRenderer"
        [localLink]="preset.localLink"
        [connectMediaSFU]="preset.connectMediaSFU"
        [credentials]="preset.credentials!"
        [returnUI]="returnUI"
        [noUIPreJoinOptions]="noUIPreJoinOptions"
        [customVideoCard]="cardOverrides.customVideoCard"
        [customAudioCard]="cardOverrides.customAudioCard"
        [customMiniCard]="cardOverrides.customMiniCard"
        [containerStyle]="containerStyle"
        [uiOverrides]="uiOverrides"
        [createMediaSFURoom]="enableBackendProxyHooks ? createRoomOnMediaSFU.createRoomOnMediaSFU : undefined"
        [joinMediaSFURoom]="enableBackendProxyHooks ? joinRoomOnMediaSFU.joinRoomOnMediaSFU : undefined">
      </app-mediasfu-chat>
    </div>
  `,
  styles: [`
    .app-container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class AppUniqueComponent implements OnInit {
  // Configuration from constants
  selectedExperience: ExperienceKey = selectedExperience;
  preset = connectionPresets[connectionScenario];
  returnUI = !enableFullCustomUI && showPrebuiltUI;
  enableBackendProxyHooks = enableBackendProxyHooks;

  // No UI Pre-join options (auto-join without prejoin page)
  noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions | undefined = enableNoUIPreJoin
    ? {
        action: 'create',
        capacity: 10,
        duration: 15,
        eventType: 'broadcast',
        userName: 'Prince',
      }
    : undefined;

  // Pre-join page renderer
  preJoinRenderer = showPrebuiltUI ? PreJoinPage : undefined;

  // Card overrides
  cardOverrides = this.buildCardOverrides();

  // UI overrides
  uiOverrides = this.buildUIOverrides();

  // Container styling
  containerStyle = enableContainerStyling
    ? {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      }
    : undefined;

  constructor(
    public createRoomOnMediaSFU: CreateRoomOnMediaSFU,
    public joinRoomOnMediaSFU: JoinRoomOnMediaSFU
  ) {}

  ngOnInit(): void {
    // Component initialization logic can go here
  }

  private buildCardOverrides() {
    if (!enableCardBuilders) {
      return {
        customVideoCard: undefined,
        customAudioCard: undefined,
        customMiniCard: undefined,
      };
    }

    return {
      customVideoCard: CustomVideoCardTestComponent,
      customAudioCard: CustomAudioCardTestComponent,
      customMiniCard: CustomMiniCardTestComponent,
    };
  }

  private buildUIOverrides(): MediasfuUICustomOverrides | undefined {
    const hasAnyOverride = enableUICoreOverrides || enableModalOverrides;

    if (!hasAnyOverride) {
      return undefined;
    }

    const overrides: MediasfuUICustomOverrides = {};

    // Core UI overrides
    if (enableUICoreOverrides) {
      overrides.alert = { component: CustomAlertTestComponent };
    }

    // Modal overrides - Three approaches available:
    if (enableModalOverrides) {
      if (modalOverrideMode === 'component') {
        // Full component overrides - maximum control, great for complex logic
        overrides.menuModal = { component: CustomMenuModalTestComponent };
        overrides.confirmExitModal = { component: CustomConfirmExitModalTestComponent };
      } else if (modalOverrideMode === 'render') {
        // Style-only overrides - mutate props and return the default component class
        overrides.menuModal = {
          render: (props) => {
            props.overlayStyle = {
              ...(props.overlayStyle || {}),
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.95), rgba(254, 202, 87, 0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)',
            };
            props.backgroundColor = '#ff6b9d';
            return MenuModal;
          },
        };

        overrides.confirmExitModal = {
          render: (props) => {
            props.overlayStyle = {
              ...(props.overlayStyle || {}),
              background: '#fce7f3',
              border: '3px solid #ec4899',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)',
            };
            props.backgroundColor = '#fce7f3';
            return ConfirmExitModal;
          },
        };
      }

      // Set modalOverrideMode to 'render' or 'component' at the top of this file to choose the strategy.
    }

    return Object.keys(overrides).length > 0 ? overrides : undefined;
  }
}
