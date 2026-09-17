'use client';

import { Sparkles, Calendar, Truck, HeartHandshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Sparkles size={22} color="#111827" />,
      title: 'Pick Gear or Curated Setup',
      desc: 'Choose from standing desks, Herman Miller chairs, and 4K displays in the catalog, or customize your dream setup in our 2D Studio Configurator.',
    },
    {
      num: '02',
      icon: <Calendar size={22} color="#111827" />,
      title: 'Flexible Rental Terms',
      desc: 'Rent daily, weekly (15% off), or monthly (30% off). No security deposit required. Pay only for what you use with zero lock-in.',
    },
    {
      num: '03',
      icon: <Truck size={22} color="#111827" />,
      title: 'White-Glove Villa Setup',
      desc: 'Our logistics team delivers, assembles, and tests your entire workstation at your villa in Canggu, Seminyak, Ubud, or Uluwatu.',
    },
    {
      num: '04',
      icon: <HeartHandshake size={22} color="#111827" />,
      title: 'WhatsApp Concierge & Return',
      desc: 'Friendly English & Indonesian support 7 days a week. Swap gear anytime. When your Bali stay ends, we pack and pick up everything.',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        scrollMarginTop: '80px',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        padding: '68px 0',
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#4b5563',
              marginBottom: 8,
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.2vw, 36px)',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 10,
            }}
          >
            A proper office in your Bali villa by this afternoon
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#4b5563',
              lineHeight: 1.6,
            }}
          >
            We take care of transportation, assembly, ergonomic tuning, and pickup so you can focus on deep work from paradise.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 16,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              className="hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#4b5563',
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 13.5,
                  color: '#4b5563',
                  lineHeight: 1.55,
                  margin: 0,
                  flex: 1,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          style={{
            marginTop: 44,
            paddingTop: 32,
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>
              Ready to build your Bali workspace?
            </p>
            <p style={{ fontSize: 14, color: '#4b5563', marginTop: 4 }}>
              Same-day delivery across Canggu, Seminyak, Ubud, Uluwatu, and Sanur.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://www.monis.rent/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the official Monis.rent website to rent workspace gear"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#000000',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <span>Visit Official Monis.rent →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
