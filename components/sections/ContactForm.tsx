"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-cyan"
          />
          {state.fieldErrors?.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-fuchsia">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-cyan"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-fuchsia">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="w-full rounded-lg border border-line bg-ink-2 px-4 py-3 text-sm outline-none focus:border-cyan"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-fuchsia">
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-paper px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-white disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "success" && (
          <p role="status" className="text-sm text-mint">
            {state.message}
          </p>
        )}
        {state.status === "error" && state.message && (
          <p role="alert" className="text-sm text-fuchsia">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}