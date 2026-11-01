const $ = (id) => document.getElementById(id);
const toast = (message) => {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
};

$("year").textContent = new Date().getFullYear();

// Mobile navigation
$("menuToggle").addEventListener("click", () => {
  const open = $("mainNav").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));

// Topic search
const searchable = [...document.querySelectorAll(".article-card")];
$("articleSearch").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  let shown = 0;
  searchable.forEach(card => {
    const match = card.textContent.toLowerCase().includes(query);
    card.classList.toggle("hidden", !match);
    if (match) shown++;
  });
  $("searchStatus").textContent = query ? `${shown} topic${shown === 1 ? "" : "s"} found.` : "";
});

// Password strength is a lightweight local heuristic, not a security audit.
function assessPassword(value) {
  if (!value) return {score:0,label:"Not checked",hint:"Use a unique, long passphrase."};
  let score = 0;
  if (value.length >= 12) score++;
  if (value.length >= 16) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  const labels = ["Very weak","Weak","Fair","Good","Strong","Very strong"];
  const hints = [
    "Try a longer, unique passphrase.",
    "Add length and avoid common words.",
    "Use more length and a mix of character types.",
    "Good start. Prefer a unique passphrase.",
    "Good indicators. Never reuse passwords.",
    "Strong indicators. A password manager and MFA still matter."
  ];
  return {score,label:labels[score],hint:hints[score]};
}
$("passwordInput").addEventListener("input", e => {
  const result = assessPassword(e.target.value);
  $("strengthBar").style.width = `${result.score * 20}%`;
  $("strengthLabel").textContent = result.label;
  $("strengthScore").textContent = `${result.score} / 5`;
  $("strengthHint").textContent = result.hint;
});
$("togglePassword").addEventListener("click", () => {
  const field = $("passwordInput");
  field.type = field.type === "password" ? "text" : "password";
  $("togglePassword").setAttribute("aria-label", field.type === "password" ? "Show password" : "Hide password");
});

// Cryptographically secure random password generation.
const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*+-_?";
function randomIndex(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  const array = new Uint32Array(1);
  let n;
  do { crypto.getRandomValues(array); n = array[0]; } while (n >= limit);
  return n % max;
}
function makePassword(length) {
  let out = "";
  for (let i = 0; i < length; i++) out += charset[randomIndex(charset.length)];
  return out;
}
$("passwordLength").addEventListener("input", e => $("lengthValue").textContent = e.target.value);
$("generatePassword").addEventListener("click", () => {
  $("generatedPassword").textContent = makePassword(Number($("passwordLength").value));
  $("copyStatus").textContent = "New password generated locally.";
});
$("copyPassword").addEventListener("click", async () => {
  const value = $("generatedPassword").textContent;
  if (!value || value.startsWith("Click generate")) return toast("Generate a password first.");
  try { await navigator.clipboard.writeText(value); toast("Password copied."); }
  catch { toast("Clipboard unavailable. Select and copy the text."); }
});

// SHA-256 via Web Crypto API. Requires HTTPS or localhost.
$("generateHash").addEventListener("click", async () => {
  const input = $("hashInput").value;
  if (!input) { $("hashStatus").textContent = "Enter some sample text first."; return; }
  if (!window.crypto?.subtle) { $("hashStatus").textContent = "Web Crypto requires HTTPS or localhost."; return; }
  try {
    const bytes = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
    $("hashOutput").textContent = hex;
    $("hashStatus").textContent = "SHA-256 digest generated in your browser.";
  } catch {
    $("hashStatus").textContent = "Could not generate the digest in this browser.";
  }
});
$("copyHash").addEventListener("click", async () => {
  const value = $("hashOutput").textContent;
  if (!/^[a-f0-9]{64}$/i.test(value)) return toast("Generate a hash first.");
  try { await navigator.clipboard.writeText(value); toast("Hash copied."); }
  catch { toast("Clipboard unavailable. Select and copy the hash."); }
});

// This is deliberately a non-collecting demo: do not store addresses without a real provider and consent flow.
$("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  $("newsletterMessage").textContent = "Thanks for your interest. Subscription is not active yet; this demo does not collect or store your email.";
  $("emailInput").value = "";
});
