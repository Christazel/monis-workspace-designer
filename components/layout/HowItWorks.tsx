'use client';

import { Sparkles, Calendar, Truck, HeartHandshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Sparkles size={22} color="var(--brass)" />,
      title: 'Pick Gear or Signature Setup',
      desc: 'Choose from standing desks, Herman Miller chairs, and ultrawide displays in the catalog, or load a curated preset in our Villa 3D Builder.',
    },
    {
      num: '02',
      icon: <Calendar size={22} color="var(--brass)" />,
      title: 'Flexible Rental Terms',
      desc: 'Rent daily, weekly (-10% off), or monthly (-20% off). No security deposit required — pay only for what you use with zero lock-in.',
    },
    {
      num: '03',
      icon: <Truck size={22} color="var(--brass)" />,
      title: 'White-Glove In-Villa Setup',
      desc: 'Our team delivers and installs your entire workstation at your villa in Canggu, Seminyak, Ubud, or Uluwatu with clean cable management.',
    },
    {
      num: '04',
      icon: <HeartHandshake size={22} color="var(--brass)" />,
      title: 'Real WhatsApp Support & Return',
      desc: 'Fast support 7 days a week. Swap accessories anytime. When your Bali stay ends, we quietly pack everything up at your convenience.',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        scrollMarginTop: '80px',
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '64px 0',
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--brass)',
              marginBottom: 8,
              fontFamily: 'var(--font-heading)',
            }}
          >
            THE MONIS WORKFLOW
          </div>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.2vw, 36px)',
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 12,
              fontFamily: 'var(--font-heading)',
            }}
          >
            A proper office in your Bali villa by this afternoon
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
            }}
          >
            We take care of transportation, assembly, ergonomic tuning, and pickup so you can focus on building from paradise.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 4px 16px rgba(22,33,29,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(22,33,29,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(22,33,29,0.04)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'var(--paper-2)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--line)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: 10,
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 13.5,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
