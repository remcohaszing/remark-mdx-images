/*@jsxRuntime automatic @jsxImportSource react*/
function MDXContent(props) {
  const _components = Object.assign(
      {
        p: "p",
        img: "img",
      },
      props.components
    ),
    { wrapper: MDXLayout } = _components;
  const _content = (
    <>
      <_components.p>
        <_components.img src="http://mdx-logo.now.sh" alt="" />
      </_components.p>
    </>
  );
  return MDXLayout ? <MDXLayout {...props}>{_content}</MDXLayout> : _content;
}
export default MDXContent;
