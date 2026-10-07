"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";
import { GoogleIcon } from "@/components/icons";

export type GoogleProfile = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

// Optional convenience sign-in for the contact form: fills in name/email
// from the visitor's Google account instead of typing them. Submission
// still works without it — this never gates the form, only pre-fills it.
export default function GoogleSignInButton({
  onChange,
}: {
  onChange: (profile: GoogleProfile | null) => void;
}) {
  const [profile, setProfile] = useState<GoogleProfile | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    setIsPending(true);
    try {
      const auth = getClientAuth();
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const next: GoogleProfile = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      setProfile(next);
      onChange(next);
    } catch (err) {
      console.error("Google sign-in error", err);
      setError("Google 로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(getClientAuth());
    } catch (err) {
      console.error("Google sign-out error", err);
    }
    setProfile(null);
    onChange(null);
  };

  if (profile) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-brand-100 bg-brand-50/40 px-3 py-2">
        <div className="flex items-center gap-2 text-sm text-stone-700">
          {profile.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element -- external OAuth avatar, not worth next/image remote config for a 24px icon
            <img
              src={profile.photoURL}
              alt=""
              width={24}
              height={24}
              referrerPolicy="no-referrer"
              className="h-6 w-6 rounded-full"
            />
          )}
          <span>
            <span className="font-medium">{profile.displayName ?? profile.email}</span>{" "}
            계정으로 입력했어요
          </span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-xs font-medium text-stone-500 underline underline-offset-2 hover:text-stone-700"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleIcon className="h-4 w-4" />
        {isPending ? "로그인 중..." : "Google 계정으로 이름·이메일 자동 입력"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
