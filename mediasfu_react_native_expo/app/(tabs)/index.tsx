import { useState } from 'react';
import {
  CreateMediaSFURoomOptions,
  JoinMediaSFURoomOptions,
  ModernMediasfuGeneric,
  PreJoinPage,
  PreJoinPageOptions,
} from 'mediasfu-reactnative-expo';
import { createRoomViaBackend, joinRoomViaBackend } from '../../roomBackend';

export default function HomeScreen() {
  const returnUI = true;
  const noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
    action: 'create',
    capacity: 10,
    duration: 15,
    eventType: 'broadcast',
    userName: 'Prince',
  };
  const [sourceParameters, setSourceParameters] = useState<Record<string, unknown>>({});

  return (
    <ModernMediasfuGeneric
      PrejoinPage={(options: PreJoinPageOptions) => <PreJoinPage {...options} />}
      connectMediaSFU
      returnUI={returnUI}
      noUIPreJoinOptions={!returnUI ? noUIPreJoinOptions : undefined}
      sourceParameters={!returnUI ? sourceParameters : undefined}
      updateSourceParameters={!returnUI ? setSourceParameters : undefined}
      createMediaSFURoom={createRoomViaBackend}
      joinMediaSFURoom={joinRoomViaBackend}
    />
  );
}
