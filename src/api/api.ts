import { USER, DATA } from "./api.const";

const fetchToken = async () => {
  return await fetch(`https://sputnic.tech/mobile_api/token/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(USER),
  });
};

const fetchRoute = async (token: string) => {
  return await fetch(`https://sputnic.tech/mobile_api/getRoutesPoint`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(DATA),
  });
};

export const fetchData = async () => {
  try {
    const response = await fetchToken();
    const { token } = await response.json();
    return fetchRoute(token);
  } catch (error) {
    console.log(error);
  }
};
