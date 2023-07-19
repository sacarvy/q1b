/** @jsxImportSource solid-js */
import { createEffect, onCleanup, onMount } from "solid-js";
import { theme, setTheme } from "./themeStore";

export const ThemeButton = (props: { size?: number }) => {
  /* BROWSER THEME STATE */
  const storageKey = "theme-preference";

  const getColorPreference = (): "dark" | "light" | string => {
    let colorPreference = localStorage.getItem(storageKey);
    if (!colorPreference)
      colorPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return colorPreference;
  };

  const reflectPreference = () => {
    if (
      localStorage.getItem(storageKey) === "dark" ||
      (!(storageKey in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    document.querySelector("#theme-toggle")?.setAttribute("aria-label", theme.value);
  };

  const changeTheme = () => {
    setTheme("value", (c) => (c === "light" ? "dark" : "light"));
  };
  let buttonRef: HTMLButtonElement;

  onMount(() => {
    setTheme("value", getColorPreference());
    const UA = navigator.userAgent;
    const isSafari = !UA.includes('Chrome') && UA.includes('Safari')
    if(isSafari) localStorage.setItem('browser','safari')
    // window.onload = () => {
    // 	reflectPreference()
    // }
    // sync with system changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: isDark }) => {
      setTheme("value", isDark ? "dark" : "light");
      localStorage.setItem(storageKey, theme.value);
      reflectPreference();
    });
    // buttonRef.addEventListener("pointerdown", changeTheme);
    buttonRef.addEventListener("click", changeTheme);

    onCleanup(() => {
      // buttonRef.removeEventListener("pointerdown", changeTheme);
      buttonRef.removeEventListener("click", changeTheme);
    });
  });

  createEffect(() => {
    if (localStorage.getItem(storageKey) !== theme.value) {
      localStorage.setItem(storageKey, theme.value);
      if(localStorage.getItem('browser') === 'safari') 
        location.reload()
      else
        reflectPreference();
    }
  });
  return (
    <button
      ref={(el) => {
        buttonRef = el;
      }}
      // params?.onClick ? params.onClick() : null;
      class="relative theme-toggle"
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      style={{
        "--size": `${props?.size ? props.size : 32}px`,
        "--icon-fill": "#FF9200",
        "--icon-fill-hover": "#FFAA00",
        "--dark-icon-fill": "#3DCFCF",
        "--dark-icon-fill-hover": "#53DBDB",
      }}
    >
      <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};
