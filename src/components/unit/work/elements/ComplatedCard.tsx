"use client";

const ComplatedCard = ({ data }: { data: any }) => {
  return (
    <div
      className="flex flex-col items-start self-stretch bg-bg-normal p-4 mx-5 gap-6 rounded-xl border border-solid border-neutral-100"
      style={{
        boxShadow: "0px 4px 20px #0A0C1112",
      }}
    >
      <div className="w-full">
        <div className="justify-center text-neutral-800 text-lg font-semibold mb-6">
          청구가 완료되었어요
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-primary-normal text-base font-medium">
            청구 금액
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-700 text-base font-regular">
              공임비
            </div>
            <div className="flex justify-start items-center gap-0.5">
              <div className="text-right justify-start text-primary-normal text-base font-medium">
                {data.laborPrice.toLocaleString()}
              </div>
              <div className="text-right justify-center text-neutral-500 text-sm font-normal">
                원
              </div>
            </div>
          </div>
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-700 text-base font-regular">
              부품비
            </div>
            <div className="flex justify-start items-center gap-0.5">
              <div className="text-right justify-start text-primary-normal text-base font-medium">
                {data.partsPrice.toLocaleString()}
              </div>
              <div className="text-right justify-center text-neutral-500 text-sm font-normal">
                원
              </div>
            </div>
          </div>

          <div className="self-stretch h-0.5 bg-line-alternative" />

          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-700 text-base font-regular">
              총 수리비(VAT포함)
            </div>
            <div className="flex justify-start items-center gap-0.5">
              <div className="text-right justify-start text-primary-normal text-base font-medium">
                {data.price.toLocaleString()}
              </div>
              <div className="text-right justify-center text-neutral-500 text-sm font-normal">
                원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplatedCard;
