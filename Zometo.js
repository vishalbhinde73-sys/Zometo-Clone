const toast = document.querySelector("#toast");
const downloadLinks = document.querySelectorAll(".store-badge");
const revealItems = document.querySelectorAll(".reveal");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(
    () => toast.classList.remove("show"),
    2600,
  );
}

downloadLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      link.getAttribute("href") === "#home" ||
      link.getAttribute("href") === "#download"
    ) {
      event.preventDefault();
      showToast("App download links are coming soon.");
    }
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
