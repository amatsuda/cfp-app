import { getMeta } from "./helpers"
const csrfToken = getMeta("csrf-token")

export function patchTimeSlot(slot, talk) {
  const talkID = talk === null ? '' : talk.id.toString();
  
  const data = JSON.stringify({
    time_slot: {
      program_session_id: talkID,
      title: slot.title || '',
      track_id: slot.track_id || '',
      presenter: slot.presenter || '',
      description: slot.description || ''
    }
  });
  
  if (slot.update_path) {
    return fetch(slot.update_path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
      credentials: "same-origin",
      body: data
    })
  }
}

export function postBulkTimeSlots(path, day, rooms, duration, startTimes) {
  const data = JSON.stringify({
    bulk_time_slot: {
      day,
      rooms,
      start_times: startTimes,
      duration
    }
  })
  
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    credentials: "same-origin",
    body: data
  })
}
