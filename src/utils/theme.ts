export const applyTheme = () => {
  if (typeof window === "undefined") return;

  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Ensure persistence
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const toggleTheme = () => {
  if (typeof window === "undefined") return;

  const isDarkMode = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
};
