"use client";

import { login } from "@/api/common.api";
import { useUserStore } from "@/store/user";
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
    }
  };

  const validateLogin = () => {
    if (userId === "" && password === "") {
      setIsUserIdError(true);
      setIsPasswordError(true);
      return false;
    }

    if (password === "") {
      setIsPasswordError(true);
      return false;
    }

    if (userId === "") {
      setIsUserIdError(true);
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col bg-common-white">
      <div className="flex flex-col items-center self-stretch bg-common-white px-5">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center w-full mt-28">
          {/* 로고 */}
          <div className="flex flex-col mb-[42px]">
            <img
              src={"/images/logo_login.png"}
              className="w-[102px] object-fill"
            />
          </div>

          {/* 아이디, 비밀번호 입력 영역 */}
          <div className="flex flex-col w-full gap-4">
            {/* 아이디 입력 영역 */}
            <div className="flex flex-col w-full">
              <span className="text-primary-normal text-sm font-semibold mb-2">
                아이디
                <span className="text-status-destructive text-sm font-semibold">
                  *
                </span>
              </span>

              <div
                className={`relative rounded-lg border border-solid py-3 px-4  ${
                  isUserFocused
                    ? "border-primary-normal"
                    : isUserIdError || isFailedLogin
                    ? "border-status-destructive"
                    : "border-line-neutral"
                }`}
              >
                <input
                  placeholder={"아이디를 입력해주세요."}
                  value={userId}
                  onChange={(event) => {
                    setUserId(event.target.value);
                    setIsUserIdError(false);
                    setIsFailedLogin(false);
                  }}
                  className="self-stretch text-primary-normal text-base font-regular focus:outline-none w-full pr-8"
                  onFocus={() => setIsUserFocused(true)}
                  onBlur={() => setIsUserFocused(false)}
                />

                <button
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                  onClick={() => {
                    setUserId("");
                    setIsUserIdError(false);
                    setIsFailedLogin(false);
                  }}
                >
                  <img src={"/images/icon/ic_x-circle-fill.svg"} alt="지우기" />
                </button>
              </div>

              {isUserIdError && (
                <span className="text-status-destructive text-sm font-regular pt-2">
                  아이디를 입력해주세요.
                </span>
              )}
            </div>

            {/* 비밀번호 입력 영역 */}
            <div className="flex flex-col w-full">
              <span className="text-primary-normal text-sm font-semibold mb-2">
                비밀번호
                <span className="text-status-destructive text-sm font-semibold">
                  *
                </span>
              </span>

              <div
                className={`relative rounded-lg border border-solid py-3 px-4 ${
                  isPasswordFocused
                    ? "border-primary-normal"
                    : isPasswordError || isFailedLogin
                    ? "border-status-destructive"
                    : "border-line-neutral"
                }`}
              >
                <input
                  type="password"
                  placeholder={"비밀번호를 입력해주세요."}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setIsPasswordError(false);
                    setIsFailedLogin(false);
                  }}
                  className="self-stretch text-primary-normal text-base focus:outline-none w-full pr-8"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />

                <button
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 hover:opacity-70 transition-opacity "
                  onClick={() => {
                    setPassword("");
                    setIsPasswordError(false);
                    setIsFailedLogin(false);
                  }}
                >
                  <img
                    src={"/images/icon/ic_x-circle-fill.svg"}
                    alt="비밀번호지우기"
                  />
                </button>
              </div>

              {isPasswordError && (
                <span className="text-status-destructive text-sm font-regular pt-2">
                  비밀번호를 입력해주세요.
                </span>
              )}

              {isFailedLogin && (
                <span className="text-status-destructive text-sm font-regular pt-2">
                  아이디 또는 비밀번호를 확인해주세요.
                </span>
              )}
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            className="flex flex-col items-center self-stretch bg-primary-normal text-left py-3 rounded-lg border-0 mt-6"
            onClick={onClickLogin}
          >
            <span className="text-common-white text-base font-semibold">
              로그인
            </span>
          </button>

          {/* 아이디 찾기 비밀번호 찾기 */}
          <div className="flex flex-col items-center self-stretch mt-6">
            <div className="flex items-center">
              <span className="text-[#212121] opacity-65 text-sm font-medium cursor-pointer">
                아이디 찾기
              </span>
              <div className="bg-line-neutral w-[1px] h-4 mx-3"></div>
              <span className="text-[#212121] opacity-65 text-sm font-medium cursor-pointer">
                비밀번호 찾기
              </span>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col items-center my-10 sm:my-28">
          <span className="text-primary-neutral text-[13px] text-center ">
            {"회원가입은 카슈어 운영팀에 문의해주세요."}
          </span>
          <span className="text-primary-neutral text-[13px] text-center ">
            {"운영팀: 1555-4473"}
          </span>
        </div>
      </div>
    </div>
  );
}
