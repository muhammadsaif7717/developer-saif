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
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

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
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'MD. SAIF ISLAM', // or leave static
          from_name: formData.name, // from form
          reply_to: formData.email, // from form
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

  return (
    <section
      id="contact"
      className="bg-white py-16 md:py-24 lg:py-32 dark:bg-[#000000]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#0082c4] md:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#334155] dark:text-[#cbd5e1]">
            Have a project in mind or just want to chat? Drop me a message and
            I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f2f2f2] p-8 dark:border-[#27273a] dark:bg-[#11141c]">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    formData.name
                      ? 'top-2 text-xs text-[#0082c4]'
                      : 'top-4 text-sm text-[#64748b]'
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-2 bg-white px-4 pt-6 pb-2 text-[#334155] transition-all duration-200 focus:outline-none dark:bg-[#000000] dark:text-[#cbd5e1] ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#e2e8f0] focus:border-[#0082c4] focus:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:border-[#27273a]'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    formData.email
                      ? 'top-2 text-xs text-[#0082c4]'
                      : 'top-4 text-sm text-[#64748b]'
                  }`}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-2 bg-white px-4 pt-6 pb-2 text-[#334155] transition-all duration-200 focus:outline-none dark:bg-[#000000] dark:text-[#cbd5e1] ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#e2e8f0] focus:border-[#0082c4] focus:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:border-[#27273a]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Input */}
              <div className="relative">
                <label
                  htmlFor="subject"
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    formData.subject
                      ? 'top-2 text-xs text-[#0082c4]'
                      : 'top-4 text-sm text-[#64748b]'
                  }`}
                >
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-[#e2e8f0] bg-white px-4 pt-6 pb-2 text-[#334155] transition-all duration-200 focus:border-[#0082c4] focus:shadow-[0_0_15px_rgba(0,130,196,0.2)] focus:outline-none dark:border-[#27273a] dark:bg-[#000000] dark:text-[#cbd5e1]"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    formData.message
                      ? 'top-2 text-xs text-[#0082c4]'
                      : 'top-4 text-sm text-[#64748b]'
                  }`}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full resize-none rounded-lg border-2 bg-white px-4 pt-6 pb-2 text-[#334155] transition-all duration-200 focus:outline-none dark:bg-[#000000] dark:text-[#cbd5e1] ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#e2e8f0] focus:border-[#0082c4] focus:shadow-[0_0_15px_rgba(0,130,196,0.2)] dark:border-[#27273a]'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-[#0082c4] px-6 py-4 font-medium text-white transition-all hover:scale-[1.02] hover:bg-[#0099e6] hover:shadow-[0_0_20px_rgba(0,130,196,0.4)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-[#0082c4]">
                Contact Information
              </h3>
              <p className="mb-8 text-[#334155] dark:text-[#cbd5e1]">
                Feel free to reach out through any of these channels. I'm always
                open to discussing new projects, creative ideas, or
                opportunities.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="group relative rounded-xl border border-[#e2e8f0] bg-[#f2f2f2] p-6 transition-all hover:border-[#0082c4] dark:border-[#27273a] dark:bg-[#11141c]">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-white p-3 transition-all group-hover:bg-[#0082c4] dark:bg-[#000000]">
                      <Mail className="h-6 w-6 text-[#0082c4] transition-colors group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-[#0082c4]">
                        Email
                      </h4>
                      <a
                        href="mailto:muhammadsaif7717@gmail.com"
                        className="text-sm text-[#334155] transition-colors hover:text-[#0082c4] md:text-[16px] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                      >
                        muhammadsaif7717@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('hello@developer-saif.com')}
                    className="absolute right-5 rounded-lg p-2 transition-all hover:bg-white dark:hover:bg-[#000000]"
                    aria-label="Copy email"
                  >
                    <Copy className="h-4 w-4 text-[#0082c4]" />
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="group rounded-xl border border-[#e2e8f0] bg-[#f2f2f2] p-6 transition-all hover:border-[#0082c4] dark:border-[#27273a] dark:bg-[#11141c]">
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-white p-3 transition-all group-hover:bg-[#0082c4] dark:bg-[#000000]">
                    <Phone className="h-6 w-6 text-[#0082c4] transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-[#0082c4]">Phone</h4>
                    <a
                      href="tel:+8801319630516"
                      className="text-[#334155] transition-colors hover:text-[#0082c4] dark:text-[#cbd5e1] dark:hover:text-[#0082c4]"
                    >
                      +880 1319-630516
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group rounded-xl border border-[#e2e8f0] bg-[#f2f2f2] p-6 transition-all hover:border-[#0082c4] dark:border-[#27273a] dark:bg-[#11141c]">
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-white p-3 transition-all group-hover:bg-[#0082c4] dark:bg-[#000000]">
                    <MapPin className="h-6 w-6 text-[#0082c4] transition-colors group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-[#0082c4]">
                      Location
                    </h4>
                    <p className="text-[#334155] dark:text-[#cbd5e1]">
                      Dhaka, Bangladesh
                    </p>
                    <p className="mt-1 text-sm text-[#64748b]">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="rounded-xl border-2 border-[#0082c4] bg-[#f2f2f2] p-6 dark:bg-[#11141c]">
              <div className="mb-2 flex items-center space-x-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-[#10b981]"></div>
                <h4 className="font-semibold text-[#0082c4]">
                  Currently Available
                </h4>
              </div>
              <p className="text-sm text-[#334155] dark:text-[#cbd5e1]">
                Open to new projects and collaborations. Average response time:
                24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
