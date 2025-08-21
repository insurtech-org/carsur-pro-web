"use client";

import BackHeader from "@/components/common/BackHeader";
import { useRouter } from "next/navigation";

export default function PersonalPage() {
  const router = useRouter();
  return (
    <>
      <BackHeader
        title="개인정보 수집 이용 동의"
        onBack={() => router.replace("/mypage/terms")}
      />
      <div className="h-full bg-bg-normal text-primary-normal z-11">
        <div className="overflow-auto h-[calc(100%-52px)] px-5 py-7 text-[15px]">
          <h3 className="font-bold">1. 개인정보 보호와 처리방침</h3>
          <ol className="ml-5 list-decimal">
            <li>
              “슈어테크 주식회사 개인정보 처리방침”이란 이용자의 소중한
              개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
              있도록 슈어테크 주식회사 (이하 “회사”라 함)를 운영함에 있어
              준수해야 할 지침을 의미하며, 회사는 대한민국의 개인정보보호 규정
              및 가이드라인을 준수하고 있습니다.
            </li>
            <li>
              회사는 이용자의 ʻ동의를 기반으로 개인정보를 수집·이용 및 제공’
              하고 있으며, ʻ이용자의 권리(개인정보 자기결정권)를 적극적으로
              보장’ 합니다.
            </li>
            <li>
              본 개인정보 처리방침은 회사가 운영하는 서비스에서 적용되는 것을
              원칙으로 하며 본 개인정보 처리방침은 대한민국 법령에 의하여
              규정되고 해석됩니다.
            </li>
          </ol>
          <br />

          <h3 className="font-bold">2. 개인정보 수집 항목 및 방법</h3>
          <p>
            모든 이용자는 회사가 제공하는 서비스를 이용할 수 있고, 회사의 다양한
            서비스를 제공받을 수 있습니다. 그리고 이때 회사는 다음의 원칙하에
            이용자의 개인정보를 수집하고 있습니다.
          </p>
          <p>
            회사는 서비스 제공에 필요한 최소한의 개인 정보를 수집하고 있습니다.
          </p>
          <p>
            서비스 제공에 따른 구체적인 개인정보 수집 항목은 다음과 같습니다.
          </p>
          <br />

          <p className="font-bold">[개인정보 수집 항목]</p>
          <table className="table-auto border border-black w-full text-xs sm:text-base text-center leading-tight">
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[40%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead className="bg-gray-300 font-semibold">
              <tr>
                <th className="border border-black px-2 py-1 whitespace-normal break-words">
                  수집 시점
                </th>
                <th className="border border-black px-2 py-1 whitespace-normal break-words">
                  수집 항목
                </th>
                <th className="border border-black px-2 py-1 whitespace-normal break-words">
                  수집 및 이용목적
                </th>
                <th className="border border-black px-2 py-1 whitespace-normal break-words">
                  이용 기간
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  서비스 신청
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  이름,휴대폰번호,차량정보(차량번호,차량모델,배기량,연식,사고부위),예약정보(이용지역,예약희망일자)
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  차량 수리 공업사 연결 서비스 이용 제공, 불만처리
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  삭제 요청시까지
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  서비스 이용 중 자동 수집되는 정보
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  쿠키, IP address, 방문 일시, 서비스 이용기록, 불만 및 분쟁
                  처리 기록,이용자의 사용 OS
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  서비스 이용 통계, 불법 / 부정이용 방지
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  삭제 요청시까지
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  광고 전송 및 마케팅 활용
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  이름, 휴대폰번호
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  프로모션 및 이벤트 정보 동의 전달 및 참여 기회 제공, 맞춤형
                  광고 전송 등 마케팅 목적의 활용, 설문조사 등
                </td>
                <td className="border border-black px-2 py-1 whitespace-normal break-words">
                  삭제 요청시까지
                </td>
              </tr>
            </tbody>
          </table>
          <br />

          <p className="font-bold">[개인정보 수집 방법]</p>
          <ol className="ml-5 list-decimal">
            <li>
              서비스 이용, 전화, 회원센터 등의 방법으로 개인정보를 수집합니다.
            </li>
            <li>회사는 민감 정보를 수집하지 않습니다.</li>
            <li>
              회사는 이용자의 소중한 인권을 침해할 우려가 있는 민감한 정보(인종,
              사상 및 신조, 정치적 성향 이나 범죄기록, 의료정보 등)는 어떠한
              경우에도 수집하지 않으며, 만약 법령에서 정한 의무에 따라
              불가피하게 수집하는 경우에는 반드시 이용자에게 사전 동의를
              거치겠습니다.
              <br />
              다만, 해당 정보는 이용자가 확인한 시점을 기준으로 한 정보이며,
              이용자의 개인정보를 추가 수집하는 경우에는 반드시 사전에
              이용자에게 해당 사실을 알리고 동의를 거치겠습니다.
            </li>
          </ol>
          <br />

          <h3 className="font-bold">3. 개인정보 이용 목적</h3>
          <ol className="ml-5 list-decimal">
            <li>
              회사는 이용자의 소중한 개인정보를 다음과 같은 목적으로만 이용하며,
              목적이 변경될 경우에는 사전에 이용자의 동의를 구하도록 하겠습니다.
            </li>
            <li>
              기기의 고유한 번호로 이용자를 식별하고, 불량 회원의 부정한 이용을
              방지하기 위하여 사용합니다.
            </li>
            <li>
              이용자에게 회사의 다양한 서비스를 제공하고 서비스 이용 과정에서
              이용자의 문의 사항이나 불만을 처리하고 공지사항 등을 전달하기 위해
              사용합니다.
            </li>
            <li>
              신규 서비스가 개발되거나 이벤트 행사 시 참여 기회를 알리기 위한
              정보 전달 및 마케팅, 광고 등에도 사용됩니다.
            </li>
            <li>
              이용자의 이용 패턴과 접속 빈도 분석 및 서비스 이용에 대한 통계 및
              이를 통한 맞춤형 서비스 제공 및 서비스 개선에도 사용됩니다.
            </li>
          </ol>
          <br />

          <h3 className="font-bold">4. 개인정보 보유 및 이용기간</h3>
          <p>
            회사는 이용자의 개인정보를 서비스 이용 시작일부터 서비스를 제공하는
            기간 동안에만 제한적으로 이용하고 있습니다. 이용자가 개인정보 삭제를
            요청하거나 제공한 개인정보의 수집 및 이용에 대한 동의를 철회하는
            경우, 또는 수집 및 이용목적이 달성되거나 보유 및 이용기간이 종료한
            경우 해당 이용자의 개인정보는 지체 없이 파기됩니다. 그리고 관계
            법령의 규정에 따라 일정한 기간 동안 회원정보를 보관하며 자세한
            내용은 아래와 같습니다.
          </p>

          <p className="font-bold mt-2">
            •소비자의 불만 및 분쟁처리에 관한 기록
          </p>
          <ul className="ml-10 list-disc">
            <li>보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률</li>
            <li>보존 기간 : 3년</li>
          </ul>

          <p className="font-bold mt-2">
            •대금결제 및 재화 등의 공급에 관한 기록
          </p>
          <ul className="ml-10 list-disc">
            <li>
              보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률 제6조 및
              시행령 제6조
            </li>
            <li>보존 기간 : 5년</li>
          </ul>

          <p className="font-bold mt-2">•접속에 관한 기록</p>
          <ul className="ml-10 list-disc">
            <li>보존 근거 : 통신비밀보호법 제15조의2 및 시행령 제41조</li>
            <li>보존 기간 : 3개월</li>
          </ul>

          <p className="font-bold mt-2">•부정거래기록</p>
          <ul className="ml-10 list-disc">
            <li>보존 근거부정거래의 배제 등 회사 방침에 의한 보존</li>
            <li>보존 기간 : 5년</li>
          </ul>
          <br />

          <h3 className="font-bold">5. 개인정보 제3자 제공</h3>
          <p>
            회사는 원칙적으로 이용자의 사전 동의 없이 개인정보를 제3자에게
            제공하지 않으며, 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른
            동의를 받고 있습니다. 다만 다음의 경우는 예외로 하고 있습니다.
          </p>
          <p className="mt-1">
            {" "}
            - 이용자가 사전에 공개하거나 또는 제 3자 제공에 동의한 경우입니다.
          </p>
          <p>
            {" "}
            - 법원 등 국가 기관이 법령에 근거하여 이용자의 개인정보를 제공하도록
            강제한 경우입니다.
          </p>
          <p>
            {" "}
            - 회사는 서비스 제공을 위해서 아래와 같이 이용자의 동의를 받아
            제3자에게 개인정보를 제공하는 경우, 업무를 위탁 또는 제휴하는 경우,
            관계 법령에 따라 위탁 및 제휴 계약 시 제공하는 개인정보가 안전하게
            관리될 수 있도록 필요한 사항을 규정하고 있습니다.
          </p>
          <p>
            {" "}
            - 회사는 개인정보 제3자 제공 공유 대상 및 위탁 및 제휴 업무 내용은
            아래와 같습니다.
          </p>
          <p>
            {" "}
            - 다만, 이용자는 관련 법에 따라 수집한 개인정보의 업무 위탁에 따른
            제공 동의를 거부할 권리가 있으며, 미 동의 시 서비스 이행을 위한 위탁
            업체 제공이 불가능하여 서비스 제한을 받을 수 있습니다.
          </p>
          <p>
            - 회사는 이용자의 개인정보에 대해 “개인정보 수집이용 목적이 달성”된
            후에는 정보를 재생할 수 없는 기술적인 방법을 이용하여 완전하게
            삭제하게 되고, 종이로 출력된 개인정보는 분쇄하거나 소각하여 지체
            없이 파기함을 약속합니다.
          </p>
          <br />

          <h3 className="font-bold">6. 개인정보 업무위탁</h3>
          <p>
            회사는 서비스 제공을 위해서 아래와 같이 개인정보를 위탁하고 있으며,
            관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록
            필요한 사항을 규정하고 있습니다.
          </p>
          <p className="mt-1">
            회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.
          </p>
          <div className="overflow-x-auto mt-2">
            <table className="table-auto border border-black w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-300 font-semibold">
                  <th className="border border-black px-4 py-2">수탁업체</th>
                  <th className="border border-black px-4 py-2">위탁내용</th>
                  <th className="border border-black px-4 py-2">
                    개인정보의 보유 및 이용기간
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black px-4 py-2">기업은행</td>
                  <td className="border border-black px-4 py-2">
                    결제처리(가상계좌 입금) 및 환불처리
                  </td>
                  <td className="border border-black px-4 py-2">
                    위탁 계약 만료 시까지 보유
                  </td>
                </tr>
                <tr>
                  <td className="border border-black px-4 py-2">솔라피(주)</td>
                  <td className="border border-black px-4 py-2">알림톡 발송</td>
                  <td className="border border-black px-4 py-2">
                    위탁 계약 만료 시까지 보유
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />

          <h3 className="font-bold">7. 개인정보 파기</h3>
          <p>
            회사는 이용자의 개인정보에 대해 “개인정보의 수집·이용 목적이 달성”된
            후에는 해당 정보를 재생할 수 없는 기술적인 방법을 이용하여 완전하게
            삭제하게 되고, 종이로 출력된 개인정보는 분쇄하거나 소각하여 지체
            없이 파기함을 약속합니다.
          </p>
          <br />

          <h3 className="font-bold">8. 만 14세 미만 아동의 개인정보보호</h3>
          <p>
            회사가 운영하는 사이트에서는 만 14세 미만 아동의 경우 서비스 이용이
            불가능합니다.
          </p>
          <br />

          <h3 className="font-bold">9. 개인위치정보의 처리</h3>
          <p>
            회사는 아래와 같이 “위치기반서비스" 제공을 위하여 고객의
            개인위치정보를 처리하고 있습니다.
          </p>
          <ol className="ml-5 list-decimal mt-1">
            <li>
              위치기반서비스 이용약관 제4조에 따른 서비스의 제공을 위해
              개인위치정보를 보유할 수 있습니다.
            </li>
            <p> - 항목 : 상세사항</p>
            <p>
              {" "}
              - 처리 목적: 고객 위치 정보를 이용한 공업사 연결 설정 서비스 제공
            </p>
            <p>
              {" "}
              - 보유 및 이용 기간: 수집·이용 및 처리 후 저장 및 보유하지 않음
            </p>
            <p>
              {" "}
              - 이용, 제공사실 확인자료의 보유근거 및 보유기간 : 6개월 이상
              (위치정보의 보호 및 이용등에 관한 법률 제16조제2항)
            </p>
            <p>
              {" "}
              - 파기 절차 및 방법: 본 처리방침 제6조에 명시 (개인 위치 정보는
              처리 후 저장하지 않음).
            </p>
            <p>
              {" "}
              - 통보에 관한 사항 : 개인위치정보주체가 지정하는 제3자에 대한
              제공을 하지 않으며(관련 서비스 없음) 향후 관련서비스 제공 시
              개인위치정보를 수집한 단말장치로 매회 이용자에게 통보합니다.
              (제공받는자, 제공일시, 제공목적) 다만, 아래의 경우에는 정보주체가
              지정한 수단으로 통보합니다.
            </p>
            <ul className="ml-10 list-disc mt-1">
              <li>단말장치가 문자 등의 수신기능이 없을 경우</li>
              <li>
                정보주체가 별도의 단말장치 또는 전자우편으로 통보를 요청한 경우
              </li>
            </ul>
            <p>
              {" "}
              - 8세 이하의 아동 등의 보호의무자 권리의무 및 행사방법 : 아래의
              경우에 해당하는 이용자(이하 “8세 이하의 아동 등”이라 함)의
              보호의무자가 8세 이하의 아동 등의 생명 또는 신체보호를 위하여
              개인위치정보의 이용 또는 제공에 동의하는 경우에는 본인의 동의가
              있는 것으로 간주합니다.
            </p>
            <ul className="ml-10 list-disc mt-1">
              <li>8세 이하의 아동</li>
              <li>피성년후견인</li>
              <li>
                장애인복지법 제2조제2항제2호의 규정에 의한 정신적 장애를 가진
                자로서 장애인고용촉진 및 직업재활법 제2조제2호의 규정에 의한
                중증장애인에 해당하는 자(장애인복지법 제32조의 규정에 의하여
                장애인등록을 한 사람에 한정)
              </li>
            </ul>
          </ol>
          <br />

          <p className="font-bold">
            8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의
            이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에
            보호의무자임을 증명하는 서면을 첨부하여 회사에 제출해야 합니다.
            보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에
            동의하는 경우 개인위치정보주체 권리의 전부를 행사할 수 있습니다.
          </p>
          <br />

          <h3 className="font-bold">10. 이용자의 권리</h3>
          <p>
            회사는 서비스 이용에 대해, 이용자의 권리를 다음과 같이 보호하고
            있습니다.
          </p>
          <ul className="ml-5 list-decimal">
            <li>
              언제든지 등록되어 있는 자신의 개인정보를 조회하고 삭제할 수
              있습니다. 다만, 그러한 경우 해당 서비스의 일부 또는 전부 이용이
              어려울 수 있습니다.
            </li>
            <li>
              언제든지 개인정보 제공에 관한 동의 철회를 요청할 수 있습니다.
            </li>
            <li>
              이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을
              완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다. 또한
              잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리 결과를
              제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
            </li>
            <li>
              회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된
              개인정보는 "개인정보의 보유 및 이용기간"에 명시된 바에 따라
              처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고
              있습니다.
            </li>
          </ul>
          <br />

          <h3 className="font-bold">
            11. 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한
            사항
          </h3>
          <p>
            회사는 회원에게 특화된 맞춤서비스를 제공하기 위해서 회원의 정보를
            저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는
            웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게
            보내는 작은 텍스트 파일로 이용자들의 PC 컴퓨터 내의 하드디스크에
            저장되기도 합니다.
          </p>
          <p>
            쿠키의 설치/운영 및 거부 회원은 쿠키 설치에 대한 선택권을 가지고
            있습니다. 따라서, 회원은 브라우저에서 옵션을 설정함으로써 모든
            쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든
            쿠키의 저장을 거부할 수도 있습니다.
          </p>
          <ul className="ml-10 mt-1 list-disc">
            <li>
              {`인터넷 익스플로러의 경우 : 웹 브라우저 상단의 도구 > 인터넷 옵션 >
            개인정보`}
            </li>
            <li>
              {`구글 크롬의 경우 : 웹 브라우저 상단의 설정 > 고급 설정 >
            개인정보다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 서비스는
            이용할 수 없습니다. Google Analytics를 활용하여 이용자의 서비스
            이용에 대해 분석 합니다. Google Analytics은 이용자의 사이트 활용
            방식을 이해하는데 도움을 주는 웹로그 분석 도구입니다. 개별 이용자의
            개인 정보를 식별하지 않고 익명의 사용자 정보를 활용하여 웹사이트
            사용 통계를 보고하기 위해 쿠키를 사용할 수 있습니다.Web분석을
            해제하려면 Opt-out Browser Add-on(박스 텍스트 하이퍼링크 주소 :
            https://tools.google.com/dlpage/gaoptout)을 설치해야 합니다.`}
            </li>
          </ul>
          <br />

          <h3 className="font-bold">12. 링크 사이트에 대한 책임</h3>
          <p>
            회사는 이용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다.
            다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는
            본 "개인정보 처리방침"이 적용되지 않습니다.
          </p>
          <br />

          <h3 className="font-bold">13. 개인정보의 기술적/관리적 보호 대책</h3>
          <p>
            회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난,
            누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
            기술적/관리적 대책을 강구하고 있습니다.
          </p>
          <ul className="ml-5 list-decimal">
            <li>
              비밀번호 암호화회원 비밀번호는 암호화되어 저장 및 관리되고 있어
              본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를 알고
              있는 본인에 의해서만 가능합니다.
            </li>
            <li>
              해킹 등에 대비한 대책회사는 해킹이나 컴퓨터 바이러스 등에 의해
              회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고
              있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고,
              최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가
              누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여
              네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.
              그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고
              있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든
              기술적 장치를 갖추려 노력하고 있습니다.
            </li>
            <li>
              취급 직원의 최소화 및 교육회사의 개인정보관련 취급 직원은 담당자에
              한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로
              갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 개인정보
              처리방침의 준수를 항상 강조하고 있습니다.
            </li>
            <li>
              개인정보보호 전담기구의 운영사내 개인정보보호 전담기구 등을 통하여
              개인정보 처리방침의 이행사항 및 담당자의 준수여부를 확인하여
              문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고
              있습니다. 단, 이용자 본인의 부주의나 인터넷상의 문제로 ID,
              비밀번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의
              책임을 지지 않습니다.
            </li>
          </ul>
          <br />

          <h3 className="font-bold">14. 개인정보 관리 책임자 및 담당부서</h3>
          <p>책임자: 김수환 부장</p>
          <p>전화: 1555-4473</p>
          <p>문의: swkim@insurtech.co.kr</p>
          <p>
            또한 개인정보가 침해되어 이에 대한 신고나 상담이 필요하신 경우에는
            아래 기관에 문의하셔서 도움을 받으실 수 있습니다.
          </p>
          <ul className="ml-5 mt-1 list-disc">
            <li>
              개인정보분쟁조정위원회: (국번없이) 1833-6972
              (https://www.kopico.go.kr)
            </li>
            <li>
              개인정보침해 신고센터: (국번없이) 118 (https://privacy.kisa.or.kr)
            </li>
            <li>
              대검찰청 사이버수사과: (국번없이) 1301 (https://www.spo.go.kr)
            </li>
            <li>
              경찰청 사이버안전국: (국번없이) 182 (
              https://cyberbureau.police.go.kr)
            </li>
          </ul>
          <br />

          <h3 className="font-bold">15. 시행일</h3>
          <p>이 {"<개인정보 처리방침>"}은 2025년 2월 10일부터 적용됩니다.</p>
          <ul className="list-disc ml-5 mt-1">
            <li>개인정보 처리방침 버전번호: 1.0</li>
            <li>개인정보 처리방침 시행일자: 2025년 2월 10일</li>
          </ul>
          <br />
        </div>
      </div>
    </>
  );
}
