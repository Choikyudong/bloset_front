// axios 옵션 인터페이스
export interface AxiosOption {
  url: string;
  data?: Object;
}

// axios 반환 데이터 인터페이스
export interface AxiosResData {
  status?: number;
  data: ResultData;
}

interface ResultData {
  isLoding: boolean;
  callName: string;
  data?: {
    isValid?: boolean;
    value?: any;
  }
}
