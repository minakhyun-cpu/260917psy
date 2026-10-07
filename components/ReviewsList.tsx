"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  Timestamp,
} from "firebase/firestore";
import { getClientDb } from "@/lib/firebaseClient";
import type { ReviewRecord } from "@/types/review";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsList() {
  const [reviews, setReviews] = useState<ReviewRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const db = getClientDb();
    const q = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
      limit(50),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setReviews(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt as Timestamp | undefined;
            return {
              id: doc.id,
              name: data.name as string,
              rating: data.rating as number,
              content: data.content as string,
              createdAt: (createdAt?.toDate() ?? new Date()).toISOString(),
            };
          }),
        );
      },
      (err) => {
        console.error("reviews onSnapshot error", err);
        setLoadError("후기를 불러오지 못했습니다.");
      },
    );

    return () => unsubscribe();
  }, []);

  if (loadError) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {loadError}
      </p>
    );
  }

  if (reviews === null) {
    return <p className="text-sm text-stone-500">후기를 불러오는 중...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-stone-500">
        아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
