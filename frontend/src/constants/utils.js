
export function setLocalStorageByItem(name, data) {
  localStorage.setItem(name, window.btoa(encodeURIComponent(JSON.stringify(data))))
}

export function getLocalStorageByItem(name) {
  const dataLocalStorage = localStorage.getItem(name)

  if (dataLocalStorage) {
    return decodeURIComponent(window.atob(dataLocalStorage)) === 'undefined'
      ? null
      : JSON.parse(decodeURIComponent(window.atob(dataLocalStorage)))
  }

  return false
}

export function removeLocalStorageByItem(name) {
  localStorage.removeItem(name)
}



