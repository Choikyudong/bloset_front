// accountService

// 유저 로그인
export interface SignInReq {
  email: string;
  password: string;
}

// 유저 리스폰스
export interface SignInRes {
  email: string;
  nickname: string;
}

// 유저 회원 가입
export interface SignUpReq {
  email: string;
  emailCode: string;
  nickName: string;
  password: string;
}
