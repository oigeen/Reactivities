import axios, { AxiosResponse } from "axios";
import { IActivity } from "../app/models/activity";
import { history } from "../index";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {

  if(error.message === 'Network Error' && !error.response)
  {
    toast.error("Network Error");
  }
  const { status, config, data } = error.response;

  if (status === 404) {
    history.push("/NotFound");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
      history.push("/NotFound");
  }

  if(status === 500) {
    toast.error("Internal Server Error 500");
  }
  throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (newActivity: IActivity) => requests.post("/activities", newActivity),
  update: (updatedActivity: IActivity) =>
    requests.put(`/activities/${updatedActivity.id}`, updatedActivity),
  delete: (id: string) => requests.del(`/activities/${id}`)
};

export default {
  Activities
};
