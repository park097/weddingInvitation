"use client";

import { useState } from "react";
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
  { name: "이미자", bank: "국민은행", number: "110-000-00000" },
];

const brideAccounts: Account[] = [
  { name: "이나은", bank: "신한은행", number: "110-000-00000" },
  { name: "이주명", bank: "우리은행", number: "110-000-00000" },
  { name: "유수지", bank: "국민은행", number: "110-000-00000" },
];

export default function AccountSection() {
  const [openPanel, setOpenPanel] = useState<"groom" | "bride" | null>("groom");

  const panels = [
    { id: "groom" as const, title: "신랑측", accounts: groomAccounts },
    { id: "bride" as const, title: "신부측", accounts: brideAccounts },
  ];

  return (
    <SectionCard className="text-center">
      <Reveal className="serif text-xs tracking-[0.3em] text-neutral-500">
        ACCOUNT
      </Reveal>
      <Reveal className="mt-2 text-xl text-[#b57b5c]">마음 전하실 곳</Reveal>
      <Reveal className="mt-4 text-sm leading-6 text-neutral-600">
        참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다.
        <br />
        너그러운 마음으로 양해 부탁드립니다.
      </Reveal>

      <div className="mt-6 space-y-3 text-left text-sm">
        {panels.map((panel) => {
          const isOpen = openPanel === panel.id;
          return (
            <div
              key={panel.id}
              className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                aria-expanded={isOpen}
              >
                <span>{panel.title}</span>
                <span className="text-neutral-400">{isOpen ? "▴" : "▾"}</span>
              </button>
              {isOpen ? (
                <div className="border-t border-neutral-200/70">
                  {panel.accounts.map((account) => (
                    <div
                      key={`${panel.id}-${account.name}`}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-neutral-800">
                          {account.name}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {account.bank} {account.number}
                        </p>
                      </div>
                      <button className="h-8 w-8 rounded-full border border-neutral-200 text-xs">
                        ✿
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
