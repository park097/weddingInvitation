"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Account = {
  name: string;
  bank: string;
  number: string;
};

const groomAccounts: Account[] = [
  { name: "김진호", bank: "신한은행", number: "110-000-00000" },
  { name: "김건호", bank: "우리은행", number: "110-000-00000" },
  { name: "김아버지", bank: "국민은행", number: "110-000-00000" },
];

const brideAccounts: Account[] = [
  { name: "이나연", bank: "신한은행", number: "110-000-00000" },
  { name: "이주모", bank: "우리은행", number: "110-000-00000" },
  { name: "이수진", bank: "국민은행", number: "110-000-00000" },
];

export default function AccountSection() {
  const [openPanel, setOpenPanel] = useState<"groom" | "bride" | null>("groom");
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const panels = useMemo(
    () => [
      { id: "groom" as const, title: "신랑측", accounts: groomAccounts },
      { id: "bride" as const, title: "신부측", accounts: brideAccounts },
    ],
    []
  );

  const handleCopy = async (account: Account) => {
    const text = `${account.bank} ${account.number} (${account.name})`;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopyModalOpen(true);
    } catch (error) {
      window.alert("계좌번호 복사에 실패했습니다. 길게 눌러 복사해주세요.");
    }
  };

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-xs tracking-[0.3em] text-neutral-500">
        ACCOUNT
      </Reveal>
      <Reveal className="mt-2 text-xl text-[#b57b5c]">마음 전하실 곳</Reveal>
      <Reveal className="mt-4 text-sm leading-6 text-neutral-600">
        참석이 어려우신 분들을 위해 계좌번호를 준비했습니다.
        <br />
        버튼을 누르면 계좌번호가 복사됩니다.
      </Reveal>

      <div className="mt-6 space-y-3 text-left text-sm">
        {panels.map((panel) => {
          const isOpen = openPanel === panel.id;
          return (
            <div
              key={panel.id}
              className="ui-rounded overflow-hidden border border-neutral-200/70 bg-white"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                aria-expanded={isOpen}
              >
                <span>{panel.title}</span>
                <span className="text-neutral-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? (
                <div className="border-t border-neutral-200/70">
                  {panel.accounts.map((account) => {
                    const key = `${panel.id}-${account.name}-${account.number}`;

                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <div>
                          <p className="font-medium text-neutral-800">{account.name}</p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {account.bank} {account.number}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="ui-rounded h-9 border border-neutral-200 px-3 text-xs font-medium text-neutral-700"
                          onClick={() => handleCopy(account)}
                          aria-label={`${account.name} 계좌번호 복사`}
                        >
                          ⧉ 복사
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {isCopyModalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6" role="dialog" aria-modal="true">
          <div className="ui-rounded w-full max-w-[360px] bg-white px-6 py-7 text-center shadow-2xl">
            <p className="text-sm text-neutral-800">복사가 완료되었습니다.</p>
            <button
              type="button"
              className="ui-rounded mt-5 inline-flex h-10 min-w-[88px] items-center justify-center bg-[#efe3e6] px-4 text-sm font-medium text-neutral-800"
              onClick={() => setIsCopyModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}

