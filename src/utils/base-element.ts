import { HomeAssistant } from "custom-card-helpers";
import { css, CSSResultGroup, LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import "../shared/badge-icon";
import "../shared/card";
import "../shared/shape-avatar";
import "../shared/shape-icon";
import "../shared/state-info";
import "../shared/state-item";
import { defaultColorCss, defaultDarkColorCss } from "./colors";
import { themeVariables, themeColorCss } from "./theme";

function computeDarkMode(hass?: HomeAssistant): boolean {
    if (!hass) return false;
    return (hass.themes as any).darkMode as boolean;
}
export class MushroomBaseElement extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has("hass") && this.hass) {
            const currentDarkMode = computeDarkMode(changedProps.get("hass"));
            const newDarkMode = computeDarkMode(this.hass);
            if (currentDarkMode !== newDarkMode) {
                this.toggleAttribute("dark-mode", newDarkMode);
            }
        }
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                ${defaultColorCss}
            }
            :host([dark-mode]) {
                ${defaultDarkColorCss}
            }
            :host {
                ${themeColorCss}
                ${themeVariables}
            }
        `;
    }
}
