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
import { profile } from '../data/portfolio';
import { openEmail } from '../utils/contact';

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;

const EMPTY_FORM = { name: '', email: '', message: '' };

const ChannelShell = ({ icon: Icon, label, value, trailing }) => (
  <>
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
      <Icon size={17} />
    </span>
    <span className="min-w-0 flex-1 text-left">
      <span className="block font-mono text-[11px] uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span className="block truncate text-sm font-medium">{value}</span>
    </span>
    {trailing}
  </>
);

const CHANNEL_CLASS =
  'card group flex w-full items-center gap-4 p-5 transition hover:border-zinc-400 dark:hover:border-zinc-600';

const ARROW_CLASS =
  'shrink-0 text-zinc-300 transition group-hover:text-zinc-900 dark:text-zinc-700 dark:group-hover:text-zinc-100';

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
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
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

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
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
                value="ananyatech2006"
                trailing={<ArrowUpRight size={17} className={ARROW_CLASS} />}
              />
            </a>
          </div>

          <div className="card p-5 sm:p-7">
            {status === 'sent' ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={40} className="text-zinc-900 dark:text-zinc-100" />
                <h3 className="mt-4 font-display text-xl font-bold">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
                  Thanks for reaching out. It's landed in my inbox and I'll get back to you soon.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm outline-none
                               transition placeholder:text-zinc-400 focus:border-zinc-900
                               dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm outline-none
                               transition placeholder:text-zinc-400 focus:border-zinc-900
                               dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to build?"
                    className="w-full resize-none rounded-lg border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm outline-none
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
        </div>
      </div>
    </section>
  );
};
