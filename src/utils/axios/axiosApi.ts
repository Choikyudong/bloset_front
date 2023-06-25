import customAxios from "./customAxios";

import { AxiosResponse } from "axios";
import { AxiosOption } from "./domain/axiosOption";


const GET = async (option: AxiosOption) => {
    try {
        const res: AxiosResponse = await customAxios.get(option.url, option.data);
        return res;
    } catch(err) {
        console.log(err)
    }
}

const POST = async (option: AxiosOption) => {
    try {
        const res: AxiosResponse = await customAxios.post(option.url, option.data);
        console.log("테스트3");
        return res;
    } catch(err) {
        console.log(err)
    }
}

const PUT = async (option: AxiosOption) => {
  try {
      const res: AxiosResponse = await customAxios.put(option.url, option.data);
      return res;
  } catch(err) {
      console.log(err)
  }
}

const DELETE = async (option: AxiosOption) => {
  try {
      const res: AxiosResponse = await customAxios.delete(option.url, option.data);
      return res;
  } catch(err) {
      console.log(err)
  }
}

export const axoisApi = {
  GET, POST, PUT, DELETE
}