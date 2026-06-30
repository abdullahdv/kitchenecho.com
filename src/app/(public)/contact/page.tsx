import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-[#2d3436]">Get in Touch</h1>
          <p className="mt-2 text-[#636e72]">Have a question, suggestion, or just want to say hi? We&apos;d love to hear from you.</p>
        </div>
        <form action="/api/contact" method="POST" className="card space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2d3436] mb-1">Your Name *</label>
            <input id="name" name="name" type="text" required className="input-field" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2d3436] mb-1">Email *</label>
            <input id="email" name="email" type="email" required className="input-field" placeholder="john@example.com" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-[#2d3436] mb-1">Subject</label>
            <input id="subject" name="subject" type="text" className="input-field" placeholder="How can we help?" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#2d3436] mb-1">Message *</label>
            <textarea id="message" name="message" required rows={5} className="input-field resize-y" placeholder="Your message..." />
          </div>
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#e67e22] hover:underline">← Back to home</Link>
        </div>
      </div>
    </div>
  )
}
