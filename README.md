# Wadi Al Zaid Tours & Travel - Admin Panel

A premium admin panel and public-facing website for Wadi Al Zaid Tours & Travel, built with HTML, Tailwind CSS, and vanilla JavaScript.

## Live Demo

🔗 [View Live](https://rahman-khan-star.github.io/wadi-al-zaid-travel/)

## Features

### Admin Panel (25 pages)
- **Dashboard** — Overview with charts, stats, recent bookings, activity feed
- **Manage Destinations** — CRUD operations with search, filters, pagination
- **Manage Bookings** — Booking list with status tracking, bulk actions
- **Manage Customers** — Customer database with detailed profiles
- **Manage Payments** — Payment tracking with analytics charts
- **Manage Reviews** — Review moderation with ratings
- **Manage Blog** — Blog post management
- **Manage Team** — Team member directory
- **Manage Messages** — Contact message inbox
- **Notifications** — Notification center with filters
- **Reports & Analytics** — Charts and data visualization
- **Website CMS** — Content management settings
- **Admin Profile** — Profile settings with tabs
- **Activity Logs** — System activity audit trail
- **Login History** — Login tracking with session management
- **Backup & Restore** — Backup management with schedule settings
- **Maintenance Mode** — Site maintenance controls with countdown timer
- **Roles & Permissions** — Role-based access control
- **Security Center** — Security settings and monitoring

### Public Pages (21 pages)
- Home, About, Destinations, Blog, Contact, FAQ
- Booking flow (Booking, Payment, Confirmation)
- User accounts (Login, Register, Profile, Forgot/Reset Password, OTP)
- Dashboard, Notifications, Wishlist, Support, System Settings

### Shared Components
- **`components.css`** — 700+ lines of reusable styles
- **`components.js`** — 300+ lines of reusable JavaScript

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure |
| Tailwind CSS | Styling (CDN) |
| Vanilla JavaScript | Interactivity |
| Chart.js | Data visualization |
| Font Awesome | Icons |
| Inter Font | Typography |

## Design System

| Token | Value |
|-------|-------|
| Primary | `#0f1d3a` (Navy) |
| Accent | `#e8952f` (Orange) |
| Font | Inter |
| Border Radius | 12-20px |
| Shadows | Soft, layered |

## Component Library

| Category | Components |
|----------|-----------|
| **Layout** | Cards, Drawers, Tabs, Accordions |
| **Data** | Tables, Pagination, Charts |
| **Forms** | Inputs, Selects, Textareas, Toggles |
| **Feedback** | Toasts, Alerts, Modals, Skeletons |
| **Navigation** | Sidebar, Topbar, Breadcrumbs |
| **Actions** | Buttons (primary, secondary, danger, ghost) |
| **Display** | Badges, Avatars, Progress Bars, Tags |
| **States** | Empty States, Error States, Loading States |

## Accessibility

- Skip-to-content links
- ARIA labels and roles
- Keyboard navigation (Escape to close modals/drawers)
- Focus-visible indicators
- Semantic HTML structure

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/rahman-khan-star/wadi-al-zaid-travel.git
   ```

2. Open `index.html` in your browser

No build tools required — pure HTML/CSS/JS.

## File Structure

```
wadi-al-zaid-travel/
├── index.html              # Home page
├── admin.html              # Admin dashboard
├── components.css          # Shared styles
├── components.js           # Shared JavaScript
├── logo.svg                # Logo
├── manage-*.html           # Admin CRUD pages
├── *-details.html          # Detail views
├── login.html              # Authentication
├── booking.html            # Booking flow
├── about.html              # About page
├── blog.html               # Blog listing
├── contact.html            # Contact page
└── ...                     # 46 total HTML files
```

## License

MIT License
