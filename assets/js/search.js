(function () {
  const input = document.getElementById("blog-search");
  const tagFilters = document.getElementById("tag-filters");
  const cards = Array.from(document.querySelectorAll(".post-card"));
  const emptyState = document.getElementById("no-results");

  if (!input || !tagFilters || cards.length === 0) {
    return;
  }

  const normalize = (value) => (value || "").toString().toLowerCase().trim();
  const tagText = (value) => Array.isArray(value) ? value.join(" ") : value;
  let activeTag = "";
  let indexByUrl = new Map();

  function applyFilters() {
    const query = normalize(input.value);
    let visibleCount = 0;

    for (const card of cards) {
      const url = card.dataset.url;
      const indexed = indexByUrl.get(url) || {};
      const tags = normalize(tagText(indexed.tags || card.dataset.tags || ""));
      const searchable = normalize([
        indexed.title,
        indexed.summary,
        indexed.content,
        card.textContent
      ].join(" "));

      const matchesQuery = query === "" || searchable.includes(query);
      const matchesTag = activeTag === "" || tags.split(/\s+/).includes(activeTag);
      const isVisible = matchesQuery && matchesTag;

      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
      }
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  tagFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag]");
    if (!button) {
      return;
    }

    activeTag = normalize(button.dataset.tag);
    for (const item of tagFilters.querySelectorAll("[data-tag]")) {
      item.classList.toggle("is-active", item === button);
    }
    applyFilters();
  });

  input.addEventListener("input", applyFilters);

  fetch("/search.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Search index unavailable");
      }
      return response.json();
    })
    .then((posts) => {
      indexByUrl = new Map(posts.map((post) => [post.url, post]));
      applyFilters();
    })
    .catch(() => {
      applyFilters();
    });
})();
