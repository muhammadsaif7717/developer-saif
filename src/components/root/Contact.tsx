'use client';

import { useState, useRef } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  AlertCircle,
  Loader2,
  Copy,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'MD. SAIF ISLAM',
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject || 'No subject',
          message: formData.message,
        },
      );
      toast('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      formRef.current?.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or contact me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  /* ── Floating label input ── */
  const FloatingInput = ({
    id,
    name,
    type = 'text',
    label,
    required = false,
    value,
    onChange,
    error,
  }: {
    id: string;
    name: string;
    type?: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }) => (
    <div className="group relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full rounded-xl border-2 bg-white px-4 pt-6 pb-3 text-sm text-[#334155] transition-all duration-200 focus:outline-none dark:bg-black dark:text-[#cbd5e1] ${
          error
            ? 'border-red-400 focus:border-red-400'
            : 'border-[#e2e8f0] focus:border-[#0082c4] focus:shadow-[0_0_0_4px_rgba(0,130,196,0.08)] dark:border-[#27273a] dark:focus:border-[#0082c4]'
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute top-4 left-4 text-sm transition-all duration-200 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[0.65rem] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:tracking-wide peer-not-placeholder-shown:text-[#0082c4] peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-[#0082c4] ${error ? 'text-red-400' : 'text-[#94a3b8]'}`}
      >
        {label}
        {required && <span className="ml-0.5 text-[#0082c4]">*</span>}
      </label>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32 dark:bg-black"
    >
      {/* ── Ambient Background ──────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Line grid — matches About */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,130,196,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,130,196,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.03] dark:opacity-[0.08]" />
        {/* Glow blobs — matches About */}
        <div className="absolute top-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0082c4] opacity-20 blur-[120px] dark:opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0099e6] opacity-20 blur-[120px] [animation-delay:1s] dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#0082c4]" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#0082c4] uppercase">
              Let's Work Together
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#0082c4]" />
          </div>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-[#0082c4] md:text-5xl lg:text-6xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-xl text-base text-[#64748b] md:text-lg dark:text-[#cbd5e1]">
            Have a project in mind or just want to chat? Drop me a message and
            I'll get back to you within 24 hours.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          {/* ── Contact Form (wider) ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-8 shadow-lg shadow-[#0082c4]/5 dark:bg-[#11141c]">
              {/* Form header */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082c4] to-[#0099e6] shadow-md shadow-[#0082c4]/30">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] font-bold tracking-[0.18em] text-[#0082c4] uppercase">
                    Send a message
                  </p>
                  <p className="text-sm text-[#64748b] dark:text-[#cbd5e1]">
                    I'll reply within 24 hours
                  </p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingInput
                    id="name"
                    name="name"
                    label="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    label="Your Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                <FloatingInput
                  id="subject"
                  name="subject"
                  label="Subject (Optional)"
                  value={formData.subject}
                  onChange={handleChange}
                />

                {/* Textarea */}
                <div className="group relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder=" "
                    className={`peer w-full resize-none rounded-xl border-2 bg-white px-4 pt-6 pb-3 text-sm text-[#334155] transition-all duration-200 focus:outline-none dark:bg-black dark:text-[#cbd5e1] ${
                      errors.message
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-[#e2e8f0] focus:border-[#0082c4] focus:shadow-[0_0_0_4px_rgba(0,130,196,0.08)] dark:border-[#27273a]'
                    }`}
                  />
                  <label
                    htmlFor="message"
                    className={`pointer-events-none absolute top-4 left-4 text-sm transition-all duration-200 peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[0.65rem] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:tracking-wide peer-not-placeholder-shown:text-[#0082c4] peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:font-semibold peer-focus:tracking-wide peer-focus:text-[#0082c4] ${errors.message ? 'text-red-400' : 'text-[#94a3b8]'}`}
                  >
                    Your Message<span className="ml-0.5 text-[#0082c4]">*</span>
                  </label>
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {errors.message}
                    </p>
                  )}
                  {/* character count */}
                  {formData.message.length > 0 && (
                    <p className="mt-1 text-right font-mono text-[0.65rem] text-[#94a3b8]">
                      {formData.message.length} chars
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#0082c4] px-6 py-4 font-semibold text-white shadow-lg shadow-[#0082c4]/30 transition-all duration-300 hover:bg-[#0099e6] hover:shadow-xl hover:shadow-[#0082c4]/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Right column ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            {/* Availability pill */}
            <div className="flex items-center gap-3 rounded-2xl border-2 border-[#0082c4]/40 bg-[#f2f2f2] px-5 py-4 dark:bg-[#11141c]">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10b981]" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0082c4]">
                  Currently Available
                </p>
                <p className="text-xs text-[#64748b] dark:text-[#cbd5e1]">
                  Open to projects · replies in ~24h
                </p>
              </div>
            </div>

            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'muhammadsaif7717@gmail.com',
                href: 'mailto:muhammadsaif7717@gmail.com',
                copyValue: 'muhammadsaif7717@gmail.com',
                canCopy: true,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+880 1319-630516',
                href: 'tel:+8801319630516',
                canCopy: false,
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Dhaka, Bangladesh',
                sub: 'Available for remote work worldwide',
                canCopy: false,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.07 }}
                whileHover={{ y: -3 }}
                className="group relative rounded-2xl border border-[#0082c4]/20 bg-[#f2f2f2] p-5 transition-all duration-300 hover:border-[#0082c4]/50 hover:shadow-lg hover:shadow-[#0082c4]/10 dark:bg-[#11141c]"
              >
                {/* Left accent */}
                <div className="absolute top-5 bottom-5 left-0 w-[3px] rounded-full bg-[#0082c4] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:bg-[#0082c4] dark:bg-black">
                    <item.icon className="h-5 w-5 text-[#0082c4] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 font-mono text-[0.6rem] font-bold tracking-[0.18em] text-[#0082c4] uppercase opacity-70">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block truncate text-sm font-semibold text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                        {item.value}
                      </p>
                    )}
                    {item.sub && (
                      <p className="mt-0.5 text-xs text-[#94a3b8]">
                        {item.sub}
                      </p>
                    )}
                  </div>
                  {item.canCopy && (
                    <button
                      onClick={() => copyToClipboard(item.copyValue!)}
                      className="shrink-0 rounded-lg p-1.5 text-[#94a3b8] transition-all hover:bg-white hover:text-[#0082c4] dark:hover:bg-black"
                      aria-label={`Copy ${item.label}`}
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quote / personality note */}
            <div className="mt-auto rounded-2xl border border-[#0082c4]/20 bg-gradient-to-br from-[#0082c4]/8 to-[#0099e6]/5 p-5 dark:from-[#0082c4]/10 dark:to-[#0099e6]/5">
              <p className="mb-2 font-mono text-[0.65rem] font-bold tracking-[0.18em] text-[#0082c4] uppercase">
                // a quick note
              </p>
              <p className="text-sm leading-relaxed text-[#64748b] dark:text-[#cbd5e1]">
                Whether it's a full product build, a quick fix, or just an idea
                you want to bounce off someone —{' '}
                <span className="font-semibold text-[#0082c4]">
                  I'm all ears.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
