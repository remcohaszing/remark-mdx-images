/*@jsxRuntime automatic @jsxImportSource react*/
import __0___cat_image_png__ from './cat image.png'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <_components.p>
      <_components.img alt="" src={__0___cat_image_png__} />
    </_components.p>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
