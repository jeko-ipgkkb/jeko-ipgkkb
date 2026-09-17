# JEKO — Kelab Jasmani dan Kokurikulum, IPG Kampus Kota Bharu

## 1. Project Description
A premium, fully redesigned official website for **JEKO**, the sports & co-curricular club of **IPG Kampus Kota Bharu**.
Positioned as a professional sports organization (not a student project). Target users: faculty advisors, current & future members, lecturers, students, and public visitors.

Core value: communicate real leadership, membership, activities and achievements through a modern editorial sports experience, plus a live photo gallery backed by a real database.

Brand statement: **SPORTS • LEADERSHIP • TEAMWORK • EXCELLENCE**

## 2. Page Structure
Single-page editorial experience with smooth anchor scrolling (all sections on `/`):
- `#home` — Hero + Dynamic sports strip
- `#about` — About JEKO + "At a glance" stats
- `#vision` — Purpose in Motion (Vision & Mission)
- `#advisors` — The People Behind JEKO (11 Faculty Advisors)
- `#org` — Leadership Structure (organizational chart)
- `#members` — Meet the Team (34 JEKO members)
- `#gallery` — JEKO in Motion (4 albums + Supabase upload + lightbox)
- Quote / statement section
- Footer

Routing note: site uses React Router (`/` home, `*` NotFound). Anchor sections are in-page.

## 3. Core Features
- [ ] Premium sticky glass navbar with scroll shrink + mobile menu + "JOIN JEKO" CTA
- [ ] Editorial hero with stat floats + entrance animations
- [ ] Animated sports ticker strip (no overflow)
- [ ] About split layout + animated stat counters
- [ ] Vision & Mission oversized editorial blocks (01 / 02)
- [ ] 11 Faculty Advisor profiles (local profile images, editorial grid + hover)
- [ ] Professional organizational chart with connecting lines (18 roles)
- [ ] 34-member roster grid with local profile image replacement
- [ ] 4-album immersive gallery: class / sports / achievement / random
- [ ] Supabase Storage upload (image validation, 10MB limit, filename sanitization, progress, success/error)
- [ ] Full-screen lightbox viewer (download, close, Escape, keyboard nav, mobile)
- [ ] Loading / empty / error states for gallery
- [ ] Quote section, multi-column footer, social buttons
- [ ] Scroll reveal + number counters, respects prefers-reduced-motion
- [ ] SEO: title, description, H1, OpenGraph, semantic HTML, GSC verification tag preserved
- [ ] Responsive 1440 → 360, no horizontal overflow

## 4. Data Model Design — Supabase Gallery
Storage-first design (no product/member tables needed; member & advisor photos are local).

### Storage bucket: `jeko-gallery` (public, configurable via one constant)
| Path pattern | Description |
|--------------|-------------|
| `class/{timestamp}-{random}.{ext}` | Album 01 — Class Moments |
| `sports/{timestamp}-{random}.{ext}` | Album 02 — Sports & Activities |
| `achievement/{timestamp}-{random}.{ext}` | Album 03 — Achievements |
| `random/{timestamp}-{random}.{ext}` | Album 04 — Random Moments |

Photos listed newest-first via `list()` sorted by `created_at`. Public URL via `getPublicUrl()`.

### Table: `gallery_photos` (optional metadata layer)
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| album | text | One of: class, sports, achievement, random |
| path | text | Storage object path |
| caption | text | Optional caption |
| created_at | timestamptz | Upload time (ordering) |

> Gallery uploads must NOT affect member / organization / advisor photos — those stay local.

## 5. Backend / Third-party Integration Plan
- Database + Storage: **SaaS Supabase** (user chose to connect their own Supabase project)
- Shopify: not needed
- Stripe / payments: not needed
- Others: none

## 6. Development Phase Plan

### Phase 1: Design System + Core Landing (static)
- Goal: deliver the visual identity and the top-to-bottom landing experience
- Deliverable: palette/fonts design system, navbar, hero, sports strip, about, vision & mission, quote section, footer — all responsive with animations

### Phase 2: Advisors + Org Chart + Members
- Goal: the people sections
- Deliverable: 11 advisor profiles, professional org chart with hierarchy lines, 34-member roster grid with local image replacement

### Phase 3: Supabase Gallery System
- Goal: working gallery backed by the connected backend
- Deliverable: 4 albums, upload panel, live listing, lightbox viewer, download, states, error handling

### Phase 4: Polish + SEO + Performance
- Goal: production readiness
- Deliverable: SEO/meta/OpenGraph, semantic HTML, accessibility pass, lazy loading, responsive QA, overflow QA