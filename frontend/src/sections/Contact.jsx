import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';
import { ScrollReveal } from '../components/ScrollReveal';
import { profile } from '../data/portfolio';
import { openEmail } from '../utils/contact';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EMPTY_FORM = { name: '', email: '', message: '' };

const ChannelShell = ({ icon: Icon, label, value, trailing }) => (
  <div className="flex w-full items-center justify-between gap-4 p-4 text-left">
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <Icon size={18} className="text-zinc-500" />
      </div>
      <div>
        <div className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {label}
        </div>
        <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">{value}</div>
      </div>
    </div>
    {trailing}
  </div>
);

const CHANNEL_CLASS =
  'card flex w-full h-full transition hover:border-zinc-400 dark:hover:border-zinc-600';
const ARROW_CLASS = 'shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5';

export const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await window.fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('rejected');

      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('error');
      setError(
        "Your message couldn't be delivered right now. Please use the Email button on the left instead."
      );
    }
  };

  return (
    <section id="contact" className="relative px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              Let's build something
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Open to internships, freelance work and collaboration. Send a message below, or reach me
              on whichever channel you prefer.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
          <ScrollReveal delay={150} className="lg:h-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-3 lg:h-full">
              <button type="button" onClick={() => openEmail('Hello Ananya')} className={CHANNEL_CLASS}>
                <ChannelShell
                  icon={Mail}
                  label="Email"
                  value="Click to open a message"
                  trailing={<ArrowUpRight size={17} className={ARROW_CLASS} />}
                />
              </button>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className={CHANNEL_CLASS}
              >
                <ChannelShell
                  icon={Linkedin}
                  label="LinkedIn"
                  value="ananya-patel"
                  trailing={<ArrowUpRight size={17} className={ARROW_CLASS} />}
                />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className={CHANNEL_CLASS}
              >
                <ChannelShell
                  icon={Github}
                  label="GitHub"
                  value="heyyananya"
                  trailing={<ArrowUpRight size={17} className={ARROW_CLASS} />}
                />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="card p-5 sm:p-7">
              {status === 'sent' ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <CheckCircle2 size={40} className="text-zinc-900 dark:text-zinc-100" />
                  <h3 className="mt-4 font-display text-xl font-bold">Message sent</h3>
                  <p className="mt-2 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
                    Thanks for reaching out. It's landed in my inbox and I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="Ananya Patel"
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2 text-sm outline-none
                                 transition placeholder:text-zinc-400 focus:border-zinc-900
                                 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="contact-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2 text-sm outline-none
                                 transition placeholder:text-zinc-400 focus:border-zinc-900
                                 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      placeholder="What would you like to build?"
                      className="mt-2 w-full resize-none rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm outline-none
                                 transition placeholder:text-zinc-400 focus:border-zinc-900
                                 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="text-sm text-zinc-600 dark:text-zinc-400">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-solid w-full justify-center disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
