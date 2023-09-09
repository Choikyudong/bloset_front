import { ChangeEvent, useState } from 'react';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';
import { SignInReq } from '../../domains/account/accountReq';
import { findUser } from '../../service/account/accountService';

const SignIn = () => {
  const navigator = useNavigatorContext();

  const [signIn, setSignIn] = useState<SignInReq>({
    email: '',
    password: ''
  });

  const storeSignIn = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSignIn({
      ...signIn,
      [id]: value
    })
  };

  const doLogin = async () => {
    const result = await findUser(signIn);
    if (Array.isArray(result)) {
      const [isSuccess, signInRes] = result;
      if (isSuccess) {
        alert('로그인 성공');
        debugger;
        localStorage.setItem('user', JSON.stringify(signInRes));
        navigator('/board/');
      } else {
        alert('로그인 정보 다시 확인해주세요');
      }
    } else {
      alert('로그인 요청 중에 문제가 발생했습니다.');
    }
  }

  return (
    <>
      <h1>로그인 페이지</h1>
      <strong>이메일&nbsp;</strong>
      <input 
        id="email"
        type="email"
        value={signIn.email}
        placeholder='mail@example.com'
        onChange={storeSignIn}
      />
      <br />
      <strong>비밀번호&nbsp;</strong>
      <input 
        id="password"
        type="password"
        value={signIn.password}
        onChange={storeSignIn}
        maxLength={20}
      />
      <br/>
      <button id='signUp' onClick={doLogin}>로그인</button>
    </>
  );
}
  
export default SignIn;
