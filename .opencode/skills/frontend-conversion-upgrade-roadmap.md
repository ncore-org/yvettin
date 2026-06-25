# Skill: Frontend Conversion Upgrade Roadmap

## Intent

Execute high-impact frontend upgrades for Yvettin without breaking existing brand style or route structure.

## Scope

- Frontend only (`yvettin.com/frontend`)
- Keep minimalist style and current palette direction
- Use React + existing shadcn/ui primitives

## Priority sequence

### Phase 1: Search reliability

1. Stabilize header search submit flow.
2. Ensure placeholder behavior remains correct in all input states.
3. Ensure search route query sync and deterministic navigation.

### Phase 2: Add-to-cart side panel

1. Add right-side slide panel on add-to-cart action.
2. Show item summary, variant, quantity, subtotal.
3. Add bottom actions:
   - continue shopping
   - go to cart
   - go to checkout

### Phase 3: Checkout completeness

1. Wire cart CTA to checkout route.
2. Implement full checkout content and step flow.
3. Allow payment methods only:
   - card
   - PayPal
4. Add thank-you/confirmation route.

### Phase 4: Home content extension

1. Add two new sections to homepage.
2. Keep content subtle and conversion-relevant.
3. Insert one minimalist bridge/banner block between existing sections.

### Phase 5: Product detail UX raise

1. Improve media, variant, and stock feedback UX.
2. Expand variant realism and variant-level logic.
3. Add delivery ETA messaging logic.
4. Add loyalty points visibility and purchase-point feedback.

## Acceptance checklist

- `npm run lint` passes (warnings documented if pre-existing)
- `npm run build` passes
- No introduced 404 on touched routes
- Mobile and desktop visual parity maintained
- Product card box style remains consistent with current design language
