import { FormEvent } from "react";
import { axoisApi } from "../../utils/axios/axiosApi";
import { AxiosOption, AxiosResData } from "../../utils/axios/domain/axiosOption";
import { inputEventData } from "../../domains/common/commonData";

// 이메일 유효성
export const validEmail = (data: inputEventData): boolean => {
  const emailRegex: RegExp = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  const valueAsString: string = String(data.value);
  
  if (emailRegex.test(valueAsString)) {
    const option: AxiosOption = {
      url: `signUp/findDuplicateEmail`,
      data :{
        params: {
          email: valueAsString
        }
      }
    }

    axoisApi.GET(option)
    .then((response) => {
      const isDupliEmail:boolean = response?.data === 0;
      const result: AxiosResData = {
        status: response?.status,
        data: {
          isLoding: false,
          callName: data.inputName,
          data: {
            isValid: isDupliEmail
          }
        }
      }
      
      if (data.callback) {
        data.callback(result);
      }
    })
    .catch(() => {
      console.log('에러발생');
    });
  }

  return false;
}

// 이메일 인증발송
export const sendEmailValid = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, eventData: any) => {
  const data = {
    email: eventData.email
  }
  const option: AxiosOption = {
    url: `signUp/sendVarificationEmail`,
    data: data
  }
  axoisApi.POST(option)
  .then((response) => {
    if (response?.status === 200) {
      alert('인증성공!');
    }

    const result: AxiosResData = {
      status: response?.status,
      data: {
        isLoding: false,
        callName: eventData.callName
      }
    }
    if (eventData.callBackValidInput) {
      eventData.callBackValidInput(result);
    }
  })
  .catch(() => {
    console.log('!!!!!!'); // 잉 에러 경고창..
  });
}

// 닉네임 유효성
export const validNickName = (data: inputEventData): boolean => {
  const nickName = String(data.value);
  const option: AxiosOption = {
    url: 'signUp/findDuplicateNickName',
    data :{
      params: {
        nickname: nickName
      }
    }
  }
  axoisApi.GET(option)
  .then((response) => {
    const isDupliNickName:boolean = response?.data.nickname === nickName    

    const result: AxiosResData = {
      status: response?.status,
      data: {
        isLoding: false,
        callName: data.inputName,
        data: {
          isValid: isDupliNickName
        }
      }
    }
    if (data.callback) {
      data.callback(result);
    }
  })
  .catch(() => {
    console.log('!!')
  });
  return false;
}

// 유저 회원가입
export const SignUp = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const option: AxiosOption = {
    url: 'signUp/saveUser',
    data: {
      email: data.get('email') as string,
      nickName: data.get('nickName') as string,
      password: data.get('password') as string,
      emailAuthCode: data.get('emailAuthCode') as string
    }
  }
  axoisApi.POST(option)
  .then(() => {
    alert('회원가입 축하');
    window.location.href = 'http://localhost:3000/account/signin';
  })
  .catch(() => {
    console.log('실패');
  });
}

// 유저 로그인
export const SignIn = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const option: AxiosOption = {
    url: 'login/findUser',
    data: {
      email: data.get('email') as string,
      password: data.get('password') as string,
    }
  }
  axoisApi.POST(option)
  .then((response) => {
    console.log("로그인성공!");
    localStorage.setItem('test', 'test');
    window.location.href = 'http://localhost:3000/';
  })
  .catch((error) => {
    console.log('에러발생');
  });
}
