/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_gif__ from "./image.gif";
import __1___image_jpg__ from "./image.jpg";
import __2___image_png__ from "./image.png";
import __3___image_svg__ from "./image.svg";
function MDXContent(_props) {
  const _components = Object.assign({
    p: "p"
  }, _props.components), {wrapper: MDXLayout} = _components;
  const _content = <><_components.p><img src={__0___image_gif__} /></_components.p>{"\n"}<_components.p><img src={__1___image_jpg__} /></_components.p>{"\n"}<_components.p><img src={__2___image_png__} /></_components.p>{"\n"}<_components.p><img src={__3___image_svg__} /></_components.p></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
