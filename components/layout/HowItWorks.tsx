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
      desc: 'Rent daily, weekly (10% off), or monthly (20% off). No security deposit required. Pay only for what you use with zero lock-in.',
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
            alignItems: 'stretch',
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
                    fontSize: 24,
                    fontWeight: 800,
                    color: 'rgba(22,33,29,0.12)',
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    letterSpacing: '-0.02em',
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
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 13.5,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
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
            paddingTop: 36,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
              Ready to build your Bali workspace?
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>
              Same-day delivery across Canggu, Seminyak, Ubud and Uluwatu.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '12px 20px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.853L.057 23.5l5.783-1.517A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.505-5.233-1.382l-.374-.223-3.876 1.016 1.036-3.77-.243-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
