"use server";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  ageHeightWeight: string;
  profession: string;
  startTimeline: string;
  goals: string[];
  previousTraining: string;
  fallOffReason: string;
  workoutTime: string;
  transformationGoal: string;
  seriousness: string;
  investment: string;
  fitnessStruggle: string;
}

export type FormResult =
  | { success: true }
  | { success: false; error: string };

export async function submitForm(data: FormData): Promise<FormResult> {
  try {
    await addDoc(collection(db, "applications"), {
      ...data,
      submittedAt: serverTimestamp(),
    });

    // Send confirmation email (non-blocking – don't fail the form if email fails)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          goals: data.goals,
        }),
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Firestore submission error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
