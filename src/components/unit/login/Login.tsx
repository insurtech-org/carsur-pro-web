"use client";

import { useState } from "react";

export default function Login() {
  const [input1, onChangeInput1] = useState("");
  const [input2, onChangeInput2] = useState("");

  const onClickLogin = () => {
    console.log("로그인");
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col items-center self-stretch bg-white ">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="flex flex-col mb-10">
            <img
              src={"/images/logo_login.png"}
              className="w-[102px] object-fill"
            />
          </div>

          {/* 아이디 */}
          <div className="flex flex-col">
            <span className="text-[#131211] text-sm font-bold mb-2 ml-5">
              {"아이디"}
            </span>
            <input
              placeholder={"아이디를 입력해주세요."}
              value={input1}
              onChange={(event) => onChangeInput1(event.target.value)}
              className="self-stretch text-[#212121] bg-white text-base py-[11px] pl-4 pr-8 mb-[15px] mx-5 rounded-lg border border-solid border-[#D6D6D6]"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col">
            <span className="text-[#131211] text-sm font-bold mb-2 ml-5">
              {"비밀번호"}
            </span>
            <input
              placeholder={"비밀번호를 입력해주세요."}
              value={input2}
              onChange={(event) => onChangeInput2(event.target.value)}
              className="self-stretch text-[#212121] bg-white text-base py-[11px] pl-4 pr-8 mb-6 mx-5 rounded-lg border border-solid border-[#D6D6D6]"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            className="flex flex-col items-center self-stretch bg-[#131211] text-left py-[11px] mb-[31px] mx-5 rounded-lg border-0"
            onClick={onClickLogin}
          >
            <span className="text-white text-base font-bold">{"로그인"}</span>
          </button>

          {/* 아이디 찾기 비밀번호 찾기 */}
          <div className="flex flex-col items-center self-stretch mb-[142px]">
            <div className="flex items-center">
              <span className="text-primary-alternate text-sm font-bold mr-[17px]">
                {"아이디 찾기"}
              </span>
              <div className="bg-[#BDBDBD] w-[1px] h-4 mr-2"></div>
              <span className="text-[#212121] text-sm font-bold">
                {"비밀번호 찾기"}
              </span>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col items-center mb-[115px]">
          <span className="text-[#757575] text-[13px] text-center ">
            {"회원가입은 카슈어 운영팀에 문의해주세요."}
          </span>
          <span className="text-[#757575] text-[13px] text-center ">
            {"운영팀: 1555-4473"}
          </span>
        </div>
      </div>
    </div>
  );
}
