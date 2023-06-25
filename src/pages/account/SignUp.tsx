import { Box, Typography, Button, Stack, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  sendEmailValid,
  validEmail,
  validNickName,
  SignUp as create,
} from "../../service/account/accountService";
import { inputEventData } from "../../domains/common/commonData";
import {
  InputChangeEvent,
  getInputEventData,
} from "../../service/common/commonService";
import React from "react";
import { AxiosResData } from "../../utils/axios/domain/axiosOption";

const SignUp = () => {
  const [email, setEmail] = React.useState<any>();

  const [emailValid, setEmailValid] = React.useState<boolean>(true);
  const [emailCheck, setEmailCheck] = React.useState<boolean>(false);
  const [nickNameValid, setnickNameValid] = React.useState<boolean>(true);
  
  function validInput(e: InputChangeEvent): void {
    const inputData: inputEventData = getInputEventData(e);
    inputData.callback = callBackValidInput;
    switch (inputData.inputName) {
      case "email":
        setEmail(inputData.value);
        validEmail(inputData);
        break;
      case "nickName":
        validNickName(inputData);
        break;
    }
  }

  function callBackValidInput(result: AxiosResData) {
    const callName:string = result.data.callName;
    const data:any = result.data.data;
    switch (callName) {
      case "email":
        setEmailValid(data.isValid);
        break;
      case "checkEmail":
        setEmailCheck(data.isValid);
        break;
      case "nickName":
        setnickNameValid(data.isValid);
        break;
    }
  }

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 2,
          py: "70px",
          width: "100%",
        }}
      >
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4">Register</Typography>
          <Typography color="text.secondary" variant="body2">
            Already have an account? &nbsp;
            <Link to={"/account/signin"}>Log in</Link>
          </Typography>
        </Stack>
        <Box component={"form"} onSubmit={create} noValidate method="post">
          <Stack spacing={5}>
            <TextField
              error={!emailValid}
              fullWidth
              helperText={!emailValid && '이메일을 다시 확인해주세요'}
              label="Email"
              name="email"
              onBlur={validInput}
              type="email"
              InputProps={{
                endAdornment: (
                  emailValid ? 
                    <Button onClick={e => sendEmailValid(e, {email:email, callBack: callBackValidInput, callName: 'checkEmail'})}>
                      인증번호발송
                    </Button> 
                    : <></>
                )
              }}
            />
            <TextField
                fullWidth
                label="Code"
                name="emailAuthCode"
                type="text"
              />
            <TextField
              error={!nickNameValid}
              fullWidth
              helperText={!nickNameValid && '중복된 닉네임입니다'}
              label="NickName"
              name="nickName"
              id="nickName"
              onBlur={validInput}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              id="password"
              type="password"
            />
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
