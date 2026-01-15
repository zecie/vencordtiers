import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
  name: "AutoJoinQueue",
  description: "automatically joins mctiers queue",
  authors: [Devs.Ven],

  async start() {
    this.clickCount = 0;
    this.currentChannelId = null;
    this.observer = new MutationObserver(() => {
      this.checkAndClickButton();
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "aria-label"],
    });

    this.checkInterval = setInterval(() => {
      this.checkAndClickButton();
    }, 10);

    try {
      if ("wakeLock" in navigator) {
        this.wakeLock = await navigator.wakeLock.request("screen");
        console.log("AutoJoinQueue: Display sleep prevented");
      }
    } catch (err) {
      console.error("AutoJoinQueue: Failed to acquire wake lock:", err);
    }

    this.checkAndClickButton();
  },

  stop() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
      console.log("AutoJoinQueue: Display sleep re-enabled");
    }
    this.clickCount = 0;
    this.currentChannelId = null;
  },

  flux: {
    CHANNEL_SELECT({ channelId }) {
      if (channelId !== this.currentChannelId) {
        this.currentChannelId = channelId;
        this.clickCount = 0;

        if (this.observer) {
          this.observer.disconnect();
        }

        this.observer = new MutationObserver(() => {
          this.checkAndClickButton();
        });

        this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "aria-label"],
        });
      }
    },
  },

  checkAndClickButton() {
    if (this.clickCount >= 3) {
      return;
    }

    const buttons = document.querySelectorAll("button");

    for (const button of buttons) {
      const htmlButton = button as HTMLButtonElement;
      const buttonText = htmlButton.textContent?.trim();

      if (buttonText === "Join Queue") {
        const rect = htmlButton.getBoundingClientRect();
        const isVisible =
          rect.width > 0 &&
          rect.height > 0 &&
          window.getComputedStyle(htmlButton).visibility !== "hidden" &&
          window.getComputedStyle(htmlButton).display !== "none";

        if (isVisible && !htmlButton.hasAttribute("disabled")) {
          htmlButton.click();
          htmlButton.click();
          htmlButton.click();
          this.clickCount = 3;

          if (this.observer) {
            this.observer.disconnect();
          }

          return;
        }
      }
    }

    const styledButtons = document.querySelectorAll('button[class*="button"]');

    for (const button of styledButtons) {
      const htmlButton = button as HTMLButtonElement;
      if (htmlButton.textContent?.trim() === "Join Queue") {
        const rect = htmlButton.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;

        if (isVisible && !htmlButton.hasAttribute("disabled")) {
          htmlButton.click();
          htmlButton.click();
          htmlButton.click();
          this.clickCount = 3;

          if (this.observer) {
            this.observer.disconnect();
          }

          return;
        }
      }
    }
  },

  observer: null as MutationObserver | null,
  checkInterval: null as NodeJS.Timeout | null,
  clickCount: 0,
  currentChannelId: null as string | null,
  wakeLock: null as WakeLockSentinel | null,
});
