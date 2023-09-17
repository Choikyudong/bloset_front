import React, { ChangeEvent, useEffect, useState, KeyboardEvent, MouseEvent } from 'react';
import { ChangeMyInfo, LoginProps } from '../../domains/board/mainPost';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';
import { SignInReq } from '../../domains/account/accountReq';
import { findUser, updateMyInfo, validNickName } from '../../service/account/accountService';
import { CommonRegex } from '../../service/common/commonConstant';

enum EventType {
  NICK_NAME_CHECK = 'nickName'
  , ChANGE_NICK_NAME = 'changeNickName'
  , PASSWORD_VALID = 'password'
  , PASSWORD_CHECK = 'password_check'
}

const BoardMyInfo:React.FC<LoginProps> = ({ isLogin }) => {
  const navigator = useNavigatorContext();
  const [reloginStatus, setReLoginStatus] = useState<boolean>(false);
  const [isInputNickName, setIsInputNickName] = useState<boolean>(false);
  const [hasNickName, setHasNickName] = useState<boolean>(false);
  const [recommendNickName, setRecommendNickName] = useState<string>('');

  const [isInputPasword, setIsInputPasword] = useState<boolean>(false);
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const [isInputSamePasword, setIsInputSamePasword] = useState<boolean>(false);
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true);
  const [checkPassword, setCheckPassword] = useState<string>('');

  const [changeInfo, setChangeInfo] = useState<ChangeMyInfo>({
    nickName: '',
    password: ''
  });
  
  useEffect(() => {
    if (!isLogin) {
      alert('다시 로그인 해주세요');
      navigator('/account/signin');
      return;
    }
  }, []);

  const storeChangeInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setChangeInfo({
      ...changeInfo,
      [id]: value
    })
  };

  const storeCheckPassWord = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCheckPassword(value);
  }

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.ChANGE_NICK_NAME === eventType) {
      const isChange:boolean = window.confirm('추천한 닉네임으로 변경?');
      if (isChange) {
        setChangeInfo({
          ...changeInfo,
          nickName: recommendNickName
        });
        alert('변경함~');
        setRecommendNickName('');
        setHasNickName(true);
      }
    }
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.NICK_NAME_CHECK === eventType) {
      if (changeInfo.nickName.length === 0) {
        setRecommendNickName('');
        setIsInputNickName(false);
        return;
      }
      const nickNamePattern = new RegExp(CommonRegex.NickReg);
      if (!nickNamePattern.test(changeInfo.nickName) || changeInfo.nickName.length === 1) {
        alert('이상하게 입력 금지!');
        setRecommendNickName('');
        setIsInputNickName(false);
        return;
      }
      setIsInputNickName(true);
      const [hasNickName, nickName] = await validNickName(changeInfo.nickName);
      if (!hasNickName) {
        setRecommendNickName(nickName);
      }
      setHasNickName(hasNickName);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const eventType = event.currentTarget.id;
    if (EventType.PASSWORD_VALID === eventType) {
      if (changeInfo.password.length === 0) {
        setIsInputPasword(false);
        setIsValidPassword(false);
        setPasswordMsg('');
        return;
      }
      setIsInputPasword(true);
      if (8 > changeInfo.password.length) {
        setPasswordMsg('비밀번호가 너무 짧아요 ㅜㅜ');
        return;
      }
      const passwordPattern = new RegExp(CommonRegex.PwdReg);
      if (!passwordPattern.test(changeInfo.password)) {
        setIsValidPassword(false);
        setPasswordMsg('제대로 입력해주세요~~');  
        return;
      }
      setIsValidPassword(true);
      setPasswordMsg('사용가능~');
    }
    if (EventType.PASSWORD_CHECK === eventType) {
      if (checkPassword.length === 0) {
        setIsInputSamePasword(false);
        return;
      }
      setIsInputSamePasword(true);
      if (checkPassword === changeInfo.password) {
        setIsSamePassword(true);
      } else {
        setIsSamePassword(false);
      }
    }
  };

  const doReLogin = async () => {
    if (changeInfo.password === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }

    const signIn:SignInReq = {
      email : JSON.parse(localStorage.user).email,
      password : changeInfo.password
    }

    const result = await findUser(signIn);
    if (Array.isArray(result)) {
      const [isSuccess, signInRes] = result;
      if (isSuccess) {
        alert('인증 성공');
        setReLoginStatus(true);
        setChangeInfo({
          nickName: '',
          password: ''
        });
        setCheckPassword('');
      } else {
        alert('비밀번호가 틀립니다.');
        setReLoginStatus(false);
      }
    } else {
      alert('요청 중에 문제가 발생했습니다.');
    }
  }

  const changeMyInfo = async () => {
    if (changeInfo.nickName === '') {
      alert('닉네임을 입력해주세요');
      return;
    }

    if (changeInfo.password === '') {
      alert('비밀번호를 입력해주세요');
      return;
    }

    const result = await updateMyInfo(changeInfo);
    if (result) {
      alert('변경 성공');
      setReLoginStatus(true);
      setChangeInfo({
        nickName: '',
        password: ''
      });
    } else {
      alert('변경 실패');
      setReLoginStatus(false);
    }
  }

  return (
    <>
     {
      reloginStatus ?
      <>
      <strong>닉네임&nbsp;</strong>
      <input 
        id="nickName"
        type="text"
        value={changeInfo.nickName}
        onChange={storeChangeInfo}
        onBlur={handleBlur}
        maxLength={20}
        placeholder='최소 2글자, 최대 20글자'
      />
      {isInputNickName ?
        hasNickName ? 
        <strong>사용가능!</strong> : 
          <strong>이미존재함! 추천 : 
            <span id='changeNickName' onClick={handleClick}>{recommendNickName}</span>
          </strong>
        : <></>
      }
      <br/>
      <strong>비밀번호&nbsp;</strong>
      <input 
        id="password"
        type="password"
        value={changeInfo.password}
        onChange={storeChangeInfo}
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
      <br />
      <button onClick={changeMyInfo}>정보 수정</button>
      </>
      :
      <>
        <h1>다시 비밀번호 입력해주세요</h1>
        <input 
          id="password"
          type="password"
          value={changeInfo.password}
          onChange={storeChangeInfo}
          maxLength={20}
        />
        <br />
        <button onClick={doReLogin}>인증</button>
      </>
     }
    </>
  );
}

export default BoardMyInfo;