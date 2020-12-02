export async function checkTracksStatus(token: string, tracks: string | string[]) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((d) => d.json());
}

export async function getDevices(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((d) => d.json());
}

export async function enQueue(mediaItemUri: string, index: number = 0) {
  const [, mediaItemType, mediaItemId] = mediaItemUri.split(':');
  const queue = await (window as any).musicKitInstance.setQueue({ [mediaItemType]: mediaItemId });
  queue.position = index;
}

export async function getPlaybackState(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then((d) => {
    if (d.status === 204) {
      return null;
    }

    return d.json();
  });
}

export async function pause(token: string) {
  return fetch(`https://api.spotify.com/v1/me/player/pause`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function play() {
  if ((window as any).musicKitInstance.player.isPlaying) {
    (window as any).musicKitInstance.stop();
  }
  (window as any).musicKitInstance.play();
  console.log((window as any).musicKitInstance);
  // this.startTimer();
  // this.setState({
  //   isPlaying: true,
  //   timeRemaining: (window as any).musicKitInstance.player.currentPlaybackTimeRemaining,
  // });
}

export async function previous() {
  (window as any).musicKitInstance.previous();
  console.log((window as any).musicKitInstance);
}

export async function next() {
  (window as any).musicKitInstance.next();
  console.log((window as any).musicKitInstance);
}

export async function removeTracks(token: string, tracks: string | string[]) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify(ids),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

export async function saveTracks(token: string, tracks: string | string[]) {
  const ids = Array.isArray(tracks) ? tracks : [tracks];

  return fetch(`https://api.spotify.com/v1/me/tracks`, {
    body: JSON.stringify({ ids }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function seek(token: string, position: number) {
  return fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function setDevice(token: string, deviceId: string, shouldPlay?: boolean | undefined) {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    body: JSON.stringify({ device_ids: [deviceId], play: shouldPlay }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function setVolume(token: string, volume: number) {
  return fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}
