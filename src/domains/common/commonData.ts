import { AxiosResData } from "../../utils/axios/axiosOption";

export interface inputEventData {
  inputName: string;
  value: string | number;
  callback?: (res: AxiosResData) => void | object;
}