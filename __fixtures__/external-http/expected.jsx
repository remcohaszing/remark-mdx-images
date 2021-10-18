/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign(
    {
      p: "p",
      img: "img",
    },
    props.components
  );
  return (
    <_components.p>
      <_components.img src="http://mdx-logo.now.sh" alt="" />
    </_components.p>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
export default MDXContent;
