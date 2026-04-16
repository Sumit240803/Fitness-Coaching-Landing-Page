"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitForm, type FormData } from "@/app/actions/submitForm";

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
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            value === opt
              ? "bg-[#111111] text-white border-[#111111]"
              : "bg-white text-[#444444] border-[#e8e8e8] hover:border-[#111111]"
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
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          aria-pressed={values.includes(opt)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            values.includes(opt)
              ? "bg-[#111111] text-white border-[#111111]"
              : "bg-white text-[#444444] border-[#e8e8e8] hover:border-[#111111]"
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
    <div className="flex flex-wrap gap-2 mt-2">
      {[...Array(10)].map((_, i) => {
        const num = String(i + 1);
        return (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            aria-pressed={value === num}
            className={`w-10 h-10 rounded-full text-sm font-medium border transition-all ${
              value === num
                ? "bg-[#111111] text-white border-[#111111]"
                : "bg-white text-[#444444] border-[#e8e8e8] hover:border-[#111111]"
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    const required: (keyof FormData)[] = [
      "name", "whatsapp", "ageHeightWeight", "profession", "startTimeline",
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

    setLoading(true);
    const result = await submitForm(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
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
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2
                  size={56}
                  className="text-[#d4a8a4] mx-auto mb-6"
                />
                <h3 className="font-heading text-2xl font-bold text-[#111111] mb-3">
                  Application Received!
                </h3>
                <p className="text-[#666666] text-base leading-relaxed">
                  Thank you for applying to The Reset Program. Shweta will
                  review your application and get back to you on WhatsApp
                  within 24–48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* 1. Name */}
                <div className={fieldClass}>
                  <label className={labelClass}>Your Name *</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>

                {/* 2. WhatsApp */}
                <div className={fieldClass}>
                  <label className={labelClass}>WhatsApp Number *</label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder="e.g. +1 234 567 8900"
                    value={formData.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                </div>

                {/* 3. Age / Height / Weight */}
                <div className={fieldClass}>
                  <label className={labelClass}>Age, Height &amp; Weight *</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={'e.g. 28 years, 5\'4", 72 kg'}
                    value={formData.ageHeightWeight}
                    onChange={(e) => set("ageHeightWeight", e.target.value)}
                  />
                </div>

                {/* 4. Profession & Routine */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What&apos;s your profession and how does your daily routine look? *
                  </label>
                  <textarea
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
                    name="startTimeline"
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
                    name="previousTraining"
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
                    name="fallOffReason"
                    options={fallOffOptions}
                    value={formData.fallOffReason}
                    onChange={(v) => set("fallOffReason", v)}
                  />
                </div>

                {/* 9. Workout time */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What time do you prefer to work out? *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Morning 7–8am, or evenings after 7pm"
                    value={formData.workoutTime}
                    onChange={(e) => set("workoutTime", e.target.value)}
                  />
                </div>

                {/* 10. Transformation goal */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What does your ideal 3–6 month transformation look like? *
                  </label>
                  <textarea
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
                  <PillRadio
                    name="investment"
                    options={investmentOptions}
                    value={formData.investment}
                    onChange={(v) => set("investment", v)}
                  />
                </div>

                {/* 13. Fitness struggle */}
                <div className={fieldClass}>
                  <label className={labelClass}>
                    What is your biggest fitness struggle right now? *
                  </label>
                  <textarea
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
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
                <p className="text-center text-xs text-[#999999]">
                  Shweta will personally review your application and reply
                  on WhatsApp within 24–48 hours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
