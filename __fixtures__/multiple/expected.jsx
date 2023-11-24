/*@jsxRuntime automatic @jsxImportSource react*/
import __0___image_gif__ from './image.gif';
import __1___image_jpg__ from './image.jpg';
import __2___image_png__ from './image.png';
import __3___image_svg__ from './image.svg';
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components,
  };
  return (
    <>
      <_components.p>
        <_components.img alt="" src={__0___image_gif__} />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.img alt="" src={__1___image_jpg__} />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.img alt="" src={__2___image_png__} />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.img alt="" src={__3___image_svg__} />
      </_components.p>
    </>
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
