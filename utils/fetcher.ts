import { mutate } from "swr";
import qs from "query-string";
import { getUserToken } from "./userToken";

class FetchError extends Error {
  info: any;
  status: number;

  constructor(msg, { info, status }) {
    super(msg);

    this.info = info;

    this.status = status;
  }
}

/**
 * Data fetcher for SWR.
 */
export const fetcher = async (key: string) => {
  const [path, params = ""] = key?.split("?");

  const qp = qs.parse(params);
  Object.assign(qp, { token: "true" });

  const token = getUserToken();

  const res = await fetch(`${process.env.BACKEND_URL}${path}?${qs.stringify(qp)}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const info = await res.json();
    throw new FetchError("An error occurred while fetching the data.", {
      info,
      status: res.status,
    });
  }

  return res.json();
};

/**
 * Post data to key and revalidate with that key.
 */
export const poster = async <T = any>(key: string, body: any, headers = {}, method = "POST") => {
  const [path, params = ""] = key?.split("?");

  const qp = qs.parse(params);
  Object.assign(qp, { token: "true" });

  const token = getUserToken();
  console.log(process.env.BACKEND_URL);
  console.log({ path });
  console.log({ qp }, { key });

  const res = await fetch(`${process.env.BACKEND_URL}${path}?${qs.stringify(qp)}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const info = await res.json();
    throw new FetchError("An error occurred while posting the data.", {
      info,
      status: res.status,
    });
  }

  await mutate(key);
  return res.json();
};

export const putter = async <T = any>(key: string, body: any, headers = {}) => {
  const [path, params = ""] = key?.split("?");

  const qp = qs.parse(params);
  Object.assign(qp, { token: "true" });

  const token = getUserToken();

  const res = await fetch(`${process.env.BACKEND_URL}${path}?${qs.stringify(qp)}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const info = await res.json();
    throw new FetchError("An error occurred while posting the data.", {
      info,
      status: res.status,
    });
  }

  await mutate(key);
  return res.json();
};
