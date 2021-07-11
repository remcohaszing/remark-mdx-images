/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_png__ from "./image.png";
function MDXContent(props) {
  const _components = Object.assign(
      {
        p: "p",
        a: "a",
        img: "img",
      },
      props.components
    ),
    { wrapper: MDXLayout } = _components;
  const _content = (
    <>
      <_components.p>
        <_components.a href="https://example.com">
          <_components.img alt="" src={__0___image_png__} />
        </_components.a>
      </_components.p>
    </>
  );
  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
