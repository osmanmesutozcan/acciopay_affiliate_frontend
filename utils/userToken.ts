export function getUserToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("userToken");
  }
}

export function setUserToken(token: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("userToken", token);
  }
}

export function deleteUserToken() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("userToken");
  }
}
