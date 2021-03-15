/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_png__ from "./image.png";
function MDXContent(_props) {
  const _components = Object.assign(
      {
        p: "p",
        img: "img",
      },
      _props.components
    ),
    { wrapper: MDXLayout } = _components;
  const _content = (
    <>
      <_components.p>
        <_components.img alt="Alt text" src={__0___image_png__} />
      </_components.p>
    </>
  );
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
