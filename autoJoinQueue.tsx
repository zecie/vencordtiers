import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
  name: "AutoJoinQueue",
  description: "automatically joins mctiers queue",
  authors: [Devs.Ven],

  start() {
    this.lastClick = 0;
    this.observer = new MutationObserver(() => this.tryClick());
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    this.tryClick();
  },

  stop() {
    this.observer?.disconnect();
    this.observer = null;
    this.lastClick = 0;
  },

  flux: {
    CHANNEL_SELECT() {
      this.lastClick = 0;
    },
  },

  tryClick() {
    if (Date.now() - this.lastClick < 1000) return;

    for (const btn of document.querySelectorAll<HTMLButtonElement>("button")) {
      if (btn.disabled || btn.textContent?.trim() !== "Join Queue") continue;
      const style = getComputedStyle(btn);
      if (style.display === "none" || style.visibility === "hidden") continue;
      btn.click();
      this.lastClick = Date.now();
      return;
    }
  },

  observer: null as MutationObserver | null,
  lastClick: 0,
});
