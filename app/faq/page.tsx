'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'Why should I book on TenerifeDreamsExcursion?',
        a: 'We specialise in Tenerife activities with over 10 years of experience. We only work with the best providers on the island who meet all regulatory requirements and ensure your satisfaction.',
      },
      {
        q: 'What benefits do I get by booking with us?',
        a: 'You get direct contact with activity organizers, guaranteed best online prices, and a price-match guarantee — if you find a lower price elsewhere, we will give you twice the difference.',
      },
      {
        q: 'Where is the meeting point on the day of the event?',
        a: 'Meeting point details appear at the bottom of the activity page and in your confirmation email. You can also contact the excursion organizer directly with any questions.',
      },
      {
        q: 'Do I need to print out the voucher?',
        a: 'Bring a copy of your confirmation email. Some activities accept e-tickets shown on your phone; others require a printed copy. Check the requirements in your confirmation email.',
      },
      {
        q: 'Are meals included?',
        a: 'Meals are not included unless specifically stated on the activity page in the INCLUDED section.',
      },
      {
        q: 'Should I bring anything on the day of the activity?',
        a: 'Required documents are listed in your confirmation email. For example, vehicle-based excursions require a valid driving licence.',
      },
      {
        q: 'Are animals allowed?',
        a: 'No, animals are not permitted on any of our activities.',
      },
    ],
  },
  {
    category: 'Booking',
    items: [
      {
        q: 'How can I book an activity?',
        a: 'Book securely on our website using Visa, Mastercard, or PayPal. You can also contact our team at our office in Centro Comercial Siam Mall, Adeje.',
      },
      {
        q: 'How much do I pay at the time of booking?',
        a: 'Most activities require a deposit only, with the remaining balance due on the day. Some activities require full upfront payment — this is clearly stated on the activity page.',
      },
      {
        q: 'Is payment secure?',
        a: 'Yes, 100% safe. Payment is processed directly through our secure banking partner. We never store or access your credit card details.',
      },
      {
        q: 'What should I do if I have a problem during the booking process?',
        a: 'Contact us via email, phone, or WhatsApp. Our contact details are available on the Contact Us page and at the bottom of this page.',
      },
      {
        q: 'How will I receive my tickets?',
        a: 'A confirmation email with all activity details is sent immediately after your booking is confirmed.',
      },
      {
        q: 'Can I book for another person?',
        a: "Yes, simply enter the other person's contact details during booking. The confirmation and e-ticket will be sent to the provided email address.",
      },
      {
        q: 'Can I change my booking once I have paid?',
        a: 'Yes. Send us an email with your booking number specifying the changes you would like to make.',
      },
      {
        q: 'Can I book activities over the phone?',
        a: 'We do not accept phone bookings for security reasons, but our customer service team is happy to answer any questions by phone.',
      },
    ],
  },
  {
    category: 'Private Services & Groups',
    items: [
      {
        q: 'How can I book a private excursion?',
        a: 'Contact us via the online form to discuss flexible scheduling, personal guides, and customised programmes tailored to your needs.',
      },
      {
        q: 'Can I book a group activity?',
        a: 'Yes, we cater for groups typically between 6 and 20 people.',
      },
      {
        q: 'What can you do for groups?',
        a: 'We offer tailor-made packages including transportation, guides, and all-inclusive excursions. Contact our team for a fully customised holiday programme.',
      },
    ],
  },
  {
    category: 'Cancellations',
    items: [
      {
        q: 'How can I cancel my booking?',
        a: 'Each provider has their own cancellation policy. Cancellations must be made at least 48 hours before the service start time. Any applicable cancellation fees will be deducted from your deposit refund.',
      },
      {
        q: 'What happens in case of bad weather?',
        a: 'If severe weather forces the cancellation of an excursion, you will have the option to reschedule or receive a full refund.',
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4 hover:text-[#1a3a5c] transition-colors"
      >
        <span className="text-sm font-semibold text-[#333]">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#1a3a5c] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="text-sm text-[#666] leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  )
}

export default function FaqPage() {
  return (
    <main className="bg-[#f5f5f5] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#333] mb-2">Frequently Asked Questions</h1>
          <p className="text-[#666] text-sm">Everything you need to know before booking your Tenerife activity</p>
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((section) => (
            <div key={section.category} className="bg-white shadow-sm">
              <div className="bg-[#1a3a5c] px-6 py-3">
                <h2 className="text-white font-bold text-sm uppercase tracking-wide">{section.category}</h2>
              </div>
              <div className="px-6">
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#f5920a] text-white p-6 text-center">
          <p className="font-bold mb-2">Still have questions?</p>
          <p className="text-sm mb-4 text-white/90">Our team responds in less than 10 minutes</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+34822684504" className="bg-white text-[#f5920a] font-bold text-sm px-6 py-2.5 hover:bg-gray-50 transition-colors">
              +34 822 68 45 04
            </a>
            <Link href="/#contacto" className="bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-6 py-2.5 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#999] mt-6">
          <Link href="/" className="text-[#1a3a5c] hover:underline">← Back to activities</Link>
        </p>
      </div>
    </main>
  )
}
