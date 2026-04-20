"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitForm, type FormData } from "@/app/actions/submitForm";
import * as fbq from "@/lib/fbpixel";

const startOptions = [
  "Immediately (within the next few days)",
  "Within the next 1–2 weeks",
  "Within the next month",
  "Just exploring for now",
];

const goalOptions = [
  "Fat loss",
  "Muscle gain",
  "Strength and performance",
  "Toning",
  "Lifestyle improvement",
];

const fallOffOptions = [
  "Lack of time",
  "Motivation drop",
  "No proper plan",
  "Stress and emotional eating",
];

const investmentOptions = [
  "₹12,000–₹20,000 (4–6 weeks)",
  "₹20,000–₹35,000 (8–12 weeks)",
  "₹35,000+ (12–16 weeks)",
  "Not in a position to invest right now",
];

function PillRadio({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2" role="radiogroup" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            value === opt
              ? "bg-[#111111] text-white border-[#111111]"
              : "bg-white text-[#1a1a1a] border-[#e8e8e8] hover:border-[#111111]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function PillCheckbox({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]
    );
  };
  return (
    <div className="flex flex-wrap gap-2 mt-2" role="group" aria-label="Select goals">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="checkbox"
          aria-checked={values.includes(opt)}
          onClick={() => toggle(opt)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            values.includes(opt)
              ? "bg-[#111111] text-white border-[#111111]"
              : "bg-white text-[#1a1a1a] border-[#e8e8e8] hover:border-[#111111]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SeriousnessScale({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2" role="radiogroup" aria-label="Seriousness scale 1 to 10">
      {[...Array(10)].map((_, i) => {
        const num = String(i + 1);
        return (
          <button
            key={num}
            type="button"
            role="radio"
            aria-checked={value === num}
            aria-label={`${num} out of 10`}
            onClick={() => onChange(num)}
            className={`w-10 h-10 rounded-full text-sm font-medium border transition-all ${
              value === num
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#1a1a1a] border-[#e8e8e8] hover:border-[#111111]"
            }`}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[#e8e8e8] bg-white text-[#111111] placeholder-[#aaaaaa] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition";

const textareaClass =
  "w-full px-4 py-3 rounded-xl border border-[#e8e8e8] bg-white text-[#111111] placeholder-[#aaaaaa] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent transition resize-none";

const labelClass = "block text-sm font-medium text-[#111111] mb-1";
const fieldClass = "space-y-1";

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    ageHeightWeight: "",
    profession: "",
    startTimeline: "",
    goals: [],
    previousTraining: "",
    fallOffReason: "",
    workoutTime: "",
    transformationGoal: "",
    seriousness: "",
    investment: "",
    fitnessStruggle: "",
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    const required: (keyof FormData)[] = [
      "name", "email", "whatsapp", "ageHeightWeight", "profession", "startTimeline",
      "previousTraining", "fallOffReason", "workoutTime",
      "transformationGoal", "seriousness", "investment", "fitnessStruggle",
    ];
    for (const field of required) {
      const val = formData[field];
      if (!val || (Array.isArray(val) ? val.length === 0 : val.trim() === "")) {
        setError("Please fill in all required fields.");
        return;
      }
    }
    if (formData.goals.length === 0) {
      setError("Please select at least one goal.");
      return;
    }

    // Validate WhatsApp number: at least 7 digits
    const digits = formData.whatsapp.replace(/[^0-9]/g, "");
    if (digits.length < 7 || digits.length > 15) {
      setError("Please enter a valid WhatsApp number (7–15 digits).");
      return;
    }

    setLoading(true);
    const result = await submitForm(formData);
    setLoading(false);

    if (result.success) {
      fbq.event("Lead", {
        content_name: "Application Form",
        content_category: "1:1 Coaching",
      });
      router.push("/thank-you");
    } else {
      setError(result.error);
    }
  };

  return (
    <section id="apply" className="bg-[#111111] py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
            The Reset Program
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white">
            Apply Now
          </h2>
          <p className="text-white/50 mt-4 text-base">
            Limited spots available. Tell us a little about yourself.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-10"
        >
          <AnimatePresence mode="wait">
            <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* 1. Name */}
                <div className={fieldClass}>
                  <label htmlFor="field-name" className={labelClass}>Your Name *</label>
                  <input
                    id="field-name"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>

                {/* 2. Email */}
                <div className={fieldClass}>
                  <label htmlFor="field-email" className={labelClass}>Email Address *</label>
                  <input
                    id="field-email"
                    type="email"
                    className={inputClass}
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>

                {/* 3. WhatsApp */}
                <div className={fieldClass}>
                  <label htmlFor="field-whatsapp" className={labelClass}>WhatsApp Number *</label>
                  <input
                    id="field-whatsapp"
                    type="tel"
                    className={inputClass}
                    placeholder="e.g. +1 234 567 8900"
                    pattern="\+?[0-9\s\-]{7,15}"
                    title="Enter a valid phone number (7-15 digits, optional + prefix)"
                    value={formData.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                </div>

                {/* 3. Age / Height / Weight */}
                <div className={fieldClass}>
                  <label htmlFor="field-ahw" className={labelClass}>Age, Height &amp; Weight *</label>
                  <input
                    id="field-ahw"
                    type="text"
                    className={inputClass}
                    placeholder={'e.g. 28 years, 5\'4", 72 kg'}
                    value={formData.ageHeightWeight}
                    onChange={(e) => set("ageHeightWeight", e.target.value)}
                  />
                </div>

                {/* 4. Profession & Routine */}
                <div className={fieldClass}>
                  <label htmlFor="field-profession" className={labelClass}>
                    What&apos;s your profession and how does your daily routine look? *
                  </label>
                  <textarea
                    id="field-profession"
                    rows={3}
                    className={textareaClass}
                    placeholder="e.g. Software engineer, WFH, sedentary most of the day..."
                    value={formData.profession}
                    onChange={(e) => set("profession", e.target.value)}
                  />
                </div>

                {/* 5. Start Timeline */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    When do you want to start? *
                  </label>
                  <PillRadio
                    label="When do you want to start"
                    options={startOptions}
                    value={formData.startTimeline}
                    onChange={(v) => set("startTimeline", v)}
                  />
                </div>

                {/* 6. Goals */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What are your main goals? (Select all that apply) *
                  </label>
                  <PillCheckbox
                    options={goalOptions}
                    values={formData.goals}
                    onChange={(v) => set("goals", v)}
                  />
                </div>

                {/* 7. Previous training */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    Have you done online training before? *
                  </label>
                  <PillRadio
                    label="Previous online training"
                    options={["Yes", "No"]}
                    value={formData.previousTraining}
                    onChange={(v) => set("previousTraining", v)}
                  />
                </div>

                {/* 8. Fall off reason */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What&apos;s the main reason you&apos;ve fallen off track before? *
                  </label>
                  <PillRadio
                    label="Reason for falling off track"
                    options={fallOffOptions}
                    value={formData.fallOffReason}
                    onChange={(v) => set("fallOffReason", v)}
                  />
                </div>

                {/* 9. Workout time */}
                <div className={fieldClass}>
                  <label htmlFor="field-workout" className={labelClass}>
                    What time do you prefer to work out? *
                  </label>
                  <input
                    id="field-workout"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Morning 7–8am, or evenings after 7pm"
                    value={formData.workoutTime}
                    onChange={(e) => set("workoutTime", e.target.value)}
                  />
                </div>

                {/* 10. Transformation goal */}
                <div className={fieldClass}>
                  <label htmlFor="field-transformation" className={labelClass}>
                    What does your ideal 3–6 month transformation look like? *
                  </label>
                  <textarea
                    id="field-transformation"
                    rows={3}
                    className={textareaClass}
                    placeholder="Describe the result you want to achieve..."
                    value={formData.transformationGoal}
                    onChange={(e) =>
                      set("transformationGoal", e.target.value)
                    }
                  />
                </div>

                {/* 11. Seriousness */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    On a scale of 1–10, how serious are you about making a change? *
                  </label>
                  <SeriousnessScale
                    value={formData.seriousness}
                    onChange={(v) => set("seriousness", v)}
                  />
                </div>

                {/* 12. Investment */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    Which investment range are you comfortable with? *
                  </label>
                  <p className="text-sm text-[#2a2a2a] leading-relaxed mt-1 mb-1">
                    Our coaching includes personalized nutrition guidance, structured workouts, and 1:1 live personal training sessions each week. Based on the level of support you&apos;re looking for, what investment range would you be comfortable with?
                  </p>
                  <PillRadio
                    label="Investment range"
                    options={investmentOptions}
                    value={formData.investment}
                    onChange={(v) => set("investment", v)}
                  />
                </div>

                {/* 13. Fitness struggle */}
                <div className={fieldClass}>
                  <label htmlFor="field-struggle" className={labelClass}>
                    What is your biggest fitness struggle right now? *
                  </label>
                  <textarea
                    id="field-struggle"
                    rows={3}
                    className={textareaClass}
                    placeholder="Be as specific as you can..."
                    value={formData.fitnessStruggle}
                    onChange={(e) => set("fitnessStruggle", e.target.value)}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#e8e8e8] accent-[#111111]"
                  />
                  <span className="text-xs text-[#2a2a2a] leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4a8a4] underline hover:text-[#111111]"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to my data being collected and used to process my
                    application.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !consent}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
                <p className="text-center text-xs text-[#1a1a1a]">
                  We will personally review your application and reply
                  on WhatsApp within 24–48 hours.
                </p>
              </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
