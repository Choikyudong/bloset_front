/**
 * axios Http method
 * 해당 프로젝트내에 Http method가 필요하다면 해당 enum 사용 권고
 */
export enum HttpMethod {
  GET = 'GET'
  , POST = 'POST'
  , PUT = 'PUT'
  , PATCH = 'PATCH'
  , DELETE = 'DELETE'
  , OPTION = 'OPTION'
  , HEAD = 'HEAD'
}

/**
 * axios 전송용 인터페이스
 */
export interface AxiosOption {
  method: string;
  url: string;
  data?: Object;
}

/**
 * axios 응답용 데이터 인터페이스
 */
export interface AxiosResData {
  status: number;
  data: Object;
}

// interface ResultData {
//   // callName: string;
//   data?: {
//     isValid?: boolean;
//     value?: any;
//   }
// }

/**
 * 표준 axios 사용시 필수 값 확인용
 * @param option 전송용 객체
 * @returns bool 데이터 확인 결과
 */
export function validateRequestOption(option: AxiosOption) {
  if (option.method === undefined || option.method === null) {
    console.log("전송시 method 없음");
    return false;
  }

  if (option.url === undefined || option.url === null) {
    console.log("전송할 url 없음");
    return false;
  }

  return true;
}