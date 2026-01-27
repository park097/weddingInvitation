"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";

type Entry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const seedEntries: Entry[] = [
  {
    id: "seed-1",
    name: "진호후배",
    message:
      "드디어 인생의 가장 아름다운 장이 펼쳐지는 순간이네요. 진심으로 축하해요!",
    createdAt: "2025.08.11",
  },
  {
    id: "seed-2",
    name: "영희",
    message: "두 분의 결혼을 진심으로 축하드립니다.",
    createdAt: "2025.08.11",
  },
];

export default function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>(seedEntries);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const previewEntries = useMemo(() => entries.slice(0, 3), [entries]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      return;
    }

    const now = new Date();
    const createdAt = `${now.getFullYear()}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

    setEntries((prev) => [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        message: message.trim(),
        createdAt,
      },
      ...prev,
    ]);

    setName("");
    setPassword("");
    setMessage("");
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <SectionCard className="">
      <Reveal className="mt-2 text-center serif text-xs tracking-[0.3em] text-neutral-500">
        GUESTBOOK
      </Reveal>
      <Reveal className="mt-2 text-center text-xl text-[#b57b5c]">
        방명록
      </Reveal>

      <div className="mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {previewEntries.map((entry) => (
            <Reveal key={entry.id} className="min-w-[160px] flex-none">
              <div className="relative h-[210px] w-[160px] rounded-2xl border border-neutral-200/70 bg-[#f8f0eb] p-4 text-center">
                <div className="flex items-start justify-between">
                  <span className="text-xs text-neutral-400">✿</span>
                  <button
                    type="button"
                    className="h-6 w-6 rounded-full border border-neutral-200 text-[10px] text-neutral-500"
                    onClick={() => handleDelete(entry.id)}
                    aria-label="방명록 삭제"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-4 text-sm text-neutral-700">
                  {entry.message}
                </p>
                <p className="absolute bottom-3 left-0 right-0 text-xs text-neutral-500">
                  - {entry.name} -
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-4 flex justify-end gap-4 text-sm">
        <button
          type="button"
          className="h-12 rounded-full border border-neutral-200 bg-white px-6 font-medium"
          onClick={() => setIsFormOpen(true)}
        >
          작성하기
        </button>
        <button
          type="button"
          className="h-12 rounded-full border border-neutral-200 bg-white px-6 font-medium"
          onClick={() => setIsListOpen(true)}
        >
          전체보기
        </button>
      </Reveal>

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <p className="text-sm font-medium">방명록 (축하 글) 작성</p>
              <button
                type="button"
                className="text-lg text-neutral-500"
                onClick={() => setIsFormOpen(false)}
              >
                ✕
              </button>
            </div>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm">
                <span className="text-neutral-700">이름</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm"
                  placeholder="이름을 입력해 주세요."
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-neutral-700">비밀번호</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-3 text-sm"
                  placeholder="비밀번호를 입력해 주세요."
                  type="password"
                />
              </label>
              <label className="block text-sm">
                <span className="text-neutral-700">내용</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm"
                  placeholder="내용을 작성해 주세요. (최대 500자)"
                  maxLength={500}
                  required
                />
              </label>
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-neutral-900 text-sm font-medium text-white"
              >
                신랑 & 신부에게 축하 글 전달하기
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {isListOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <p className="text-sm font-medium">방명록 (축하 글) 전체보기</p>
              <button
                type="button"
                className="text-lg text-neutral-500"
                onClick={() => setIsListOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-4 text-sm">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-neutral-200/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-neutral-800">
                        {entry.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        {entry.createdAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-neutral-200 text-xs text-neutral-500"
                      onClick={() => handleDelete(entry.id)}
                      aria-label="방명록 삭제"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
