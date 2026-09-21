type RoomOperationOptions = { payload: unknown };

const BACKEND_BASE_URL = 'https://your-app.example/api/mediasfu';

async function postRoom(path: 'create' | 'join', payload: unknown) {
  const base = new URL(BACKEND_BASE_URL);
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash) {
    throw new Error('Configure a plain HTTPS backend base URL.');
  }
  const response = await fetch(`${base.toString().replace(/\/$/, '')}/rooms/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(`Room request failed (${response.status})`);
  return result;
}

export const createRoomViaBackend = ({ payload }: RoomOperationOptions) => postRoom('create', payload);
export const joinRoomViaBackend = ({ payload }: RoomOperationOptions) => postRoom('join', payload);
