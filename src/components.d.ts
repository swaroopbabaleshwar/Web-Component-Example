/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SwapSideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface SwapSpinner {
    }
    interface SwapStockFinder {
    }
    interface SwapStockPrice {
        "stockSymbol": string;
    }
}
declare global {
    interface HTMLSwapSideDrawerElement extends Components.SwapSideDrawer, HTMLStencilElement {
    }
    var HTMLSwapSideDrawerElement: {
        prototype: HTMLSwapSideDrawerElement;
        new (): HTMLSwapSideDrawerElement;
    };
    interface HTMLSwapSpinnerElement extends Components.SwapSpinner, HTMLStencilElement {
    }
    var HTMLSwapSpinnerElement: {
        prototype: HTMLSwapSpinnerElement;
        new (): HTMLSwapSpinnerElement;
    };
    interface HTMLSwapStockFinderElement extends Components.SwapStockFinder, HTMLStencilElement {
    }
    var HTMLSwapStockFinderElement: {
        prototype: HTMLSwapStockFinderElement;
        new (): HTMLSwapStockFinderElement;
    };
    interface HTMLSwapStockPriceElement extends Components.SwapStockPrice, HTMLStencilElement {
    }
    var HTMLSwapStockPriceElement: {
        prototype: HTMLSwapStockPriceElement;
        new (): HTMLSwapStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "swap-side-drawer": HTMLSwapSideDrawerElement;
        "swap-spinner": HTMLSwapSpinnerElement;
        "swap-stock-finder": HTMLSwapStockFinderElement;
        "swap-stock-price": HTMLSwapStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface SwapSideDrawer {
        "opened"?: boolean;
        "title"?: string;
    }
    interface SwapSpinner {
    }
    interface SwapStockFinder {
        "onSwapSymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface SwapStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "swap-side-drawer": SwapSideDrawer;
        "swap-spinner": SwapSpinner;
        "swap-stock-finder": SwapStockFinder;
        "swap-stock-price": SwapStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "swap-side-drawer": LocalJSX.SwapSideDrawer & JSXBase.HTMLAttributes<HTMLSwapSideDrawerElement>;
            "swap-spinner": LocalJSX.SwapSpinner & JSXBase.HTMLAttributes<HTMLSwapSpinnerElement>;
            "swap-stock-finder": LocalJSX.SwapStockFinder & JSXBase.HTMLAttributes<HTMLSwapStockFinderElement>;
            "swap-stock-price": LocalJSX.SwapStockPrice & JSXBase.HTMLAttributes<HTMLSwapStockPriceElement>;
        }
    }
}
