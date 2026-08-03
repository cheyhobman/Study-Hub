/* ============================================================================
   themes.js: the colour schemes available from the topbar picker.
   ----------------------------------------------------------------------------
   ONE source of truth. Adding a theme means:
     1. add an entry here
     2. add a matching `[data-theme="<id>"]` variable block in css/styles.css
     3. if it is a DARK scheme, add its id to the `:is(...)` selector lists that
        carry the dark per-subject accents and the dark sidebar (same file)
   Nothing else needs touching. The picker, the pre-paint script in index.html
   and the store all read this list.

   `dark: true` is not cosmetic: it tells the rest of the site to use the dark
   per-subject accent set, and it is what the pre-paint script uses to decide
   what a first-time visitor gets from prefers-color-scheme.
   ========================================================================== */

export const THEMES = [
  { id: 'light',    label: 'Light',         hint: 'Phthalo green on mint',       dark: false, swatch: ['#F6F9F7', '#1B5E3F'] },
  { id: 'dark',     label: 'Dark',          hint: 'The original night mode',     dark: true,  swatch: ['#0B1611', '#4FA97C'] },
  { id: 'midnight', label: 'Midnight',      hint: 'Deep indigo, very low glare', dark: true,  swatch: ['#0C1020', '#7C8CFF'] },
  { id: 'sandstone', label: 'Sandstone',   hint: 'Warm clay and sand, low glare', dark: false, swatch: ['#F4EFE4', '#A8623A'] },
  { id: 'ocean',     label: 'Ocean',       hint: 'Deep blue, cool and calm',      dark: true,  swatch: ['#0A1826', '#4FA3D1'] },
];

export const THEME_IDS = THEMES.map(t => t.id);

/** Is `id` a theme we actually ship? */
export function isTheme(id) { return THEME_IDS.includes(id); }

/** The theme record for an id, falling back to Light rather than undefined. */
export function themeById(id) {
  return THEMES.find(t => t.id === id) || THEMES[0];
}
