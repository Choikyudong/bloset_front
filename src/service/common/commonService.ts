import { inputEventData } from "../../domains/common/commonData";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export function getInputEventData(e: InputChangeEvent): inputEventData {
  return {
    inputName: e.currentTarget.name,
    value: e.currentTarget.value,
  };
}