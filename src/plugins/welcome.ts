import type { App } from "vue";
/**
 * Installs the welcome plugin for the interview app.
 *
 * @param {App} app - The Vue application instance.
 * @return {void} No return value.
 */
export const welcomePlugin = {
  install: (app: App) => {
    console.log(
      "💫 Welcome to the interview app! Here you can track your job offerings and interview steps for more comfortable workflow"
    );
  },
};
