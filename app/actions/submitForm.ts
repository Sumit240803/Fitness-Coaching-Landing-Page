"use server";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FormData {
  name: string;
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
    return { success: true };
  } catch (err) {
    console.error("Firestore submission error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
