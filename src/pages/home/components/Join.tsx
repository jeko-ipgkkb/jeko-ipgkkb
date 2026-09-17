import { useState, type FormEvent } from "react";
import Reveal from "@/components/base/Reveal";

const FORM_ENDPOINT = "https://readdy.ai/api/form/dalkhsguus3pn58u9ckg";

const benefits = [
  {
    icon: "ri-trophy-line",
    title: "Compete & Represent",
    text: "Join faculty teams, inter-campus tournaments and sporting events all year round.",
  },
  {
    icon: "ri-team-line",
    title: "Lead & Grow",
    text: "Build leadership, teamwork and event management skills that shape great educators.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Stay Active",
    text: "Access regular training, fitness sessions and a community that keeps you moving.",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function Join() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const honeypot = String(data.get("website_alt") ?? "").trim();
    if (honeypot) {
      setStatus("success");
      form.reset();
      return;
    }
    data.delete("website_alt");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      const responseText = await response.text();
      let parsed: {
        code?: string;
        message?: string;
        meta?: { message?: string; detail?: string };
      } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const serverMessage =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;

      if (response.ok && parsed?.code === "OK") {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(serverMessage || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("We could not reach the server. Please check your connection and try again.");
    }
  };

  return (
    <section id="join" className="bg-background-100 py-20 md:py-28">
      <div className="jeko-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <p className="eyebrow text-accent-700">RECRUITMENT</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.02] tracking-tight text-foreground-950 md:text-6xl">
              JOIN JEKO
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground-600">
              Ready to move, lead and inspire? Fill in the form and our committee will get in touch
              with you about the next intake at IPG Kampus Kota Bharu.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary-100 text-secondary-900">
                    <i className={`${benefit.icon} text-lg`} />
                  </span>
                  <span>
                    <span className="block font-heading text-base font-semibold text-foreground-950">
                      {benefit.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground-600">
                      {benefit.text}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className="rounded-lg border border-background-200 bg-background-50 p-6 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-2xl text-accent-700">
                    <i className="ri-check-line" />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-foreground-950">
                    Welcome aboard!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-600">
                    Your application has been received. A JEKO committee member will reach out to
                    you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 cursor-pointer whitespace-nowrap rounded-md border border-foreground-950 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground-950 transition-colors hover:bg-foreground-950 hover:text-background-50"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form id="join-jeko-form" data-readdy-form onSubmit={handleSubmit} noValidate>
                  <input
                    className="jeko-alt-field"
                    type="text"
                    name="website_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    readOnly
                  />

                  <div className="grid grid-cols-1 gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                        Full Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-accent-500"
                      />
                    </label>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                          Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@email.com"
                          className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-accent-500"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                          Phone
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="012-345 6789"
                          className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-accent-500"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                          Programme
                        </span>
                        <input
                          type="text"
                          name="programme"
                          placeholder="e.g. Physical Education"
                          className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-accent-500"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                          Year of Study
                        </span>
                        <select
                          name="year"
                          defaultValue=""
                          className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors focus:border-accent-500"
                        >
                          <option value="" disabled>
                            Select year
                          </option>
                          <option value="Year 1">Year 1</option>
                          <option value="Year 2">Year 2</option>
                          <option value="Year 3">Year 3</option>
                          <option value="Year 4">Year 4</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                        Preferred Committee
                      </span>
                      <select
                        name="committee"
                        defaultValue=""
                        className="rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors focus:border-accent-500"
                      >
                        <option value="" disabled>
                          Select a committee
                        </option>
                        <option value="Sports & Events">Sports &amp; Events</option>
                        <option value="Leadership & Development">Leadership &amp; Development</option>
                        <option value="Media & Publicity">Media &amp; Publicity</option>
                        <option value="Community Outreach">Community Outreach</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground-500">
                        Why do you want to join?
                      </span>
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={500}
                        placeholder="Tell us a little about yourself and your interests (max 500 characters)"
                        className="resize-none rounded-md border border-background-300 bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors placeholder:text-foreground-400 focus:border-accent-500"
                      />
                    </label>
                  </div>

                  {status === "error" && (
                    <p className="mt-5 flex items-start gap-2 rounded-md border border-secondary-300 bg-secondary-50 px-4 py-3 text-sm text-secondary-900">
                      <i className="ri-error-warning-line mt-0.5" />
                      <span>{errorMessage}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-md bg-primary-950 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-background-50 transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Application"}
                    {status !== "submitting" && <i className="ri-arrow-right-line" />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}