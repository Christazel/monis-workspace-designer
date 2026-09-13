# Monis Workspace Designer 🌴

> Built for the **[Desent](https://desent.de)** coding challenge.

A real-time workspace rental configurator for [Monis.rent](https://monis.rent) — the premium Bali workspace rental service.

🔗 **Live Demo:** _Deploy to Vercel coming soon_

---

## ✨ Features

- **3-Panel Layout** — Intuitive workspace builder matching the Desent sketch
- **Live Visual Preview** — SVG canvas updates in real-time as you pick items
- **2+ Desk Options** — Oak Standing, Walnut Executive, Minimalist White, Glass Corner
- **2+ Chair Options** — Herman Miller Aeron, Mesh Chair, Gaming Chair, Bar Stool
- **Accessories** — Monitors (27"/Ultrawide), ScreenBar lamp, Plant, Keyboard, Webcam
- **Lifestyle Extras** — Coffee Station · Outdoor Gear · Relax Zone · Garage Space
- **Dynamic Pricing** — Duration discounts (1 day → 1 month)
- **Day/Night Mode** — Ambient lighting toggle with visual effects
- **Checkout Summary** — Full pricing breakdown + WhatsApp booking CTA

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| **Next.js 16** | Framework (App Router + TypeScript) |
| **Tailwind CSS v4** | Styling |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icons |
| **Vercel** | Deployment |

## 🚀 Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (Inter font + SEO)
│   ├── page.tsx            # Main page
│   └── globals.css         # Tailwind + custom styles
├── components/
│   ├── WorkspaceBuilder.tsx # Main state container
│   ├── LeftPanel.tsx        # Tab selector (Chairs/Desks/Accessories)
│   ├── WorkspaceCanvas.tsx  # Real-time SVG visual canvas
│   ├── RightPanel.tsx       # Quick add-ons panel
│   ├── BottomExtras.tsx     # Category extras (Coffee/Outdoor/Relax/Garage)
│   ├── CheckoutModal.tsx    # Summary & booking modal
│   └── ItemCard.tsx         # Reusable product cards
└── lib/
    ├── catalog.ts           # Product data & pricing
    └── types.ts             # TypeScript types
```

## 💡 Approach & Design Decisions

- **No backend/database** — Pure client-side state with React `useState`. Fast, simple, deployable anywhere.
- **SVG canvas** — Hand-crafted SVG workspace illustration that morphs based on selections. No heavy 3D libraries.
- **Framer Motion** — Smooth transitions for item selection, tab switching, and modal animations.
- **Tailwind v4** — Latest version with native CSS variables and no config file needed.

## 🔮 What I'd Improve With More Time

- Drag-and-drop item placement on the canvas
- More granular desk arrangement (multiple monitors side by side)
- Saved configurations via localStorage / URL sharing
- Mobile-optimized swipeable panel navigation
- Real payment integration (Midtrans/Stripe)

---

Built with ❤️ by [Christazel](https://github.com/Christazel)
