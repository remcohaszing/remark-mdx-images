/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_png__ from './image.png';
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components,
  };
  return (
    <_components.p>
      {'This is an inline image: '}
      <_components.img alt="" src={__0___image_png__} />
      {'. See?'}
    </_components.p>
  );
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
