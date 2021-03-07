/*@jsxRuntime automatic @jsxImportSource react*/
import __0_______image_png__ from "../../image.png";
function MDXContent(_props) {
  const _components = Object.assign({
    p: "p"
  }, _props.components), {wrapper: MDXLayout, _components} = _components;
  const _content = <><_components.p><_components.img alt="" src={__0_______image_png__} /></_components.p></>;
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
