"use client";

import { login } from "@/api/auth.api";
import VailedInput from "@/components/common/VailedInput";
import { useUserStore } from "@/store/user";
import { extractErrorMessage, validatePassword } from "@/utils/util";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const { setUser, setTokens } = useUserStore();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [isUserIdError, setIsUserIdError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isFailedLogin, setIsFailedLogin] = useState(false);

  const onClickLogin = async () => {
    try {
      if (!validateLogin()) return;

      const res = await login(userId, password);

      setIsFailedLogin(false);

      setUser({
        id: res.id,
        username: res.username,
        userId: res.userId,
        tellNo: res.tellNo,
        factoryName: res.factoryName,
        roles: res.roles,
      });

      setTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });

      router.push("/call");
    } catch (error) {
      console.log(error);

      setIsFailedLogin(true);
      setPasswordErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  const validateLogin = () => {
    if (userId === "" && password === "") {
      setIsUserIdError(true);
      setIsPasswordError(true);
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      return false;
    }

    if (password === "") {
      setIsPasswordError(true);
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      return false;
    }

    if (userId === "") {
      setIsUserIdError(true);
      return false;
    }

    const { isValid, message } = validatePassword(password);
    if (!isValid) {
      setIsPasswordError(true);
      setPasswordErrorMessage(message);
      return false;
    }

    return true;
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    //기존 에러 초기화
    setIsPasswordError(false);
    setIsFailedLogin(false);

    // //에러 있으면 세팅
    const { isValid, message } = validatePassword(password);
    if (!isValid) {
      setIsPasswordError(true);
      setPasswordErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col bg-common-white">
      <div className="flex flex-col items-center self-stretch bg-common-white px-5">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center w-full mt-28">
          {/* 로고 */}
          <div className="flex flex-col mb-[42px]">
            <img src={"/images/logo_login.png"} className="w-[102px] object-fill" />
          </div>

          {/* 아이디, 비밀번호 입력 영역 */}
          <div className="flex flex-col w-full gap-4">
            {/* 아이디 입력 영역 */}
            <div className="flex flex-col w-full">
              <span className="text-primary-normal text-sm font-semibold mb-2">
                아이디
                <span className="text-status-destructive text-sm font-semibold">*</span>
              </span>

              <VailedInput
                type="text"
                placeholder="아이디를 입력해주세요."
                value={userId}
                isFocused={isUserFocused}
                isError={isUserIdError || isFailedLogin}
                onChange={event => {
                  setUserId(event.target.value);
                  setIsUserIdError(false);
                  setIsFailedLogin(false);
                }}
                onFocus={() => setIsUserFocused(true)}
                onBlur={() => setIsUserFocused(false)}
                onClickClear={() => {
                  setUserId("");
                  setIsUserIdError(false);
                  setIsFailedLogin(false);
                }}
                errorMessage={isUserIdError ? "아이디를 입력해주세요." : ""}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    event.preventDefault();

                    onClickLogin();
                  }
                }}
              />
            </div>

            {/* 비밀번호 입력 영역 */}
            <div className="flex flex-col w-full">
              <span className="text-primary-normal text-sm font-semibold mb-2">
                비밀번호
                <span className="text-status-destructive text-sm font-semibold">*</span>
              </span>

              <VailedInput
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                isFocused={isPasswordFocused}
                isError={isPasswordError || isFailedLogin}
                onChange={event => {
                  onChangePassword(event);
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onClickClear={() => {
                  setPassword("");
                  setIsPasswordError(false);
                  setIsFailedLogin(false);
                }}
                errorMessage={
                  isPasswordError ? passwordErrorMessage : isFailedLogin ? "아이디 또는 비밀번호를 확인해주세요." : ""
                }
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    event.preventDefault();

                    onClickLogin();
                  }
                }}
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            className="flex flex-col items-center self-stretch bg-primary-normal text-left py-3 rounded-lg border-0 mt-6"
            onClick={onClickLogin}
          >
            <span className="text-common-white text-base font-semibold">로그인</span>
          </button>

          {/* 아이디 찾기 비밀번호 찾기 */}
          <div className="flex flex-col items-center self-stretch mt-6">
            <div className="flex items-center">
              <button
                className="text-[#212121] opacity-65 text-sm font-medium cursor-pointer"
                onClick={() => {
                  router.push("/find-id");
                }}
              >
                아이디 찾기
              </button>

              <div className="bg-line-neutral w-[1px] h-4 mx-3"></div>

              <button
                className="text-[#212121] opacity-65 text-sm font-medium cursor-pointer"
                onClick={() => {
                  router.push("/find-id");
                }}
              >
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col items-center my-10 sm:my-28">
          <span className="text-primary-neutral text-[13px] text-center ">
            {"회원가입은 카슈어 운영팀에 문의해주세요."}
          </span>
          <span className="text-primary-neutral text-[13px] text-center ">{"운영팀: 1555-4473"}</span>
        </div>
      </div>
    </div>
  );
}
