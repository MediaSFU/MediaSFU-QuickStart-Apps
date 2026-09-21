type RoomOperationOptions = { payload: unknown };

async function postRoom(path: 'create' | 'join', payload: unknown) {
  const response = await fetch(`/api/mediasfu/rooms/${path}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Room request failed (${response.status})`);
  return result;
}

export const createRoomViaBackend = ({ payload }: RoomOperationOptions) => postRoom('create', payload);
export const joinRoomViaBackend = ({ payload }: RoomOperationOptions) => postRoom('join', payload);
