"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import Reveal from "@/components/Reveal";
import SectionCard from "@/components/SectionCard";
import { db } from "@/lib/firebase";

type Entry = {
  id: string;
  name: string;
  message: string;
  password: string | null;
  createdAtLabel: string;
  createdAtMs: number;
};

type FirestoreEntry = {
  name?: string;
  message?: string;
  password?: string | null;
  createdAt?: Timestamp | null;
};

const entriesRef = collection(db, "guestbookEntries");

const formatDateLabel = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}년 ${mm}월 ${dd}일`;
};

const mapDocToEntry = (id: string, data: FirestoreEntry): Entry => {
  const createdAtDate = data.createdAt?.toDate?.() ?? new Date(0);
  return {
    id,
    name: data.name?.trim() || "익명",
    message: data.message?.trim() || "",
    password: data.password ?? null,
    createdAtLabel: formatDateLabel(createdAtDate),
    createdAtMs: createdAtDate.getTime(),
  };
};

export default function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Entry | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const q = query(entriesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const next = snapshot.docs.map((d) => mapDocToEntry(d.id, d.data()));
        next.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setEntries(next);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const previewEntries = useMemo(() => entries.slice(0, 6), [entries]);

  const resetForm = () => {
    setName("");
    setPassword("");
    setMessage("");
    setFormError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setFormError("이름과 내용을 입력해주세요.");
      return;
    }

    try {
      setFormError(null);
      await addDoc(entriesRef, {
        name: trimmedName,
        message: trimmedMessage,
        password: password.trim() || null,
        createdAt: serverTimestamp(),
      });
      resetForm();
      setIsFormOpen(false);
      setFeedbackMessage("저장되었습니다");
    } catch {
      setFormError("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const openDeleteModal = (entry: Entry) => {
    setDeleteTarget(entry);
    setDeletePassword("");
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteError(null);
      const ref = doc(db, "guestbookEntries", deleteTarget.id);
      const snap = await getDoc(ref);
      const data = snap.data() as FirestoreEntry | undefined;
      const savedPassword = (data?.password ?? null) || null;

      if (savedPassword && savedPassword !== deletePassword.trim()) {
        setDeleteError("비밀번호가 일치하지 않습니다.");
        return;
      }

      await deleteDoc(ref);
      setDeleteTarget(null);
      setDeletePassword("");
      setFeedbackMessage("삭제되었습니다");
    } catch {
      setDeleteError("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <SectionCard>
      <Reveal className="mt-4 text-center serif text-xs tracking-[0.3em] text-neutral-500">
        GUESTBOOK
      </Reveal>
      <Reveal className="mt-2 text-center text-xl text-[#b57b5c]">방명록</Reveal>

      <Reveal className="mt-6">
        <div className="space-y-3">
          {isLoading ? (
            <div className="py-6 text-center text-sm text-neutral-500">불러오는 중...</div>
          ) : previewEntries.length === 0 ? (
            <div className="py-6 text-center text-sm text-neutral-500">첫 메시지를 남겨주세요.</div>
          ) : (
            previewEntries.map((entry) => (
              <div key={entry.id} className="ui-rounded border border-neutral-200/80 bg-white px-4 py-4 shadow-[0_6px_18px_rgba(20,18,16,0.04)]">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-neutral-900">{entry.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-neutral-400">{entry.createdAtLabel}</p>
                    <button
                      type="button"
                      className="text-sm text-neutral-400"
                      onClick={() => openDeleteModal(entry)}
                      aria-label="방명록 삭제"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
                  {entry.message}
                </p>
              </div>
            ))
          )}
        </div>
      </Reveal>

      <Reveal className="mt-4 flex justify-end gap-2 text-sm">
        <button
          type="button"
          className="h-11 ui-rounded border border-neutral-200 bg-white  px-6 font-medium"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          등록하기
        </button>
        <button
          type="button"
          className="h-11 ui-rounded border border-neutral-200 bg-white px-6 font-medium"
          onClick={() => setIsListOpen(true)}
        >
          전체보기
        </button>
      </Reveal>

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center  translate-y-320 justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[420px] ui-rounded bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <p className="text-sm font-medium">방명록 등록</p>
              <button
                type="button"
                className="text-lg text-neutral-500"
                onClick={() => setIsFormOpen(false)}
                aria-label="방명록 등록 닫기"
              >
                ×
              </button>
            </div>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm">
                <span className="text-neutral-700">이름</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full ui-rounded border border-neutral-200 px-3 text-sm"
                  placeholder="이름을 입력해주세요"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-neutral-700">비밀번호 (삭제용)</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 h-11 w-full ui-rounded border border-neutral-200 px-3 text-sm"
                  placeholder="삭제할 때 사용할 비밀번호"
                  type="password"
                />
              </label>
              <label className="block text-sm">
                <span className="text-neutral-700">내용</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-2 min-h-[120px] w-full ui-rounded border border-neutral-200 px-3 py-2 text-sm"
                  placeholder="축하 메시지를 남겨주세요 (최대 500자)"
                  maxLength={500}
                  required
                />
              </label>
              {formError ? <p className="text-sm text-red-500">{formError}</p> : null}
              <button
                type="submit"
                className="h-12 w-full ui-rounded bg-neutral-900 text-sm font-medium text-white"
              >
                등록하기
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {isListOpen ? (
        <div className="fixed inset-0 z-50 flex items-center  translate-y-300 justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[420px] ui-rounded bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <p className="text-sm font-medium">방명록 전체보기</p>
              <button
                type="button"
                className="text-lg text-neutral-500"
                onClick={() => setIsListOpen(false)}
                aria-label="방명록 전체보기 닫기"
              >
                ×
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1 text-sm hide-scrollbar">
              {entries.map((entry) => (
                <div key={entry.id} className="ui-rounded border border-neutral-200/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-neutral-900">{entry.name}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xs text-neutral-400">{entry.createdAtLabel}</p>
                      <button
                        type="button"
                        className="text-sm text-neutral-400"
                        onClick={() => openDeleteModal(entry)}
                        aria-label="방명록 삭제"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-neutral-700">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-[60] flex items-center translate-y-300 justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[360px] ui-rounded bg-white p-6 text-center shadow-2xl">
            <p className="text-sm font-medium text-neutral-800">방명록을 삭제할까요?</p>
            <p className="mt-1 text-xs text-neutral-500">등록 시 입력한 비밀번호를 입력해주세요.</p>
            <input
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              type="password"
              className="mt-4 h-11 w-full ui-rounded border border-neutral-200 px-3 text-sm"
              placeholder="비밀번호"
            />
            {deleteError ? <p className="mt-2 text-sm text-red-500">{deleteError}</p> : null}
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="h-11 flex-1 ui-rounded border border-neutral-200 text-sm font-medium text-neutral-700"
                onClick={() => setDeleteTarget(null)}
              >
                취소
              </button>
              <button
                type="button"
                className="h-11 flex-1 ui-rounded bg-neutral-900 text-sm font-medium text-white"
                onClick={handleDeleteConfirm}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {feedbackMessage ? (
        <div className="fixed inset-0 z-[60] flex items-center translate-y-300 justify-center bg-black/50 px-6" role="dialog" aria-modal="true">
          <div className="ui-rounded w-full max-w-[360px] bg-white px-6 py-7 text-center shadow-2xl">
            <p className="text-sm text-neutral-800">{feedbackMessage}</p>
            <button
              type="button"
              className="ui-rounded mt-5 inline-flex h-10 min-w-[88px] items-center justify-center bg-[#efe3e6] px-4 text-sm font-medium text-neutral-800"
              onClick={() => setFeedbackMessage(null)}
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
