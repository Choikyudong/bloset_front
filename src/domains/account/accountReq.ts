// accountService에서 사용할 예정

// 유저 로그인
export interface SignInReq {
  email: String;
  password: String;
}

// 유저 회원 가입
export interface SignUpReq {
  email: String;
  nickName: String;
  password: String;
}
