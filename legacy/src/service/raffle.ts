import axios from "axios";
import { axiosInstance } from "./axiosConfig";

export function CreateRaffle(data: CreateRaffleType) {
  return axiosInstance({
    method: "POST",
    url: "/raffle",
    data,
  });
}

export function UpdateRaffle(data: UpdateRaffleType, id: string | undefined) {
  return axiosInstance({
    method: "PATCH",
    url: `/raffle/${id}`,
    data,
  });
}

export function DeleteRaffle(id: number) {
  return axiosInstance({
    method: "DELETE",
    url: `/raffle/${id}`,
  });
}

export function GetRaffles(id: string | undefined) {
  return axiosInstance({
    method: "GET",
    url: `/raffle/user/${id}`,
  });
}

export function GetRaffle(id: number) {
  return axios({
    method: "GET",
    url: `/raffle/${id}`,
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
  });
}
