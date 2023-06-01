import { createStore } from "solid-js/store";

let initTheme = "light";
if (localStorage.getItem("theme-preference") === "dark" || !("theme-preference" in localStorage)) initTheme = "dark";

export const [theme, setTheme] = createStore<{
  value: "light" | "dark" | string;
  navbar: boolean;
}>({
  value: initTheme,
  navbar: true,
});
