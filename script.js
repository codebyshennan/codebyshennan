const statusEl = document.getElementById("status");
const contentEl = document.getElementById("content");

const ICONS = {
  About:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5V8.9a2 2 0 0 1 .85-1.64l6.5-4.64a1.1 1.1 0 0 1 1.3 0l6.5 4.64A2 2 0 0 1 20 8.9v10.6a1 1 0 0 1-1 1h-4.8a1 1 0 0 1-1-1v-4.7a1.2 1.2 0 0 0-2.4 0v4.7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" fill="currentColor"/></svg>',
  "Tech Stack":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.7 4.2 5.1 5.1-2.1 2.1-5.1-5.1 2.1-2.1Zm-8.9 8.9 5.1 5.1-2.1 2.1-5.1-5.1 2.1-2.1Zm9.9 6.4-4.2-4.2 1.4-1.4 4.2 4.2a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 1-1.3-.1Zm-7-9.8L4.5 5.5A1 1 0 0 1 4.5 4l.1-.1a1 1 0 0 1 1.4 0l4.2 4.2-1.4 1.4Zm10.8 5.2-1.8-1.8-3.2 3.2 1.8 1.8a1.5 1.5 0 0 0 2.1 0l1.1-1.1a1.5 1.5 0 0 0 0-2.1ZM10.6 7.5 7.4 10.7l1.8 1.8 3.2-3.2-1.8-1.8a1.5 1.5 0 0 0-2 0Z" fill="currentColor"/></svg>',
  Trophies:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v2h2a1 1 0 0 1 1 1v1.2a5.5 5.5 0 0 1-4.7 5.45A5.03 5.03 0 0 1 13 15.82V18h3.2a.8.8 0 0 1 0 1.6H7.8a.8.8 0 0 1 0-1.6H11v-2.18a5.03 5.03 0 0 1-2.3-3.17A5.5 5.5 0 0 1 4 7.2V6a1 1 0 0 1 1-1h2V3Zm10 3v1.2a3.9 3.9 0 0 0 1.4-.9A3.86 3.86 0 0 0 18.4 6H17ZM6 6a3.86 3.86 0 0 0 1 2.3c.38.37.86.67 1.4.9V6H6Z" fill="currentColor"/></svg>',
  "GitHub Stats":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19h14a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v14Zm11.3-9.9 2.8 2.8a1 1 0 1 1-1.4 1.4L15 10.6l-3.3 3.3a1 1 0 0 1-1.4 0L8 11.6l-2.3 2.3a1 1 0 0 1-1.4-1.4l3-3a1 1 0 0 1 1.4 0l2.3 2.3 3.3-3.3a1 1 0 0 1 1.4 0Z" fill="currentColor"/></svg>',
  "Weekly Development Breakdown":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a1 1 0 0 1 1 1v1.1a8 8 0 1 1-5.66 2.34A7.95 7.95 0 0 1 11 4.1V3a1 1 0 0 1 1-1Zm0 5a1 1 0 0 0-1 1v4.4l-2.2 2.2a1 1 0 0 0 1.4 1.4l2.5-2.5A1 1 0 0 0 13 13V8a1 1 0 0 0-1-1Z" fill="currentColor"/></svg>',
  "Latest Blog Posts":
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5V9.2a2.5 2.5 0 0 0-.73-1.77l-2.2-2.2A2.5 2.5 0 0 0 14.8 4.5H7Zm2 4.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 9 8.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 9 15.75Z" fill="currentColor"/></svg>',
};

function createIcon(label) {
  const iconMarkup = ICONS[label];

  if (!iconMarkup) {
    return null;
  }

  const icon = document.createElement("span");
  icon.className = "section-icon";
  icon.innerHTML = iconMarkup;
  return icon;
}

function decorateSections() {
  const sections = [];
  let currentSection = null;

  for (const child of [...contentEl.children]) {
    if (child.tagName === "H3") {
      currentSection = document.createElement("section");
      currentSection.className = "content-section";
      sections.push(currentSection);
      child.parentNode.insertBefore(currentSection, child);
      currentSection.appendChild(child);
      continue;
    }

    if (child.tagName === "HR") {
      child.remove();
      continue;
    }

    if (currentSection) {
      currentSection.appendChild(child);
    }
  }

  sections.forEach((section, index) => {
    const heading = section.querySelector("h3");

    if (!heading) {
      return;
    }

    const rawLabel = heading.textContent.replace(/\u00a0/g, " ").trim();
    heading.textContent = rawLabel;
    heading.classList.add("section-heading");

    const icon = createIcon(rawLabel);
    if (icon) {
      heading.prepend(icon);
    }

    if (index === 0) {
      section.classList.add("section-about");
    }

    if (rawLabel === "Tech Stack") {
      section.classList.add("section-tech");
    }

    if (rawLabel === "GitHub Stats") {
      section.classList.add("section-stats");
    }
  });
}

function decorateHero() {
  const title = contentEl.querySelector("h1");
  const introParagraphs = [...contentEl.querySelectorAll("p[align='center']")];

  if (!title) {
    return;
  }

  const hero = document.createElement("section");
  hero.className = "hero";
  title.parentNode.insertBefore(hero, title);
  hero.appendChild(title);
  title.classList.add("hero-title");

  const eyebrow = document.createElement("p");
  eyebrow.className = "hero-eyebrow";
  eyebrow.textContent = "Systems, venture, automation";
  hero.prepend(eyebrow);

  const deck = document.createElement("p");
  deck.className = "hero-deck";
  deck.textContent =
    "Builder-investor focused on infrastructure, applied AI, and internal systems for venture and education.";
  hero.appendChild(deck);

  if (introParagraphs[0]) {
    introParagraphs[0].classList.add("hero-typing");
    hero.appendChild(introParagraphs[0]);
  }

  if (introParagraphs[1]) {
    introParagraphs[1].classList.add("hero-links");
    hero.appendChild(introParagraphs[1]);
  }
}

function cleanBrokenHeadingImages() {
  for (const image of contentEl.querySelectorAll("h3 img")) {
    image.remove();
  }
}

function cleanEmptyParagraphs() {
  for (const paragraph of [...contentEl.querySelectorAll("p")]) {
    if (!paragraph.textContent.trim() && !paragraph.querySelector("img")) {
      paragraph.remove();
    }
  }
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

async function loadProfile() {
  try {
    const response = await fetch("./README.md", { cache: "no-cache" });

    if (!response.ok) {
      throw new Error(`Failed to load README (${response.status})`);
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);

    contentEl.innerHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    });

    for (const link of contentEl.querySelectorAll("a")) {
      link.target = "_blank";
      link.rel = "noreferrer noopener";
    }

    for (const image of contentEl.querySelectorAll("img")) {
      image.loading = "lazy";
    }

    cleanBrokenHeadingImages();
    cleanEmptyParagraphs();
    decorateHero();
    decorateSections();

    statusEl.hidden = true;
    contentEl.hidden = false;
  } catch (error) {
    statusEl.textContent =
      error instanceof Error ? error.message : "Unable to load profile.";
    statusEl.classList.add("status-error");
  }
}

void loadProfile();
