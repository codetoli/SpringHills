import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

// Used only at build time by scripts/prerender.mjs, to turn each public page
// into real HTML. Search engines get the content without running JavaScript,
// and so do AI crawlers (GPTBot, ClaudeBot, PerplexityBot), which never run it.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
