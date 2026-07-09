// Small pools of warm, varied responses — picked at random so the
// companion never feels scripted on repeat visits. No productivity
// language, no numbers, no "completed" anywhere in here.

export const TRIED_RESPONSES = [
  "How lovely. Every little moment of play helps your child discover something new about the world.",
  "Those shared moments matter more than you might realise.",
  "Something as small as that stays with them longer than you'd think.",
  "That's the kind of ordinary moment children remember without knowing why.",
  "Thank you for making space for that today.",
];

export const NONE_TRIED_RESPONSES = [
  "That's completely okay. Parenting has busy days. These ideas will be here whenever you're ready.",
  "No need to explain. Some days are just full. We'll be here for the next one.",
  "That's alright — nothing lost, nothing to catch up on. Just pick up whenever it suits you.",
];

export function randomFrom(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export function greeting(childName) {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning — here's what's unfolding for ${childName}.`;
  if (hour < 17) return `A few small ways to spend the afternoon with ${childName}.`;
  return `Before the day winds down, a few small ways to be with ${childName}.`;
}
