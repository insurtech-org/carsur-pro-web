"use client";

import { changePassword } from "@/api/auth.api";
import BackHeader from "@/components/common/BackHeader";
import MainButton from "@/components/common/MainButton";
import VailedInput from "@/components/common/VailedInput";
import { useToastStore } from "@/store/toast";
import { ServerErrorResponse } from "@/type/etc.type";
import { extractErrorMessage, validatePassword } from "@/utils/util";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { showSuccess } = useToastStore();

  //현재 비밀번호
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] = useState(false);
  const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState("");

  //새 비밀번호
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);
  const [isNewPasswordError, setIsNewPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");

  //새 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

  const [failErrorMessage, setFailErrorMessage] = useState("");
  const [isFailError, setIsFailError] = useState(false);

  const onClickChangePassword = async () => {
    if (!confirmValidate()) return;

    try {
      await changePassword(currentPassword, newPassword, confirmPassword);

      showSuccess("비밀번호가 변경되었어요.");
      router.replace("/mypage/account");
    } catch (error) {
      const errorData = extractErrorMessage(error) as unknown as ServerErrorResponse;

      const errorMessage = errorData?.message;
      const errorCode = errorData?.code;

      if (errorCode === "BE") {
        setFailErrorMessage(errorMessage);
        setIsFailError(true);
      } else {
        setFailErrorMessage("현재 비밀번호가 일치하지 않습니다.");
        setIsFailError(true);
      }
    }
  };

  //변경하기 누를 때 마지막 벨류 체크
  const confirmValidate = () => {
    if (currentPassword === "") {
      setIsCurrentPasswordError(true);
      setCurrentPasswordErrorMessage("현재 비밀번호를 입력해주세요.");
      return false;
    }

    if (newPassword === "") {
      setIsNewPasswordError(true);
      setNewPasswordErrorMessage("새 비밀번호를 입력해주세요.");
      return false;
    }

    if (confirmPassword === "") {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("새 비밀번호 확인을 입력해주세요.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("새 비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  //입력 시 벨류 체크
  const onChangeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //현재 비밀번호 변경
    const password = e.target.value;
    setCurrentPassword(password);
    //에러 초기화
    setIsCurrentPasswordError(false);
    setCurrentPasswordErrorMessage("");
    setIsFailError(false);
    setFailErrorMessage("");
    //비밀번호 유효성 검사
    const { isValid, message } = validatePassword(password);
    setIsCurrentPasswordError(!isValid);
    setCurrentPasswordErrorMessage(message);
  };

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //새 비밀번호 변경
    const password = e.target.value;
    setNewPassword(password);
    //에러 초기화
    setIsNewPasswordError(false);
    setNewPasswordErrorMessage("");
    //비밀번호 유효성 검사
    const { isValid, message } = validatePassword(password);
    setIsNewPasswordError(!isValid);
    setNewPasswordErrorMessage(message);

    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("새 비밀번호가 일치하지 않습니다.");
    } else {
      setIsConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    //새 비밀번호 확인 변경
    const password = e.target.value;
    setConfirmPassword(password);
    //에러 초기화
    setIsConfirmPasswordError(false);
    setConfirmPasswordErrorMessage("");
    //비밀번호 유효성 검사
    const { isValid, message } = validatePassword(password);
    setIsConfirmPasswordError(!isValid);
    setConfirmPasswordErrorMessage(message);

    if (password.length > 0 && newPassword !== password) {
      setIsConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("새 비밀번호가 일치하지 않습니다.");
    } else {
      setIsConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
  };

  return (
    <div>
      <BackHeader title="비밀번호 변경" onBack={() => router.push("/mypage/account")} />

      {/* 비밀번호 입력 영역 */}
      <div className="flex flex-col w-full p-5">
        <div className="flex flex-col w-full mb-4">
          <span className="text-primary-normal text-sm font-semibold mb-2">
            현재 비밀번호
            <span className="text-status-destructive text-sm font-semibold">*</span>
          </span>

          <VailedInput
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            value={currentPassword}
            isFocused={isCurrentPasswordFocused}
            isError={isCurrentPasswordError || isFailError}
            onChange={onChangeCurrentPassword}
            onFocus={() => setIsCurrentPasswordFocused(true)}
            onBlur={() => setIsCurrentPasswordFocused(false)}
            onClickClear={() => {
              setCurrentPassword("");
              setIsCurrentPasswordError(false);
              setCurrentPasswordErrorMessage("");
            }}
            errorMessage={isFailError ? failErrorMessage : currentPasswordErrorMessage}
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <span className="text-primary-normal text-sm font-semibold mb-2">
            새 비밀번호
            <span className="text-status-destructive text-sm font-semibold">*</span>
          </span>

          <VailedInput
            type="password"
            placeholder="새 비밀번호를 입력해 주세요."
            value={newPassword}
            isFocused={isNewPasswordFocused}
            isError={isNewPasswordError}
            onChange={onChangeNewPassword}
            onFocus={() => setIsNewPasswordFocused(true)}
            onBlur={() => setIsNewPasswordFocused(false)}
            onClickClear={() => {
              setNewPassword("");
              setIsNewPasswordError(false);
              setNewPasswordErrorMessage("");
            }}
            errorMessage={newPasswordErrorMessage}
          />
        </div>

        <div className="flex flex-col w-full mb-8">
          <span className="text-primary-normal text-sm font-semibold mb-2">
            새 비밀번호 확인
            <span className="text-status-destructive text-sm font-semibold">*</span>
          </span>

          <VailedInput
            type="password"
            placeholder="비밀번호를 동일하게 입력해 주세요."
            value={confirmPassword}
            isFocused={isConfirmPasswordFocused}
            isError={isConfirmPasswordError}
            onChange={onChangeConfirmPassword}
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
            onClickClear={() => {
              setConfirmPassword("");
              setIsConfirmPasswordError(false);
              setConfirmPasswordErrorMessage("");
            }}
            errorMessage={confirmPasswordErrorMessage}
          />
        </div>

        <div className="flex flex-col w-full">
          <MainButton
            text="변경하기"
            onClick={onClickChangePassword}
            disabled={
              currentPassword === "" ||
              newPassword === "" ||
              confirmPassword === "" ||
              confirmPasswordErrorMessage !== "" ||
              newPasswordErrorMessage !== "" ||
              currentPasswordErrorMessage !== ""
            }
          />
        </div>
      </div>
    </div>
  );
}
