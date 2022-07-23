/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_png__ from './image.png';
function _createMdxContent(props) {
  const _components = Object.assign(
    {
      p: 'p',
      img: 'img',
    },
    props.components,
  );
  return (
    <_components.p>
      {'This is an inline image: '}
      <_components.img alt="" src={__0___image_png__} />
      {'. See?'}
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
