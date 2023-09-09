import { FormEvent } from "react";
import { AxiosOption, AxiosResData, HttpMethod } from "../../utils/axios/axiosOption";
import { inputEventData } from "../../domains/common/commonData";
import { axiosApi } from "../../utils/axios/axiosApi";
import { SignInReq, SignInRes, SignUpReq } from "../../domains/account/accountReq";

// 이메일 유효성
export const validEmail = (email: string): Promise<boolean> => {
  const emailRegex = /^(?=.{0,255}$)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return new Promise<boolean>((resolve) => {
    if (emailRegex.test(email)) {
      const option: AxiosOption = {
        method: HttpMethod.GET,
        url: `signUp/findDuplicateEmail`,
        data :{
          params: {
            email: email
          }
        }
      }
  
      axiosApi(option)
      .then((response) => {
        if (response?.status === 200 && response.data === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        alert('에러발생 ㅜ');
        console.log(error);
      });
    } else {
      alert('이메일 형식은 mail@mail.com 식으로 해주세요');
      resolve(false);
    }
  });
}

// 이메일 인증발송
export const sendEmail = (email: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
      const option: AxiosOption = {
        method: HttpMethod.POST,
        url: `signUp/sendVarificationEmail`,
        data :{
          email: email
        }
      }
  
      axiosApi(option)
      .then((response) => {
        if (response?.status === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        alert('에러발생 ㅜ');
        console.log(error);
      });
  });
}

// 닉네임 유효성
export const validNickName = (nickName: string): Promise<[boolean, string]> => {
  return new Promise<[boolean, string]>((resolve) => {
    const option: AxiosOption = {
      method: HttpMethod.GET,
      url: `signUp/findDuplicateNickName`,
      data :{
        params: {
          nickname: nickName
        }
      }
    }

    interface nickNameRes {
      nickname: string;
    }

    axiosApi(option)
    .then((response) => {
      const nickNameRes = response?.data as nickNameRes;
      const isPossibleName = nickNameRes.nickname === nickName;
      if (response?.status === 200 && isPossibleName) {
        resolve([true, nickName]);
      } else {
        resolve([false, nickNameRes.nickname]);
      }
    })
    .catch((error) => {
      alert('에러발생 ㅜ');
      console.log(error);
    });
  });
}

// 유저 회원가입
export const saveUser = (signUp: SignUpReq): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const option: AxiosOption = {
      method: HttpMethod.POST,
      url: `signUp/saveUser`,
      data :{
        email: signUp.email,
        emailAuthCode: signUp.emailCode,
        nickName: signUp.nickName,
        password: signUp.password
      }
    }

    axiosApi(option)
    .then((response) => {
      if (response?.status === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch((error) => {
      alert('에러발생 ㅜ');
      console.log(error);
    });
  });
}

// 유저 로그인
export const findUser = (signIn: SignInReq): Promise<[boolean, SignInRes] | boolean> => {
  return new Promise<[boolean, SignInRes] | boolean>((resolve) => {
    const option: AxiosOption = {
      method: HttpMethod.POST,
      url: 'login/findUser',
      data: {
        email: signIn.email,
        password: signIn.password
      }
    }
    axiosApi(option)
    .then((response) => {
      if (response?.status === 200) {
        const signInRes: SignInRes = response.data as SignInRes;
        resolve([true, signInRes]);
      } else {
        resolve(false);
      }
    })
    .catch((error) => {
      alert('에러발생');
      console.log(error);
    });
  });
}

// 로그아웃
export const actionlogOut = (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const option: AxiosOption = {
      method: HttpMethod.POST,
      url: 'login/logoutUser'
    }
    axiosApi(option)
    .then((response) => {
      if (response?.status === 200) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch((error) => {
      alert('에러발생');
      console.log(error);
    });
  });
}
