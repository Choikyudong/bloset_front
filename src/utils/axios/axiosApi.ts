import customAxios from "./customAxios";

import { AxiosResponse } from "axios";
import { AxiosOption, AxiosResData, HttpMethod, validateRequestOption } from "./axiosOption";

/**
 * 표준 axios입니다.
 * 전송해야하는 데이터 유형은 AxiosOption을 확인해주세요.
 * @param option 요청용 axios
 * @returns res 응답객체
 */
export const axiosApi = async (option: AxiosOption) => {
  if (!validateRequestOption(option)) {
    alert('에러~ 개발자에게 문의해주세요');
    return;
  }

  try {
    let res: AxiosResponse<AxiosResData>;
    switch(option.method) {
      case HttpMethod.GET:
        res = await customAxios.get(option.url, option.data);
        break;
      case HttpMethod.POST:
        res = await customAxios.post(option.url, option.data);
        break;
      case HttpMethod.PUT:
        res = await customAxios.put(option.url, option.data);
        break;
      case HttpMethod.PATCH:
        res = await customAxios.patch(option.url, option.data);
        break;
      case HttpMethod.DELETE:
        res = await customAxios.delete(option.url, option.data);
        break;
      default:
        throw new Error(`현재 지원되지 않는 HTTP 메서드를 사용했습니다. ${option.method}`);
    }
    const responseData: AxiosResData = {
      status: res.status,
      data: res.data
    };
    return responseData;
  } catch (error) {
    alert('에러~ 개발자에게 문의해주세요');
    console.log(error);
  }
}
