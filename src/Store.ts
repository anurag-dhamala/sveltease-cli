export default class Store {
    static files: Array<string> = [];
    static initOptions: 'vue' | 'react-cra' | 'react-vite' | 'next' = 'react-vite';
    static isTailwindCssUsedInSvelte: boolean = false;
    static pkgManager: String = "npm";
    static hasTypeScriptEnabled: boolean = true;
}