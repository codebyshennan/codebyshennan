const statusEl = document.getElementById("status");
const contentEl = document.getElementById("content");

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

    statusEl.hidden = true;
    contentEl.hidden = false;
  } catch (error) {
    statusEl.textContent =
      error instanceof Error ? error.message : "Unable to load profile.";
    statusEl.classList.add("status-error");
  }
}

void loadProfile();
