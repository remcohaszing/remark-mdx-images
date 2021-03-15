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
        {"This is an inline image: "}
        <_components.img alt="" src={__0___image_png__} />
        {". See?"}
      </_components.p>
    </>
  );
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
