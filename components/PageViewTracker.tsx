"use client";

import { useEffect } from "react";
import * as fbq from "@/lib/fbpixel";

export default function PageViewTracker({
  contentName,
  contentCategory,
}: {
  contentName: string;
  contentCategory?: string;
}) {
  useEffect(() => {
    fbq.viewContent(contentName, contentCategory);
  }, [contentName, contentCategory]);

  return null;
}
