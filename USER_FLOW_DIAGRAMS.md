# HarvestLink UI/UX Design - User Flow Diagrams & Journeys

**Purpose:** Visual representation of complete user journeys for farmers and buyers

**Format:** ASCII diagrams + flow descriptions

---

## Part 1: Complete Farmer User Journey

### Flow Chart: "Harvest → List → Sell → Deliver → Review"

```
┌─────────────────────────────────────────────────────────────┐
│                    FARMER COMPLETE JOURNEY                  │
└─────────────────────────────────────────────────────────────┘

                           START
                            ↓
                    ┌─────────────────┐
                    │  Splash Screen  │
                    │   (2-3 seconds) │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Already Logged  │ No
                    │      In?        │──→ Continue
                    └────────┬────────┘
                          Yes│
                             ↓
                    ┌─────────────────────────────────────┐
                    │     ONBOARDING (New Users Only)    │
                    ├─────────────────────────────────────┤
                    │ ✓ Welcome Screen                   │
                    │ ✓ Role Selection (Farmer selected) │
                    │ ✓ Phone Registration + OTP         │
                    │ ✓ Profile Setup (Name, Photo, Loc) │
                    │ ✓ Success Confirmation             │
                    └────────┬────────────────────────────┘
                             ↓
                    ┌─────────────────┐
                    │  HOME DASHBOARD │ ◀─ Main Entry Point
                    │   (Farmer)      │    After Login
                    └────────┬────────┘
                             ↓
                   ╔═════════════════════╗
                   ║  Create New Listing │
                   ║  (Primary Flow)     ║
                   ╚═════════╦═══════════╝
                             ↓
                    ┌─────────────────────┐
                    │  List Harvest Form  │
                    │ - Crop Type         │
                    │ - Quantity/Unit     │
                    │ - Price/Unit        │
                    │ - Photos (1-4)      │
                    │ - Location          │
                    │ - Harvest Date      │
                    └────────┬────────────┘
                             ↓
                    ┌─────────────────┐
                    │  Validate Form  │
                    └────────┬────────┘
                             ↓
                       Is Valid?
                        /      \
                    Yes/        \No → Show Error → Back to Form
                     /            \
                    ↓
            ┌──────────────────┐
            │ Submit Listing   │
            │ (Save Locally +  │
            │ Sync when online)│
            └─────────┬────────┘
                      ↓
            ┌──────────────────────┐
            │ "Listing Created!"   │
            │ (Success Toast)      │
            └─────────┬────────────┘
                      ↓
        ┌─────────────────────────────┐
        │ Listing is Now ACTIVE       │
        │ (Visible to Buyers)         │
        │ (Appears in Marketplace)    │
        └─────────┬───────────────────┘
                  ↓
      ╔═══════════════════════════════╗
      ║  WAIT FOR BUYER INTEREST      ║
      ║  (Notifications Start)        ║
      ╚═════════╦═══════════════════╝
                ↓
    ┌──────────────────────────────┐
    │ NOTIFICATION: New Order      │
    │ "John Kofi wants 50kg        │
    │  tomatoes - ₵2,500 total"    │
    └──────┬───────────────────────┘
           │ Farmer receives push notification
           ↓
    ┌──────────────────────┐
    │ TAP NOTIFICATION OR  │
    │ GO TO ORDERS TAB     │
    └──────┬───────────────┘
           ↓
    ┌──────────────────────────────┐
    │  ORDER DETAILS SCREEN        │
    │  Status: PENDING             │
    ├──────────────────────────────┤
    │ Buyer: John Kofi             │
    │ Rating: ⭐4.6 (18)          │
    │ Quantity: 50kg               │
    │ Total: ₵2,500                │
    │                              │
    │ [Confirm] [Decline]          │
    └──────┬───────────────────────┘
           ↓
           ├─→ If Confirm:            ├─→ If Decline:
           │                          │
           ↓                          ↓
    ┌─────────────────┐      ┌──────────────────┐
    │ Status: CONFIRM │      │ Status: DECLINED │
    │ (Green Badge)   │      │ Buyer Notified   │
    │ Ready for       │      │ Listing Remains  │
    │ Delivery        │      │ Active for Others│
    └────────┬────────┘      └──────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ COORDINATE DELIVERY          │
    │ - Farmer contacts buyer      │
    │ - Arrange pickup/delivery    │
    │ - Share location (optional)  │
    │ - Chat with buyer (in-app)   │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ Mark as IN_TRANSIT           │
    │ (Farmer updates status)      │
    │ Location tracking enabled    │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ DELIVERY COMPLETE            │
    │ Buyer confirms receipt       │
    │ Farmer sees: DELIVERED badge │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ BUYER SUBMITS REVIEW         │
    │ ⭐⭐⭐⭐⭐ + Comment         │
    │ "Quality was amazing!"       │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ FARMER VIEWS REVIEW          │
    │ See rating + comment         │
    │ Review added to profile      │
    │ Rating improves (4.8 → 4.85) │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ TRANSACTION COMPLETE         │
    │ Order archived               │
    │ Earnings updated             │
    │ Listing remains active       │
    └────────┬─────────────────────┘
             ↓
    ┌──────────────────────────────┐
    │ REPEAT OR MODIFY             │
    │ - Create new listing         │
    │ - Edit existing              │
    │ - View analytics             │
    │ - Manage profile             │
    └──────────────────────────────┘
```

### Detailed Farmer Decision Points

```
FARMER DECISION POINT 1: After Onboarding
┌─────────────────────────────────────────────┐
│ "What would you like to do?"                │
├─────────────────────────────────────────────┤
│ A) Create Listing (Primary)                 │
│    └─→ Leads to List Harvest Form           │
│                                              │
│ B) Browse Buyers (Secondary)                │
│    └─→ Leads to Buyer Profiles              │
│                                              │
│ C) View Profile Settings                    │
│    └─→ Leads to Profile/Settings            │
│                                              │
│ D) Continue Later (Skip)                    │
│    └─→ Closed, app bookmarked               │
└─────────────────────────────────────────────┘

FARMER DECISION POINT 2: Listing Review
┌─────────────────────────────────────────────┐
│ "Before publishing, confirm details:"       │
├─────────────────────────────────────────────┤
│ Crop: Tomatoes                              │
│ Qty: 50kg                                   │
│ Price: ₵50/kg = ₵2,500 total               │
│ Location: Kumasi, Ghana                     │
│ Photos: 3 uploaded                          │
│                                              │
│ A) [List Harvest] - Continue (Primary)      │
│    └─→ Listing published, buyers see it     │
│                                              │
│ B) [Edit] - Go back to form                 │
│    └─→ Return to listing form               │
│                                              │
│ C) [Save Draft] - Save for later            │
│    └─→ Saved locally, not published         │
└─────────────────────────────────────────────┘

FARMER DECISION POINT 3: Order Received
┌─────────────────────────────────────────────┐
│ "Buyer expressed interest. Confirm order?"  │
├─────────────────────────────────────────────┤
│ Buyer: John Kofi                            │
│ Amount: ₵2,500 for 50kg tomatoes           │
│ Rating: ⭐4.6                               │
│                                              │
│ A) [Confirm] - Accept order (Primary)       │
│    └─→ Start delivery coordination          │
│                                              │
│ B) [Ask Buyer] - Request quantity change    │
│    └─→ Open chat, negotiate                 │
│                                              │
│ C) [Decline] - Reject order                 │
│    └─→ Listing remains active for others    │
└─────────────────────────────────────────────┘
```

---

## Part 2: Complete Buyer User Journey

### Flow Chart: "Browse → Search → Order → Receive → Review"

```
┌─────────────────────────────────────────────────────────────┐
│                     BUYER COMPLETE JOURNEY                  │
└─────────────────────────────────────────────────────────────┘

                           START
                            ↓
                    ┌─────────────────┐
                    │  Splash Screen  │
                    │   (2-3 seconds) │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │ Already Logged  │ No
                    │      In?        │──→ Continue
                    └────────┬────────┘
                          Yes│
                             ↓
                    ┌──────────────────────────────────────┐
                    │     ONBOARDING (New Users Only)     │
                    ├──────────────────────────────────────┤
                    │ ✓ Welcome Screen                     │
                    │ ✓ Role Selection (Buyer selected)   │
                    │ ✓ Phone Registration + OTP          │
                    │ ✓ Profile Setup (Name, Photo, Loc)  │
                    │ ✓ Success Confirmation              │
                    └────────┬─────────────────────────────┘
                             ↓
                    ┌─────────────────┐
                    │  MARKETPLACE    │ ◀─ Main Entry Point
                    │  HOME SCREEN    │    After Login
                    │  (Buyer)        │
                    └────────┬────────┘
                             ↓
                 ╔════════════════════════╗
                 ║  BROWSE NEARBY LISTINGS║
                 ║  (Passive Discovery)   ║
                 ╚════════════╦═══════════╝
                              ↓
                 ┌────────────────────────┐
                 │ See Listings Near Me:  │
                 │ - Fresh Tomatoes       │
                 │ - Maize (Corn)         │
                 │ - Cassava              │
                 │ - Plantain             │
                 │ (Sorted by distance)   │
                 └──────────┬─────────────┘
                            ↓
                 ┌────────────────────────┐
                 │ Interested in Listing? │
                 └──────┬─────────────────┘
                        │
                    Yes │  │ No
                        │  └─→ Scroll to next
                        ↓
           ╔════════════════════════════════╗
           ║  TAP LISTING (View Details)    ║
           ╚════════════╦═══════════════════╝
                        ↓
           ┌────────────────────────────────┐
           │  LISTING DETAIL SCREEN         │
           ├────────────────────────────────┤
           │ Images (Carousel)              │
           │ Crop: Fresh Tomatoes           │
           │ Price: ₵50/kg                  │
           │ Qty: 50kg available            │
           │ Farmer: Kwame Mensah ⭐4.8    │
           │ Location: Kumasi, 2.5km away   │
           │ Reviews (top 3)                │
           │                                │
           │ [Express Interest] [Chat] [❤] │
           └──────┬───────────────────────┘
                  │
                  ├─ [❤] Heart: Save listing
                  │        └─→ Added to Saved
                  │
                  ├─ [Chat]: Message farmer
                  │         └─→ Open chat
                  │
                  └─ [Express Interest]: Primary CTA
                             ↓
                  ┌──────────────────────────┐
                  │ CONFIRM ORDER SCREEN     │
                  ├──────────────────────────┤
                  │ Quantity: 50 kg [↓ ↑]   │
                  │ Unit: kg                 │
                  │ Price: ₵50/kg            │
                  │ Total: ₵2,500            │
                  │                          │
                  │ [Express Interest]       │ ← Primary
                  │ [Cancel]                 │ ← Secondary
                  └────────┬─────────────────┘
                           ↓
                  ┌──────────────────────────┐
                  │ INTEREST SUBMITTED       │
                  │ Farmer will respond soon │
                  │ (Toast notification)     │
                  └────────┬─────────────────┘
                           ↓
           ╔════════════════════════════════╗
           ║  WAIT FOR FARMER CONFIRMATION  ║
           ║  (1-4 hours typical)           ║
           ╚════════════╦═══════════════════╝
                        ↓
           ┌────────────────────────────────┐
           │ NOTIFICATION: Order Confirmed  │
           │ "Kwame confirmed your order    │
           │  for 50kg tomatoes. Ready to   │
           │  arrange pickup/delivery."     │
           └──────┬───────────────────────┘
                  │ Buyer taps notification or
                  │ goes to Orders tab
                  ↓
           ┌──────────────────────────────────────┐
           │ ORDER DETAILS SCREEN                 │
           │ Status: CONFIRMED (Green)            │
           ├──────────────────────────────────────┤
           │ Farmer: Kwame Mensah ⭐4.8          │
           │ Product: Fresh Tomatoes              │
           │ Quantity: 50 kg                      │
           │ Total: ₵2,500                        │
           │                                      │
           │ [Chat with Farmer] [Call Farmer]     │
           │                                      │
           │ Pickup/Delivery Location:            │
           │ 📍 Kumasi Central Market             │
           │ Time: Flexible (Arrange with Farmer) │
           └────────┬──────────────────────────────┘
                    ↓
           ┌─────────────────────────────┐
           │ COORDINATE DELIVERY         │
           │ Buyer contacts farmer       │
           │ Arrange time & location     │
           │ Optional: Share location    │
           │ Chat in-app if preferred    │
           └────────┬────────────────────┘
                    ↓
           ┌─────────────────────────────┐
           │ LIVE TRACKING (Optional)    │
           │ If farmer enabled sharing:  │
           │ - See farmer's location     │
           │ - Live ETA                  │
           │ - Chat driver/farmer        │
           └────────┬────────────────────┘
                    ↓
           ┌─────────────────────────────┐
           │ DELIVERY & HANDOFF          │
           │ Meet farmer/driver          │
           │ Receive produce             │
           │ Check quality               │
           └────────┬────────────────────┘
                    ↓
           ┌──────────────────────────────┐
           │ MARK DELIVERED (in app)      │
           │ Buyer confirms receipt       │
           │ Transaction status changes   │
           │ from IN_TRANSIT → DELIVERED  │
           └────────┬─────────────────────┘
                    ↓
           ┌────────────────────────────────────┐
           │ REVIEW & RATING SCREEN             │
           ├────────────────────────────────────┤
           │ "How was your experience?"         │
           │                                    │
           │ Star Rating (interactive):         │
           │ ★★★★★ (5 stars)                   │
           │                                    │
           │ Optional Comment:                  │
           │ [Text box] "Quality was amazing!  │
           │  Fresh, ripe, and delivered on    │
           │  time. Highly recommend!"]        │
           │                                    │
           │ [Submit Review]  [Skip]            │
           └────────┬─────────────────────────┘
                    ↓
           ┌────────────────────────────────────┐
           │ REVIEW SUBMITTED                   │
           │ Farmer receives notification       │
           │ Order marked COMPLETED             │
           │ Rating added to farmer's profile   │
           └────────┬─────────────────────────┘
                    ↓
           ┌────────────────────────────────────┐
           │ TRANSACTION FULLY COMPLETE         │
           │ - Order archived in history        │
           │ - Farmer can view review           │
           │ - Farmer's rating updated          │
           │ - Buyer can purchase again         │
           └────────┬─────────────────────────┘
                    ↓
           ┌────────────────────────────────────┐
           │ REPEAT OR EXPLORE                  │
           │ - Search for more produce          │
           │ - Save favorite farmers            │
           │ - Reorder from same farmer         │
           │ - View order history               │
           │ - Manage profile                   │
           └────────────────────────────────────┘
```

### Detailed Buyer Decision Points

```
BUYER DECISION POINT 1: Browsing vs Searching
┌──────────────────────────────────────────────┐
│ "How do you want to find produce?"           │
├──────────────────────────────────────────────┤
│ A) BROWSE (Passive)                         │
│    - Scroll nearby listings                 │
│    - Filter by crop type                    │
│    - Discover new farmers                   │
│    └─→ Good for: "What's available today?"  │
│                                              │
│ B) SEARCH (Active)                          │
│    - Search for specific crop               │
│    - Apply filters (distance, price)        │
│    - Find best prices                       │
│    └─→ Good for: "I need 50kg of maize"    │
│                                              │
│ Both accessible from Marketplace home       │
└──────────────────────────────────────────────┘

BUYER DECISION POINT 2: Save vs Order
┌──────────────────────────────────────────────┐
│ "When viewing a listing:"                   │
├──────────────────────────────────────────────┤
│ A) [❤] Save for Later                       │
│    - Not ready to buy now                   │
│    - Like the listing                       │
│    - Can revisit in Saved tab               │
│    └─→ Removes from immediate action        │
│                                              │
│ B) [Express Interest]                       │
│    - Ready to buy now                       │
│    - Farmer will confirm                    │
│    - Enter quantity & confirm               │
│    └─→ Creates order request                │
│                                              │
│ C) [Chat Farmer]                            │
│    - Have questions first                   │
│    - Negotiate quantity/price               │
│    - Discuss details                        │
│    └─→ Open chat, no order yet              │
└──────────────────────────────────────────────┘

BUYER DECISION POINT 3: Confirming Order
┌──────────────────────────────────────────────┐
│ "Farmer confirmed your order. Now:"         │
├──────────────────────────────────────────────┤
│ A) [Chat with Farmer]                       │
│    - Arrange delivery details               │
│    - Confirm time/location                  │
│    - Ask questions                          │
│    └─→ Coordinate pickup                    │
│                                              │
│ B) [Call Farmer]                            │
│    - Quick phone conversation               │
│    - Direct contact                         │
│    - Real-time confirmation                 │
│    └─→ Immediate coordination               │
│                                              │
│ C) [View Location]                          │
│    - See farmer's location                  │
│    - Calculate travel time                  │
│    - Plan pickup                            │
│    └─→ Navigate to farmer                   │
└──────────────────────────────────────────────┘

BUYER DECISION POINT 4: Reviewing
┌──────────────────────────────────────────────┐
│ "Order delivered. Please review:"           │
├──────────────────────────────────────────────┤
│ A) [Submit Review]                          │
│    - Rate farmer (stars)                    │
│    - Write comment                          │
│    - Help others make decision              │
│    └─→ Review published                     │
│                                              │
│ B) [Skip]                                   │
│    - Don't want to review                   │
│    - Will review later                      │
│    - Can't rate after skip                  │
│    └─→ Order closed without review          │
└──────────────────────────────────────────────┘
```

---

## Part 3: Critical User Paths (Happy Paths)

### Fastest Path: Browse → Order → Receive (< 1 hour)

```
Buyer: "I need tomatoes today"

[Marketplace Home]
     ↓ (See tomato listing nearby)
[View Listing]
     ↓ (Farmer quality looks good)
[Express Interest] (Tap)
     ↓ (Quantity: 10kg, ₵500 total)
[Confirm Interest] (Tap)
     ↓ (Success: "Interest sent")

Farmer receives notification
(Confirms within 15 minutes)

Buyer gets notification
     ↓
[Go to Orders]
     ↓ (Status: CONFIRMED)
[Chat with Farmer]
     ↓ (Arrange: "Meet in 20 mins at market")
     ↓ (Buyer: "See you in 20")

~20 minutes later

[Meet at location]
     ↓ (Inspect produce, handoff)
[Mark Delivered] (Tap)
     ↓ (Status: DELIVERED)
[Rate Farmer]
     ↓ (⭐⭐⭐⭐⭐ "Great quality!")
[Submit Review]
     ↓
✓ COMPLETE (Total time: ~1 hour)
```

### Full Path: Search → Negotiate → Deliver → Review (2-4 hours)

```
Buyer: "Need 50kg maize for bulk order"

[Search Tab]
     ↓ (Type: "maize")
[Apply Filters]
     ↓ (Price: ₵10-15/kg, Distance: <10km)
[Results: 12 listings]
     ↓ (Review 3 options)
[Select Best Price Farmer]
     ↓

[Listing Detail]
     ↓ (See: Kofi's Maize Farm)
     ↓ (Price: ₵12/kg = ₵600 for 50kg)
[Chat Farmer] (Negotiate)
     ↓
Buyer: "Can you do ₵10/kg for 50kg?"
Farmer: "₵11/kg minimum for that qty"
Buyer: "Done! 50kg at ₵11/kg"
     ↓
[Back to Listing]
[Express Interest] (50kg, ₵550 total)
     ↓

Farmer confirms within 30 mins
     ↓
[Orders Tab → Order Details]
     ↓ (Status: CONFIRMED)
[Call Farmer]
     ↓ (Arrange: "Tomorrow 8am pickup")
     ↓ (Confirm time & location)

Next morning

[Live Tracking] (Optional)
     ↓ (See farmer approaching)
[Receive Delivery]
     ↓ (Inspect 50kg bags)
[Mark Delivered]
     ↓ (Status: DELIVERED)
[Rate & Review]
     ↓ (⭐⭐⭐⭐ "Good quality, fair price")
     ↓
✓ COMPLETE (Total time: 26+ hours, but ~4 hours active)
```

---

## Part 4: Error & Recovery Paths

### Path 1: Farmer Declines Order

```
Buyer places order → Farmer sees notification
                                    ↓
                          Farmer reviews order
                          (Kwame's Farm is busy)
                                    ↓
                          [Decline] (Tap)
                                    ↓
Buyer gets notification:
"Kwame couldn't fulfill this order.
 Check similar listings below"
                                    ↓
                    [Show Similar Listings]
                                    ↓
                    (Cassava from different farmer)
                                    ↓
                    [Express Interest]
                    (New order placed)
                                    ↓
                    (Different farmer confirms)
                                    ↓
                    ✓ RESOLVED
```

### Path 2: Network Connection Lost

```
Farmer creating listing (mid-form)
                    ↓
Network drops (no WiFi/data)
                    ↓
Local auto-save activates
"Saving locally..."
                    ↓
Form saved to device
"Draft saved (syncing when online)"
                    ↓
Farmer closes app
(Can continue when network restored)
                    ↓
Network restored
                    ↓
Auto-sync in background
"Syncing... (1 of 1 draft)"
                    ↓
✓ Draft uploaded to server
  Listing published when sync complete
```

### Path 3: Wrong OTP Entered

```
Buyer enters OTP: 123456
                    ↓
[Verify] (Tap)
                    ↓
Server validation: "Code incorrect"
                    ↓
Error appears (red):
"Incorrect code. Please try again."
                    ↓
OTP boxes shake animation (feedback)
                    ↓
Buyer enters correct OTP: 789456
                    ↓
[Verify] (Tap)
                    ↓
✓ Verified (Navigate to next screen)
                    ↓
Or [Resend] if code expired
```

---

## Part 5: Notification Flow

### Order-Related Notifications

```
FARMER NOTIFICATIONS:

1. New Interest in Listing
   "John Kofi is interested in 50kg tomatoes"
   Tap → View Order Details
   Action needed: Confirm or Decline

2. Order Expired (No response)
   "Your interest in tomatoes expired after 2hrs"
   No action required (informational)

3. Buyer Cancelled Order
   "Buyer cancelled order for 50kg tomatoes"
   No action required (informational)

4. Delivery Completed
   "Delivery confirmed for 50kg tomatoes (₵2,500)"
   Tap → View Rating/Review
   Action optional: View buyer's review

5. New Review
   "John Kofi left you a ⭐⭐⭐⭐⭐ review"
   Tap → Read review
   Action optional: Respond (if reply feature exists)


BUYER NOTIFICATIONS:

1. Farmer Confirmed Order
   "Kwame confirmed your tomato order (₵2,500)"
   Tap → Chat/Arrange Delivery
   Action needed: Coordinate pickup

2. Listing Sold Out
   "Kwame's tomatoes you were interested in are sold"
   Tap → See Similar
   Action optional: Find alternatives

3. Order Ready for Pickup
   "Kwame has your order ready! Arrive by 5pm"
   Tap → Live Location
   Action needed: Arrange pickup

4. Delivery In Transit
   "Kwame is on the way with your order (ETA: 10min)"
   Tap → Live Tracking
   Action optional: Monitor delivery

5. Ready to Review
   "Order delivered! Please rate your experience"
   Tap → Review Screen
   Action needed: Rate farmer

```

---

## Part 6: Edge Cases & Alternative Flows

### Case 1: Same Buyer + Farmer (Repeat Customers)

```
Buyer and Farmer have prior transaction history
                    ↓
[Quick Reorder] option appears
                    ↓
"Reorder from Kwame"
[Previous Order: 50kg Tomatoes]
[Same Qty/Price?] YES/CHANGE
                    ↓
[Confirm] (Faster checkout)
                    ↓
Farmer receives familiar order
✓ Faster confirmation (both trust each other)
```

### Case 2: Buyer Wants to Negotiate

```
[View Listing]
Price: ₵50/kg
Qty: 50kg
Total: ₵2,500
                    ↓
Buyer wants lower price
                    ↓
[Chat Farmer] (Before ordering)
Buyer: "Can you do ₵45/kg?"
Farmer: "Minimum ₵48/kg"
Buyer: "OK, 48/kg works"
                    ↓
[Return to Listing]
Note: "Discussed price in chat"
                    ↓
[Express Interest]
(Farmer knows context from chat)
                    ↓
Farmer confirms at agreed price
✓ Negotiation complete
```

### Case 3: Farmer With Multiple Crops

```
Farmer Home Shows:
- Active Listings: 3
  ├─ 50kg Tomatoes (AVAILABLE)
  ├─ 100kg Maize (AVAILABLE)
  └─ 20kg Cassava (NEGOTIATING - 1 pending order)
                    ↓
Buyer can:
A) Buy all 3 crops from same farmer (bulk)
B) Buy individually
C) Wait for cassava to be available
                    ↓
Each order creates separate transaction
Orders appear in buyer's Orders list
✓ Handled independently
```

---

## Conclusion

These complete user flows demonstrate:

✅ **Clarity:** Users always know where they are in the journey
✅ **Simplicity:** Paths are direct, minimal decisions
✅ **Recovery:** Error states have clear recovery paths
✅ **Efficiency:** Happy paths are optimized (fastest possible)
✅ **Accessibility:** Alternative paths for different preferences
✅ **Context:** Notifications and states guide users

The design supports both **passive discovery** (browsing) and **active search**, accommodating different user behaviors and decision-making styles.
