# Monis Workspace Designer 🌴

> Built for the **[Desent](https://desent.de)** Developer Challenge — Workspace Configurator for **[Monis.rent](https://monis.rent)**.

A visual, real-time workspace rental configurator tailored for digital nomads and startups in Bali. Instead of scrolling through a boring catalog spreadsheet, users can design their dream office setup visually in an interactive 3D villa showroom and book it instantly for same-day delivery.

---

## 🎯 Challenge Requirements & Must-Haves Checklist

| Requirement | Status | Implementation Details |
|---|:---:|---|
| **Select a desk from at least 2 options** | ✅ **Passed** | 4 options: Standing Desk Pro (Oak), Executive Desk (Walnut), Studio Desk (White), Corner Glass Desk |
| **Select a chair from at least 2 options** | ✅ **Passed** | 4 options: Herman Miller Aeron, Highback Mesh, Secretlab TITAN Gaming, Ergonomic Bar Stool |
| **Add accessories to the workspace** | ✅ **Passed** | Ultrawide & 4K monitors, BenQ ScreenBar lamp, Monstera plant, Keychron mechanical keyboard, 4K webcam, power station, footrest, surfboard, and coffee station |
| **Visual preview updates dynamically** | ✅ **Passed** | Photorealistic Villa 3D Showroom with interactive gear pins, day/night lighting modes, and live equipment swapping |
| **Summary / Checkout view** | ✅ **Passed** | Real-time bill of materials, daily/weekly/monthly rental duration discounts, IDR/USD currency switcher, villa delivery address selector, and instant WhatsApp booking with formatted invoice |
| **Public Deployment** | ✅ **Passed** | Deployed and live on **Vercel** |
| **GitHub Repository & Collaborator** | ✅ **Passed** | Source code on GitHub with `desent-bot` collaborator access |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Next.js 16** (App Router) | React framework with server-side generation & Turbopack |
| **Tailwind CSS v4** | Modern utility-first styling with PostCSS integration |
| **TypeScript** | Strict type safety for products, presets, and cart state |
| **Zustand** | High-performance client state management for workspace configuration |
| **Lucide React** | Consistent, modern iconography |
| **Vercel** | Edge production hosting & automatic CI/CD deployment |

---

## 💡 Approach & Design Decisions

- **User-Centric Nomad Experience**: Designed specifically from the perspective of a remote developer arriving in Bali. The UI emphasizes immediate clarity: same-day delivery, in-room setup, zero deposit, and 1-tap WhatsApp booking (the universal business communication tool in Southeast Asia).
- **Interactive Villa 3D Showroom**: An ambient visualizer featuring a realistic tropical Bali villa interior. Interactive pins allow users to inspect equipment specs directly in the scene, toggle daylight/night lighting, and watch their setup come to life.
- **Unified & Distraction-Free Builder Mode**: A streamlined toolbar consolidating quick presets (*Developer Pro*, *Creator Studio*, *Minimal Nomad*) and the catalog return action into a single slim bar, maximizing visual canvas height.
- **Dual Browsing Modes**: Users can either configure their workspace inside the visualizer or browse the full catalog with category pill tabs (*Desks, Chairs, Tech & monitors, Accessories*) and responsive search.

---

## 🔮 What I'd Improve With More Time

1. **3D WebGL / Spline Model**: Transition from high-resolution layered visual scenes to fully rotatable 3D WebGL models with orbit controls and custom lighting shaders.
2. **Custom Room Dimension Configurator**: Allow nomads to input their specific villa room dimensions to verify exact furniture fit before ordering.
3. **Saved Setups & Shareable Links**: Generate short permalinks (or QR codes) encoding the workspace configuration so remote teams or villa roommates can collaborate on a setup.
4. **Automated Inventory Availability Calendar**: Live integration with warehouse stock by Bali zone (Canggu, Seminyak, Ubud, Uluwatu) with date-picker booking slots.

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx             # Root HTML, SEO metadata, fonts
│   ├── page.tsx               # Main entry page toggling catalog & builder
│   └── globals.css            # Design tokens, Tailwind CSS, custom layout rules
├── components/
│   ├── builder/
│   │   ├── BuilderSection.tsx # Unified builder layout & toolbar
│   │   ├── ItemSelector.tsx   # Category items picker sidebar
│   │   ├── WorkspaceCanvas.tsx# 3D Villa visualizer with interactive gear pins
│   │   └── WorkspaceSummary.tsx# Cart summary, rental duration & price breakdown
│   ├── catalog/
│   │   ├── CatalogSection.tsx # Catalog grid with pill filter tabs
│   │   └── ProductCard.tsx    # Responsive product card with color swatches
│   ├── checkout/
│   │   └── CheckoutDrawer.tsx # Slide-out checkout drawer & WhatsApp booking
│   └── layout/
│       ├── Footer.tsx         # Site footer with service zones
│       ├── Header.tsx         # Sticky navigation header & cart badge
│       ├── HeroBanner.tsx     # Hero section & 3-column setup comparison cards
│       └── HowItWorks.tsx     # 4-step workflow explaining the rental process
├── data/
│   ├── presets.ts             # Preset setups (Developer Pro, Creator, Nomad)
│   ├── products.ts            # Curated catalog items with specs & pricing
│   └── types.ts               # Core domain TypeScript interfaces
└── store/
    └── workspaceStore.ts      # Centralized Zustand store for reactive state
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Christazel/monis-workspace-designer.git
cd monis-workspace-designer

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

Built with passion for **Desent Solutions** & **Monis.rent** by [Christazel](https://github.com/Christazel) 🌴
