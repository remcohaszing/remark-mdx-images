/*@jsxRuntime automatic @jsxImportSource react*/
import __0__browser_logos_chrome_chrome_png__ from '@browser-logos/chrome/chrome.png'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <_components.p>
      <_components.img alt="" src={__0__browser_logos_chrome_chrome_png__} />
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
