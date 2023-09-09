import React, { ChangeEvent, useState, KeyboardEvent, MouseEvent } from 'react';
import { SignUpReq } from "../../domains/account/accountReq";
import { saveUser, sendEmail, validEmail, validNickName } from '../../service/account/accountService';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';

enum InputId {
  EMAIL = 'email'
  , EMAILCODE = 'emailCode'
  , NICKNAME = 'nickName'
  , PASSWORD = 'password'
}

enum EventType {
  CHECK_EMAIL = 'checkEmail'
  , SEND_EMAIL = 'sendEmail'
  , NICK_NAME_CHECK = 'nickName'
  , PASSWORD_VALID = 'password'
  , PASSWORD_CHECK = 'password_check'
  , SignUP = 'signUp'
}

const SignUp = () => {
  const navigator = useNavigatorContext();

  const [signUp, setSignUp] = useState<SignUpReq>({
    email: '',
    emailCode: '',
    nickName: '',
    password: ''
  });

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [isInputEmailCode, setIsInputEmailCode] = useState<boolean>(false);

  const [isInputNickName, setIsInputNickName] = useState<boolean>(false);
  const [hasNickName, setHasNickName] = useState<boolean>(false);
  const [recommendNickName, setRecommendNickName] = useState<string>('');

  const [isInputPasword, setIsInputPasword] = useState<boolean>(false);
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const [isInputSamePasword, setIsInputSamePasword] = useState<boolean>(false);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);
  const [checkPassword, setCheckPassword] = useState<string>('');

  const storeSignUp = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    
    if (InputId.EMAIL === id && value === '') {
      setIsValidEmail(false);
    }

    if (InputId.EMAILCODE === id && value !== '') {
      setIsInputEmailCode(true);
    } else if (InputId.EMAILCODE === id && value === '') {
      setIsInputEmailCode(false);
    }
    
    setSignUp({
      ...signUp,
      [id]: value
    })
  };

  const storeCheckPassWord = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCheckPassword(value);
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.PASSWORD_VALID === eventType) {
      if (signUp.password.length === 0) {
        setIsInputPasword(false);
        setPasswordMsg('');
        return;
      }
      setIsInputPasword(true);
      if (8 > signUp.password.length) {
        setPasswordMsg('비밀번호가 너무 짧아요 ㅜㅜ');
        return;
      }
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|;:'",.<>/?]).{8,20}$/;
      if (passwordPattern.test(signUp.password)) {
        setIsValidPassword(true);
        setPasswordMsg('사용가능~');
      } else {
        setIsValidPassword(false);
        setPasswordMsg('제대로 입력해주세요~~');
      }
    }
    if (EventType.PASSWORD_CHECK === eventType) {
      if (checkPassword.length === 0) {
        setIsInputSamePasword(false);
        return;
      }
      setIsInputSamePasword(true);
      if (checkPassword === signUp.password) {
        setIsSamePassword(true);
      } else {
        setIsSamePassword(false);
      }
    }
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.NICK_NAME_CHECK === eventType) {
      if (signUp.nickName.length === 0) {
        setRecommendNickName('');
        setIsInputNickName(false);
        return;
      }
      const nickNamePattern =  /^[a-zA-Z0-9가-힣]{2,20}$/;
      if (!nickNamePattern.test(signUp.nickName) || signUp.nickName.length === 1) {
        alert('이상하게 입력 금지!');
        setRecommendNickName('');
        setIsInputNickName(false);
        return;
      }
      setIsInputNickName(true);
      const [hasNickName, nickName] = await validNickName(signUp.nickName);
      if (!hasNickName) {
        setRecommendNickName(nickName);
      }
      setHasNickName(hasNickName);
    }
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.CHECK_EMAIL === eventType) {
      if (signUp.email === '') {
        alert('빈값이에요!');
        return;
      }
      const emailRegex = /^(?=.{0,255}$)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      if (!emailRegex.test(signUp.email)) {
        alert('이메일을 다시 입력해주세요!');
        return;
      }
      const haveEmail = await validEmail(signUp.email);
      if (!haveEmail) {
        alert('이미 존재함~');
        return;
      }
      alert('해당 이메일은 사용가능!');
      setIsValidEmail(haveEmail);
    }

    if (EventType.SEND_EMAIL === eventType) {
      if (signUp.email === '') {
        alert('이메일이 왜 빈칸일까요? 다시 확인해주세요!');
        return;
      }
      const isSend = await sendEmail(signUp.email);
      if (!isSend) {
        alert('메일이 안날라감 ㅜ');
        return;
      }
      alert('이메일 인증 코드를 밑의 칸에 입력해주세요!!');
      setIsSendEmail(isSend);
    }

    if (EventType.SignUP === eventType) {
      if (!isValidEmail) {
        alert('이메일 확인을 해주세요');
        return;
      }
      if (!isSendEmail) {
        alert('이메일 코드 발송을 해주세요');
        return;
      }
      if (!isInputEmailCode) {
        alert('이메일 코드를 입력해주세요');
        return;
      }
      if (!isInputNickName) {
        alert('닉네임을 입력해주세요');
        return;
      }
      if (!hasNickName) {
        alert('다른 닉네임을 사용해주세요');
        return;
      }
      if (!isInputPasword) {
        alert('비밀번호를 입력해주세요');
        return;
      }
      if (!isValidPassword) {
        alert('주어진 규칙에서 비밀번호를 입력해주세요');
        return;
      }
      if (!isInputSamePasword) {
        alert('비밀번호 확인을 입력해주세요');
        return;
      }
      if (!isSamePassword) {
        alert('비밀번호가 서로 일치하지 않습니다.');
        return;
      }

      const result = await saveUser(signUp);
      if (result) {
        alert('회원가입 성공, 로그인 페이지로 이동');
        navigator('/account/signIn');
      } else {
        alert('오류발생');
      }
    }
  };

  return (
    <>
      <h1>회원가입 페이지</h1>
      <strong>이메일&nbsp;</strong>
      <input 
        id="email"
        type="email"
        value={signUp.email}
        placeholder='mail@example.com'
        onChange={storeSignUp}
      />
      &nbsp;<button id='checkEmail' onClick={handleClick}>이메일확인</button>
      {isValidEmail ? 
        <>
          &nbsp;<button id='sendEmail' onClick={handleClick}>이메일발송</button>
        </>
        :<></>
      }
      {isSendEmail ? 
        <>
          <br />
          <strong>이메일코드&nbsp;</strong>
          <input 
            id="emailCode"
            type="text"
            value={signUp.emailCode}
            placeholder='코드를 여기에 입력!'
            onChange={storeSignUp}
          />
        </>
        : <></>
      }
      <br/>
      <strong>닉네임&nbsp;</strong>
      <input 
        id="nickName"
        type="text"
        value={signUp.nickName}
        onChange={storeSignUp}
        onBlur={handleBlur}
        maxLength={20}
        placeholder='최소 2글자, 최대 20글자'
      />
      {isInputNickName ?
        hasNickName ? 
        <strong>사용가능!</strong> : <strong>이미존재함! 추천 : {recommendNickName}</strong>
        : <></>
      }
      <br/>
      <strong>비밀번호&nbsp;</strong>
      <input 
        id="password"
        type="password"
        value={signUp.password}
        onChange={storeSignUp}
        onKeyUp={handleKeyUp}
        maxLength={20}
        placeholder='최소 8글자, 최대 20글자'
      />
      {isInputPasword ?
        <strong>{passwordMsg}</strong> : <></>
      }
      <br/>
      {isValidPassword ? 
        <>
          <strong>비밀번호 확인&nbsp;</strong>
          <input 
            id="password_check"
            type="password"
            value={checkPassword}
            onChange={storeCheckPassWord}
            onKeyUp={handleKeyUp}
            maxLength={20}
            placeholder='최소 8글자, 최대 20글자'
            />
        </>
        :<></>
      }
      {
        isInputSamePasword ?
        isSamePassword ? <strong>비밀번호 일치!</strong> : <strong>비밀번호 불일치!</strong>
        :
        <></>
      }
      <br/>
      <button id='signUp' onClick={handleClick}>회원가입</button>
    </>
  );
};

export default SignUp;
