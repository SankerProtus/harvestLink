# HarvestLink Figma Implementation Guide

**Target Figma File:** HarvestLink UI/UX Design
**Viewport:** 375x812px (Mobile First)
**Evaluation Goal:** 90-100% Score

---

## Quick Start Checklist

- [ ] Create new Figma project: "HarvestLink UI Design"
- [ ] Set up frames for 375x812px viewport
- [ ] Create design system page with colors and typography
- [ ] Build component library (buttons, inputs, cards)
- [ ] Design 25+ screens across farmer and buyer flows
- [ ] Add interactive prototypes (link screens with transitions)
- [ ] Create accessibility audit notes
- [ ] Prepare presentation file with interactive walkthrough

---

## Part 1: Setting Up Your Figma File

### 1.1 File Structure & Pages

Create the following pages in your Figma file:

**Page 1: System**

- Color Palette (with usage notes)
- Typography Scale
- Spacing Grid
- Shadow/Elevation System
- Icon Library (or integration notes)
- Accessibility Guide

**Page 2: Components**

- Button (all states)
- Input Fields (all states)
- Cards (listing, order, profile)
- Badges (status variants)
- Navigation (bottom tabs)
- Modals
- Ratings
- Avatars
- Dividers

**Page 3: Farmer Flow - Screens**

- Splash Screen
- Onboarding Screen 1 (Welcome)
- Onboarding Screen 2 (Role Selection)
- Onboarding Screen 3 (Phone Registration)
- OTP Verification
- Profile Setup
- Home Dashboard
- Create Listing
- Order Details
- Notifications
- Reviews List
- Profile
- Settings

**Page 4: Buyer Flow - Screens**

- Splash Screen
- Onboarding Screens (same as farmer, can reuse)
- Marketplace Home
- Search Screen
- Listing Detail
- Express Interest
- Orders Screen
- Order Details (multiple states)
- Review Screen
- Saved Listings
- Buyer Profile

**Page 5: Error & Empty States**

- Offline Screen
- Empty Orders
- Empty Listings
- Error Messages
- Network Error

**Page 6: Interactions & Prototypes**

- Farmer Flow (linked screens)
- Buyer Flow (linked screens)
- Key interactions documented

---

## Part 2: Design System Setup

### 2.1 Creating the Color Palette Component

1. **Create a new frame** called "Color Palette"
2. **Add color swatches** using rectangles with fills:

```
Primary Colors:
- Brand Green: #2D7A3B
- Brand Green Hover: #4A9D56
- Brand Green Active: #1A4823
- Brand Green Light: #E8F4ED

Secondary:
- Warm Orange: #E8731B
- Orange Light: #F9DCC4

Status:
- Success: #27AE60
- Warning: #F39C12
- Error: #E74C3C
- Info: #3498DB

Neutrals:
- Text Dark: #1A1A1A
- Text Medium: #5A5A5A
- Text Light: #A0A0A0
- Background Light: #F8F8F8
- Background White: #FFFFFF
- Border: #E0E0E0
```

3. **Label each color** with text: Add color name, hex code, and usage
4. **Create a usage guide** artboard explaining where each color is used

### 2.2 Creating Typography Styles

**Step 1: Set up Text Styles in Figma**

1. Right-click on any text → "Create text style"
2. Create these styles:

| Style Name | Font   | Size | Weight | Line Height | Letter Spacing |
| ---------- | ------ | ---- | ------ | ----------- | -------------- |
| Display    | Roboto | 32px | 700    | 1.2         | 0              |
| Heading 1  | Roboto | 28px | 700    | 1.2         | 0              |
| Heading 2  | Roboto | 24px | 600    | 1.3         | 0              |
| Heading 3  | Roboto | 18px | 600    | 1.3         | 0              |
| Body Large | Roboto | 16px | 400    | 1.5         | 0              |
| Body       | Roboto | 14px | 400    | 1.6         | 0              |
| Caption    | Roboto | 12px | 400    | 1.4         | 0              |
| Overline   | Roboto | 11px | 600    | 1.4         | 0.5            |

**Step 2: Create a Typography Reference Frame**

Add a frame showing all type scales with example text

### 2.3 Creating Color Styles

In Figma's Assets panel:

1. Create color styles for each color in the palette
2. Organize with naming: `/Brand/Green`, `/Status/Success`, `/Neutral/Text Dark`
3. This makes them reusable across all components

**Example naming structure:**

```
/Brand
  /Green
    /Primary
    /Hover
    /Active
    /Light
/Status
  /Success
  /Warning
  /Error
  /Info
/Neutral
  /Text
    /Dark
    /Medium
    /Light
  /Background
    /Light
    /White
  /Border
```

### 2.4 Creating Spacing & Grid Guide

Create a reference frame showing:

- 8pt grid system visualization
- Spacing units: 4px, 8px, 12px, 16px, 24px, 32px, 48px
- Padding standards (cards, screens, forms)
- Margin standards

Use colored rectangles to show spacing units

---

## Part 3: Building Component Library

### 3.1 Primary Button Component

**Create a component frame:**

1. **Frame name:** `Button/Primary/Default`
2. **Size:** Width: auto (flexible), Height: 44px
3. **Elements:**
   - Rectangle (background): #2D7A3B, Corner radius 8px
   - Text: "Primary Button", 16px Semibold, White, centered
   - Padding: 16px horizontal, 10px vertical

**Create component variants in Figma:**

1. Right-click on component → "Create component set"
2. Add variants:
   - `state=Default` (background: #2D7A3B)
   - `state=Hover` (background: #4A9D56)
   - `state=Active` (background: #1A4823)
   - `state=Disabled` (background: #E0E0E0, text: #A0A0A0)

**Alternative text labels:**

- Create variants for icon + text combinations
- Example: ✓ (checkmark icon) + "Verify"

### 3.2 Secondary Button Component

**Same structure as primary, but:**

- Background: #F8F8F8
- Border: 1px #E0E0E0
- Text color: #1A1A1A
- Variants for Default, Hover, Active, Disabled states

### 3.3 Text Input Component

**Components needed:**

1. **Frame name:** `Input/Text/Default`
2. **Size:** Width: 100% (in viewport), Height: 44px
3. **Elements:**
   - Rectangle (border): #E0E0E0, Corner radius 8px
   - Text input area (placeholder text in #A0A0A0)
   - Padding: 12px horizontal, 10px vertical

**Create variants:**

- `state=Default` (border: #E0E0E0)
- `state=Focused` (border: #2D7A3B, with shadow)
- `state=Filled` (border: #E0E0E0)
- `state=Error` (border: #E74C3C, background: #FFF5F3)
- `state=Disabled` (opacity 50%, cursor: not-allowed)

**With Icon variants:**

- `icon=Search` (magnifying glass left)
- `icon=Clear` (X right, clickable)
- `icon=None` (default)

### 3.4 Listing Card Component

**Frame name:** `Card/Listing/Default`

**Layout:** Horizontal (flexbox in Figma = Auto-layout)

**Elements:**

1. Image placeholder (60x60px, rounded 8px)
   - Can be a rectangle with green gradient
   - Add text: "🍅" or image placeholder
2. Content section (flex, column):
   - Title (Body Large, 14px Semibold)
   - Meta (Caption, #5A5A5A)
   - Price (16px Semibold, Brand Green)
   - Optional badge/status indicator
3. Padding: 12px
4. Shadow: Elevation 1 (0 2px 4px rgba(0,0,0,0.08))
5. Corner radius: 12px

**Variants:**

- `state=Default`
- `state=Saved` (heart icon filled)
- `state=InterestExpressed` (checkmark badge)
- `state=Unavailable` (dimmed, "SOLD" badge)

### 3.5 Status Badge Component

**Frame name:** `Badge/Status/Active`

**Elements:**

1. Rectangle (background color based on status)
2. Icon (✓, ⏱, →, ✗)
3. Text label (uppercase, 11px Semibold)
4. Padding: 4px horizontal, 6px vertical
5. Corner radius: 4px

**Variants (create one for each status):**

- `status=Active` (background: #E8F4ED, text: #2D7A3B)
- `status=Pending` (background: #F9DCC4, text: #E8731B)
- `status=InTransit` (background: rgba(52,152,219,0.1), text: #3498DB)
- `status=Delivered` (background: rgba(39,174,96,0.1), text: #27AE60)
- `status=Cancelled` (background: rgba(160,160,160,0.1), text: #A0A0A0)

### 3.6 Bottom Navigation Component

**Frame name:** `Navigation/BottomTabs/Farmer`

**Elements:**

1. Container (width: 375px, height: 64px)
2. Background: white
3. Border-top: 1px #E0E0E0
4. Tab items (4-5 tabs, auto-layout, equal width):
   - Icon (24px)
   - Label (10px Caption)
   - Padding: 8px

**Tabs for Farmer:**

- Home 🏠
- Notifications 🔔
- Orders 📦
- Profile 👤

**Tabs for Buyer:**

- Home/Browse 🏠
- Search 🔍
- Saved 💾
- Orders 📦
- Profile 👤

**Variants:**

- `tab=Home active`
- `tab=Home inactive`
- `tab=Notifications active`
- etc. (for each tab + state combination)

### 3.7 Rating Component

**Frame name:** `Rating/Display/Full`

**Elements:**

1. Stars (5 stars, each 16x16px)
2. Filled star: #F39C12 (★)
3. Empty star: #E0E0E0 (☆)
4. Rating text (14px Semibold): "4.8"
5. Count text (12px Caption): "(24 reviews)"

**Variants:**

- `rating=1` (1 filled star)
- `rating=2` (2 filled stars)
- `rating=3` (3 filled stars)
- `rating=4` (4 filled stars)
- `rating=5` (5 filled stars)
- `state=Empty` (0 filled stars)

**Interactive variant for review submission:**

- Large stars (32px) with hover states

---

## Part 4: Screen Design - Step by Step

### 4.1 Basic Screen Template

For each screen, create a frame:

1. **Frame name:** `[Flow]/[ScreenName]`
   - Example: `Farmer/Home Dashboard`
   - Size: 375x812px

2. **Hierarchy:**
   - Header section (background color, title, subtitle)
   - Content area (scrollable, use auto-layout for flexibility)
   - Footer/Navigation (bottom tabs or action buttons)

3. **Safe area:** Account for notch/status bar (top 44px typically)

### 4.2 Designing the Farmer Home Dashboard

**Step 1: Create Frame**

- Name: `Farmer/Home Dashboard`
- Size: 375x812px
- Background: #FFFFFF

**Step 2: Add Header**

- Rectangle (0, 0, 375, 80): Linear gradient #2D7A3B → #4A9D56
- Text "Hi, [Farmer Name]": 20px Semibold, white, centered
- Text "2 pending orders": 12px, white, opacity 0.9, centered

**Step 3: Add Stats Section** (using auto-layout)

- Container (375px width, margin: 16px)
- Two-column grid:
  - Card 1: "5" (24px bold) + "Active Listings" (12px caption)
  - Card 2: "2" (24px bold) + "Pending Orders" (12px caption, orange)
- Use card component with padding

**Step 4: Add Pending Orders Section**

- Title: "Pending Orders" (18px Heading 3)
- List: Use listing card component
  - Card 1: 🍅 + "Tomatoes (50kg)" + "From: Ama Mensah" + "⏱ Needs Response"
  - Card 2: 🌽 + "Maize (100 bags)" + "From: John Doe" + "⏱ Needs Response"
- Spacing: 12px between cards

**Step 5: Add Bottom Navigation**

- Use navigation component (bottom tabs)
- Active state on "Home"

**Step 6: Add Scrollable Content**

- Wrap content section in auto-layout with scrollable property
- Content height should exceed 812px to show scroll behavior

### 4.3 Designing Listing Detail Screen (Buyer)

**Frame:** `Buyer/Listing Detail`

**Structure:**

```
Header: "Fresh Tomatoes 🍅"
        "Premium quality from Adum farm"

Content (Scrollable):
  - Crop Type Card: "🍅 Tomato"
  - Pricing Card: "₵150/kg" + "50 kg available"
  - Seller Card: Rating + name + reviews
  - Location Card: "📍 Adum, Kumasi"

Footer:
  Button: "Express Interest" (Primary)
  Button: "❤️ Save Listing" (Secondary)
```

### 4.4 Designing OTP Verification Screen

**Frame:** `Auth/OTP Verification`

**Elements:**

1. Header: Centered, "Enter Verification Code"
2. OTP Input (6 separate boxes):
   - Use input component variant
   - Show: [1][2][3][4][5][6]
3. Resend timer: "Resend available in 45s"
4. Resend button: "Didn't receive a code? Resend" (secondary, disabled)
5. Verify button (primary, disabled until all 6 digits filled)
6. Back button

---

## Part 5: Creating Interactive Prototypes

### 5.1 Linking Screens (Farmer Flow)

1. **Open Prototype panel** (right sidebar in Figma)
2. **Create flows:**

**Onboarding Flow:**

```
Splash Screen →
Welcome Screen (onclick "Get Started") →
Role Selection (onclick "Farmer") →
Phone Registration (onclick "Send Code") →
OTP Verification (onclick "Verify") →
Profile Setup (onclick "Complete Setup") →
Home Dashboard
```

**Order Confirmation Flow:**

```
Home Dashboard (click "Pending Order") →
Order Details (Pending) (click "Confirm") →
Modal: "Confirm Order?" →
Order Details (Confirmed)
```

### 5.2 Prototyping Interactions

**Button states:**

1. Select button component
2. Add prototype interaction: "On Press"
3. Interaction type: "Change to" (if using variants)
4. Or "Navigate to" (if linking to another frame)

**Modal interactions:**

1. Create modal frame
2. Add overlay (semi-transparent black rectangle)
3. Prototype: Click action → Navigate to modal
4. Add close button → Navigate back

### 5.3 Animation Settings

When setting up transitions:

1. **Transition type:** "Ease in-out" for natural feel
2. **Duration:** 300ms (0.3 seconds) for screen transitions
3. **Distance:** Let Figma auto-calculate
4. **Easing:** Spring (iOS-like) for micro-interactions

---

## Part 6: Screen Checklist (25+ Total)

### Farmer Flow (13 screens)

- [ ] Splash Screen
- [ ] Welcome Screen
- [ ] Role Selection
- [ ] Phone Registration
- [ ] OTP Verification
- [ ] Profile Setup
- [ ] Profile Confirmation
- [ ] Home Dashboard
- [ ] Create Listing
- [ ] Order Details (Pending state)
- [ ] Order Details (Confirmed state)
- [ ] Notifications
- [ ] Profile Screen

### Buyer Flow (12+ screens)

- [ ] Splash Screen (reusable)
- [ ] Welcome Screen (reusable)
- [ ] Role Selection (reusable)
- [ ] Phone Registration (reusable)
- [ ] OTP Verification (reusable)
- [ ] Profile Setup (reusable)
- [ ] Marketplace Home
- [ ] Search Screen
- [ ] Listing Detail
- [ ] Express Interest
- [ ] Orders Screen
- [ ] Order Details (Multiple states: Pending, Confirmed, In Transit)
- [ ] Review Screen
- [ ] Saved Listings
- [ ] Profile Screen

### Error & Empty States (5+ screens)

- [ ] Offline/No Connection
- [ ] Empty Orders
- [ ] Empty Listings
- [ ] Error Message
- [ ] Network Error

---

## Part 7: Adding Accessibility Annotations

### 7.1 Using Figma Comments for Accessibility Notes

On each screen, add comments explaining accessibility features:

**Example Comment:**

```
✓ ACCESSIBILITY NOTES:
- All text has 4.5:1+ contrast ratio
- Buttons minimum 44x44px touch target
- Focus states visible (green outline)
- Form labels visible and associated
- Color + icon for status badges
- Button text clear and action-oriented
```

### 7.2 Creating an Accessibility Audit Artboard

**Page:** System → Accessibility

Add frames documenting:

- Contrast ratios tested
- Touch target verification
- Focus state specifications
- Alt text guidelines
- Color blindness considerations

---

## Part 8: Presentation & Final Polish

### 8.1 Creating a Presentation Frame

**New frame:** `Presentation/Overview`

Add text elements explaining:

1. **Design System Overview:**
   - Color palette with psychology
   - Typography philosophy
   - Spacing system rationale

2. **Design Principles:**
   - Clarity over cleverness
   - Action-oriented design
   - Trust building
   - Accessibility first

3. **User Flows:**
   - Farmer journey diagram
   - Buyer journey diagram
   - Key touchpoints

4. **Accessibility Highlights:**
   - WCAG 2.2 AA compliance
   - Contrast ratios
   - Touch targets
   - Clear error messages

### 8.2 Component Gallery Frame

Create a showcase of all components:

**Layout:**

- Buttons (all states in grid)
- Inputs (all states in grid)
- Cards (various examples)
- Badges (status variants)
- Navigation
- Modals

This serves as a visual inventory of your design system

### 8.3 Screen Gallery

Create a board showing all 25+ screens in a grid:

- Organized by flow (Farmer, Buyer, Error States)
- Thumbnail size for scanning
- Link each to full design

---

## Part 9: Final Checklist for 90-100% Score

### Visual Consistency (20%)

- [ ] Color palette used consistently across all screens
- [ ] Typography scale strictly followed (no random font sizes)
- [ ] Spacing follows 8pt grid consistently
- [ ] Corner radius consistent (8px buttons, 12px cards)
- [ ] Shadow elevation system applied correctly

### User-Centeredness (20%)

- [ ] Clear navigation between screens
- [ ] Intuitive user flows for farmer and buyer
- [ ] WCAG 2.2 AA accessibility compliance verified
- [ ] Error states provide helpful guidance
- [ ] Empty states encourage action

### Completeness (20%)

- [ ] 25+ screens designed (farmer, buyer, errors)
- [ ] All edge cases covered
- [ ] Component library complete (20+ components)
- [ ] Multiple states for each component
- [ ] Interactive prototypes linking major flows

### Professionalism (20%)

- [ ] High-fidelity mockups (not wireframes)
- [ ] Polished visual design
- [ ] Consistent design language
- [ ] Attention to detail (shadows, spacing, alignment)
- [ ] Production-ready organization

### Documentation (10%)

- [ ] Design system page clearly documented
- [ ] Component specs with measurements
- [ ] Color palette with hex codes and usage
- [ ] Typography scale documented
- [ ] Accessibility features highlighted
- [ ] Design rationale explained

### Innovation (10%)

- [ ] Thoughtful design reflecting app context (agriculture, Ghana)
- [ ] Engaging empty states
- [ ] Smooth, logical interactions
- [ ] Accessibility as a strength (not afterthought)
- [ ] Unique visual approach while maintaining usability

---

## Part 10: Exporting & Sharing

### 10.1 Export High-Fidelity Images

1. Select each screen frame
2. File → Export → PNG (2x scale for retina quality)
3. Create a folder: `/exports/screens`

### 10.2 Create Presentation PDF

1. File → Share
2. Generate shareable link
3. Export presentation view as PDF for submission

### 10.3 Organize for Submission

```
HarvestLink Design Submission/
├── Figma File (link)
├── Design System Documentation.pdf
├── Screen Exports (25+ PNG files)
├── Component Library.pdf
├── Accessibility Audit.pdf
└── Design Rationale Document.md
```

---

## Useful Figma Shortcuts & Tips

- **Cmd/Ctrl + K**: Create component
- **Cmd/Ctrl + Alt + K**: Create component set (for variants)
- **Shift + Cmd/Ctrl + L**: Create local variable (for colors)
- **Double-click component**: Edit main component
- **Right-click instance**: Edit as main component
- **Cmd/Ctrl + D**: Duplicate selected frame
- **Prototype panel**: Right sidebar, looks like play button (▶)
- **Assets panel**: View all components and color styles
- **View → Pixel Grid**: Show 8pt grid overlay

---

## Resources

- **Figma Community Components:** https://www.figma.com/community
- **Material Design 3:** https://m3.material.io
- **iOS Human Interface Guidelines:** https://developer.apple.com/design
- **WCAG 2.2 AA Guidelines:** https://www.w3.org/WAI/WCAG22/quickref
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

**Remember:** The goal is to create a design that looks professional and production-ready, not just a student project. Attention to detail, consistency, and thoughtful accessibility will differentiate your work and achieve top scores.

**Estimated Time:** 40-60 hours to complete this design system and all screens to high-fidelity standard. Break it into:

- Design System Setup: 5-8 hours
- Component Library: 5-8 hours
- Farmer Flow Screens: 10-15 hours
- Buyer Flow Screens: 10-15 hours
- Error States & Polish: 5-8 hours
- Prototyping & Interactions: 5-8 hours
- Documentation & Presentation: 3-5 hours
