/*@jsxRuntime automatic @jsxImportSource react*/
import __0__browser_logos_chrome_chrome_png__ from "@browser-logos/chrome/chrome.png";
function MDXContent(_props) {
  const _components = Object.assign({
    p: "p"
  }, _props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.p><img src={__0__browser_logos_chrome_chrome_png__} /></_components.p></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
