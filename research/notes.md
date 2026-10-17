# Bánh Bánh — research notes

Compiled 17 October 2026 for a speculative redesign of banhbanh.com.

## Sources

- **banhbanh.com** (a Framer site): all six pages, the HTML and JS bundles, the two Brixton menu images, the Little Bánh Bánh menu image (`vEy38uUX1fRbsMUKisdCr6HIW1E.jpg`, linked from that page's "Menu" button), and the 11 photos named in the brief.
- **Toast Tables** public booking API (profile, bookable hours, live availability, policy) and **Google Maps** listing data (rating, hours, "Order online" links).
- **2026 press:**
  - Restaurant Online, 17 Feb
  - London on the Inside, 16 Feb
  - Broadsheet, Jo Taylor, 8 Apr
  - The Observer, 18 Apr
  - Livingetc, 21 Apr
  - We Heart, Lisa Davidson, 28 Apr (photos by Anton Rodriguez)
  - DesignMyNight, Jun
  - Dezeen, 26 Jun
  - Anima
  - The Nudge, Immy Smith, 18 Aug (8.0, ££)
  - olive, 11 Oct
- **Reviews:** First Table's public review feed (193 reviews, 82 with text) and the Wanderlog mirror of Google's ratings.
- **Could not reach:**
  - Blocked by Cloudflare: Deliveroo, SquareMeal, Tripadvisor.
  - Instagram: rate-limited, and the viewer sites were blocked too.
  - Google Maps review text: never loaded.
  - For all of these I used search snippets only, and treat them as unverified.

## The room

The press accounts agree on the order of the walk-through, and the site is built in the same order.

1. **Corridor.** A long, dim, quiet entrance corridor ("softly lit", The Nudge; "a long, serene entrance", Restaurant Online). Joseph Losper: *"As you enter, you can't see much… and then you move through and everything kind of reveals itself."*
2. **Shrine.** At the end of the corridor is an illuminated shrine finished in pink tile, with statues of Thổ Địa (god of the land) and Thần Tài (god of wealth), dressed with fruit, flowers and incense.
   - No photograph of it has been published, either by the restaurant or in the press.
3. **The dining room.** It takes its cues from Vietnamese modernism; Dezeen cites Saigon's Independence Palace as a reference.
   - Curved, full-height glass-block walls.
   - Cool concrete and lime plaster.
   - Walnut panelling hiding "almost one hundred hand-painted still lifes" (Anima).
   - Iron-oxide yellow frescoes by Tomio Shota of figures at a red-clothed table, a fish, a robed figure and a curtain, painted over several weeks in metal leaf, sand, iron oxide and powdered shell.
   - Pale blue banquettes, round dark tables, bamboo-style chairs, blue-and-white bowls, globe wall lights.
   - Wool tapestries.
   - A hand-painted folding screen: *A Quartet of Ladies* (2026), per Livingetc.
   - Ceramic hòn non bộ landscapes by AP Nguyen.
   - A raised platform after the phản.
4. **Group rooms.** There are two group dining rooms (Dezeen). Their photo shows one: a wall of glowing textured glass blocks, plywood panels painted with small motifs, a grey table and red rush-seat chairs.
5. **Front room and terrace.** A pink plywood room up front with fold-away doors. It becomes a covered terrace under an aquamarine Vietnamese ceiling fan, and has turquoise-framed internal windows. It is seen through an octagonal concrete opening.
6. **The intent.** AP Nguyen wants the place calm, somewhere to stay a while, and *"crucially, affordable"* (Broadsheet). Losper calls it *"a space for slowing down, sharing food and connecting."*

## Their voice

Their own copy is short, warm and a little lyrical. It uses full Vietnamese spellings with diacritics, and Vietnamese section names with an English gloss underneath (KHAI VỊ / Starters).

- "Celebrating Vietnamese home style cooking in South London. Authentic family sharing dishes."
- "Built on over 10 years of cooking, guided by Cơm Nhà: family style home cooking, made for sharing."
- "A culinary amulet, a ritual of comfort and joy. Each visit offering a sense of home, a familiar warmth, and a little piece of belonging to carry with you again and again."
- "Familiar classics, from our home to yours."
- "Got a group bigger than 10? Get in touch…"

They don't use superlatives or exclamation marks. Their badge says **EST. 2014**, but the press gives 2016 for Peckham, so the site states no founding year and keeps their "over 10 years" line.

## The food

- **The current menu** (transcribed in full into `src/data/restaurant.ts`):
  - Khai Vị (starters): 5 dishes.
  - Mẹt (bamboo grazing platters, priced per person, minimum 2): 4 platters at £14–17pp.
  - Cơm Nhà (mains): 5 dishes.
  - Ăn Kèm (sides): 4 dishes.
  - Dietary marks: [vg] vegan, [gf] gluten free, [p] peanuts.
- **No phở at dinner, on purpose.** AP Nguyen: *"People in Vietnam don't eat pho for dinner… They eat it for breakfast as a kind of solo dining experience. For dinner it's about sharing."*
  - Phở is still on Little Bánh Bánh's weekday lunch menu, and olive (Oct) says the original menu "lives on at lunchtime and for takeaway".
  - Pre-relaunch complaints were mostly about phở portions. The relaunch removes that comparison at dinner.
- **Differences between the press and the current menu** (the site follows the menu):
  - The press says "clam broth"; the menu has a mussel broth, Canh Chua Vẹm.
  - The press calls the cakes platter the "Bánh Bánh platter" (rice cakes, tapioca dumplings, crispy rice). The menu lists Bánh Mặn 2 Miền: bánh rán from Hà Nội and bánh bèo from Huế.
  - The press mentions beef cabbage rolls and sugarcane wraps; the menu has pork cabbage rolls and starfruit.
- **Drinks** (from the press; no prices published):
  - Sesame Boulevardier, jasmine Martini, coriander Margarita.
  - Tamarind Fizz (Anima calls it a soft drink).
  - Wine by the glass or bottle from Vining Street Wine Club.
  - Beer.

## Who eats there, and when

- **Evenings:** Monday, Wednesday, Thursday and Friday. Lunch and dinner on Saturday and Sunday. Closed Tuesday.
  - Before the relaunch, Saturdays were packed and weeknights quiet.
- **Groups:** birthdays and parties (one review mentions "a huge party of 30"), built around the mẹt. Semi-private space seats up to 10, with full or semi-private hire above that.
  - SquareMeal lists "an intimate Christmas party space for up to 10 people".
- **Date nights and "intimate corners"** (olive), families (high chairs), locals and regulars, and design-led visitors drawn by the press.
- **Little Bánh Bánh (Fleet Street):** weekday City lunch, eaten solo and fast, plus office catering.
  - Google: 4.6 from 49 reviews. Deliveroo: 4.7 from 56.

## What reviewers praise and complain about

- **Praise:**
  - The room ("art installation", The Nudge; "love the interiors").
  - The mẹt for groups ("Get the whole table involved with one of the generous mẹt platters", The Nudge).
  - Dishes you rarely see in London.
  - Warm service (First Table: service 4.61).
  - Value ("££").
- **Since reopening:** every First Table review from June to August is 4 or 5 stars. One mild note: "some missing choices but kindly substituted".
- **Complaints, nearly all from before the relaunch:**
  - Small phở portions.
  - Slow service on packed Saturdays.
  - Empty weeknights.
  - Pricey drinks.
  - Dishes running out.
  - Noise, once.
- **Google:** 4.6 from 504–505 ratings. Most of these predate the new room and menu, and Tripadvisor still shows the restaurant as "Temp Closed".

## Conflicts and gaps found

- **Postcode:** the footer says SW9 8HQ, a postcode terminated in 1981. The correct one is **SW9 8QH**.
- **Hours** (the site uses the home-page set):

  | Source | Weekend evenings | Other differences |
  |---|---|---|
  | banhbanh.com home page | 6–10pm Sat, 6–9pm Sun | Sat and Sun lunch 12–3pm; Tuesday closed |
  | banhbanh.com other pages (per brief) | Sat 12–10pm, Sun 12–9pm | — |
  | Google and Toast | from 5pm | — |
  | SquareMeal | from 4pm | — |
  | Broadsheet, April | — | Tuesday open, Friday lunch |

- **Online booking (Toast):**
  - Takes parties of 1–8 only, while the website says groups of up to 10.
  - Has no weekend dinner slots on any date tested.
  - Has no festive dates set up.
  - Has no phone number, and its website link returns a 404.
- **Delivery:** the "Order Now" button goes to Deliveroo's home page.
  - The Brixton listing is `deliveroo.co.uk/menu/london/brixton/banh-banh-coldharbour`, per Google's "Order online" link.
  - Little Bánh Bánh's listing (`…/holborn/little-banh-banh-vietnamese-deli`) isn't linked from the site at all.
  - Other "Bánh Bánh at Home" kitchens exist (Wandsworth, Bermondsey, Brent Cross, Dulwich). I could not confirm which ones the Group runs.
- **Menus:** the menus are images only, and Little Bánh Bánh's is behind an unlabelled button.
- **Catering:** a single line of copy, with no menu or way to enquire.
- **Link preview:** there is no og:image.
- **Founding:** the badge says 2014; the press says 2016.

## Design reasoning

- **Wordmark and badge:** traced to SVG from their own PNGs, so they stay sharp and can be recoloured.
- **Type:** the same pair as their printed menus and Framer site.
  - **Oswald** for Vietnamese dish names and section heads.
  - **Crimson Pro** for body text.
  - Both are self-hosted with their Vietnamese subsets, so the diacritics in "Bánh Bánh · mẹt · nước chấm · cơm nhà" render correctly.
- **Palette:**
  - From their menu: menu paper `#FFF6ED`, dish-name brown `#521E10`, terracotta section heads `#CC542D`.
  - Wordmark cream `#FDFCDD`.
  - Badge olive `#363722`.
  - Sampled from the room: walnut `#73472B`, fresco iron-oxide yellow `#C2850C`, concrete `#A09E96`, shrine pink `#F2C6B6`, aquamarine fan `#5FAE9E`, glass-block light `#E6ECE1`.
  - They don't use red-and-gold or anything else "oriental".
- **Structure:** the home page follows the room. A dim corridor opens onto the lit pink shrine, and then the dining room widens out as you scroll.
  - The mẹt is shown from above, as a plan of the table, and leads into booking for your party size.
  - Opening hours become a wall of glass blocks that light up when they're open.
  - Little Bánh Bánh switches to daylight: white tile and pale glass block, as in its photo.
- **Photography:**
  - Their own photos are used wherever they exist.
  - Two Anton Rodriguez / We Heart shots, credited, cover views their set lacks: the long room with its curved glass-block wall, and the pink front room under the aquamarine fan.
  - The shrine is drawn, because no photo of it exists.

## What the owners most want this site to do

1. Fill Brixton's tables, especially groups around the mẹt (Christmas is being booked now) and the weekend evenings Toast can't take online.
2. Show that the room and the menu are new, and that no phở at dinner is a choice.
3. Send weekday City trade to Little Bánh Bánh and its catering.
