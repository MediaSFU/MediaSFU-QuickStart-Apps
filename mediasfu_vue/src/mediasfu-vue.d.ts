declare module 'mediasfu-vue' {
  import type { Component } from 'vue'

  // Main components
  export const MediasfuGeneric: Component
  export const MediasfuBroadcast: Component
  export const MediasfuChat: Component
  export const MediasfuWebinar: Component
  export const MediasfuConference: Component
  export const PreJoinPage: Component

  // Display components
  export const VideoCard: Component
  export const AudioCard: Component
  export const MiniCard: Component
  export const Pagination: Component
  export const AlertComponent: Component

  // Modal components
  export const MenuModal: Component
  export const ParticipantsModal: Component
  export const ConfirmExitModal: Component
  export const ScreenboardModal: Component

  // Types
  export interface Participant {
    id?: string
    name: string
    islevel?: string
    muted?: boolean
    videoOn?: boolean
    [key: string]: any
  }

  export interface ShowAlert {
    (options: { message: string; type: 'success' | 'danger' | 'warning' | 'info' }): void
  }

  export interface MediasfuUICustomOverrides {
    videoCard?: {
      component: Component
      injections?: Record<string, any>
    }
    audioCard?: {
      component: Component
      injections?: Record<string, any>
    }
    miniCard?: {
      component: Component
      injections?: Record<string, any>
    }
    pagination?: {
      component: Component
      injections?: Record<string, any>
    }
    alert?: {
      component: Component
      injections?: Record<string, any>
    }
    menuModal?: {
      component: Component
      injections?: Record<string, any>
    }
    participantsModal?: {
      component: Component
      injections?: Record<string, any>
    }
    confirmExitModal?: {
      component: Component
      injections?: Record<string, any>
    }
    screenboardModal?: {
      component: Component
      injections?: Record<string, any>
    }
    [key: string]: any
  }

  export interface CreateMediaSFURoomOptions {
    action: 'create'
    capacity?: number
    duration?: number
    eventType?: 'broadcast' | 'chat' | 'webinar' | 'conference' | 'generic'
    userName: string
  }

  export interface JoinMediaSFURoomOptions {
    action: 'join'
    userName: string
    meetingID: string
  }

  export interface CreateRoomResponse {
    success: boolean
    roomName?: string
    secret?: string
    link?: string
    error?: string
  }

  export interface JoinRoomResponse {
    success: boolean
    roomName?: string
    secret?: string
    link?: string
    error?: string
  }

  // Room functions
  export function createRoomOnMediaSFU(
    options: CreateMediaSFURoomOptions & {
      apiUserName?: string
      apiKey?: string
      localLink?: string
    }
  ): Promise<CreateRoomResponse>

  export function joinRoomOnMediaSFU(
    options: JoinMediaSFURoomOptions & {
      apiUserName?: string
      apiKey?: string
      localLink?: string
    }
  ): Promise<JoinRoomResponse>
}
