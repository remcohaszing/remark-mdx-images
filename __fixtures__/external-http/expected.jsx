/*@jsxRuntime automatic @jsxImportSource react*/
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
        <_components.img src="http://mdx-logo.now.sh" alt="" />
      </_components.p>
    </>
  );
  return MDXLayout ? <MDXLayout {..._props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
