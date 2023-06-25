import { AxiosResData } from "../../utils/axios/domain/axiosOption";

export interface inputEventData {
  inputName: string;
  value: string | number;
  callback?: (res: AxiosResData) => void | object;
}