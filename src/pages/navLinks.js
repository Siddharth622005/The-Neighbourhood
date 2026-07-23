// Shared nav links for every /next page. The default NavbarV3 links point
// at the old v3 homepage's anchors ("/#why" etc.), which would bounce a
// visitor off /next entirely — these point at what actually exists here.
// Story, Values and FAQ are dedicated pages, not homepage anchors.
export const V4_LINKS = [
  { label: "Why we exist", href: "/next#the-question" },
  { label: "What we're building", href: "/next#today" },
  { label: "Our story", href: "/next/story" },
  { label: "Our values", href: "/next/values" },
  { label: "FAQ", href: "/next/faq" },
];
