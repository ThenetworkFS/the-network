export default root => {
  const {body} = document

  window.addEventListener('mousemove', function(e) {
    var x = e.pageX
    var y = e.pageY
    body.style.setProperty('--x', x + 'px')
    body.style.setProperty('--y', y + 'px')
  })

  const observer = new MutationObserver(updateOffsets)
  window.addEventListener('resize', updateOffsets)
  function updateOffsets() {
    document.querySelectorAll('.mouse-cursor-gradient-tracking')
      .forEach(e => {
        e.style.setProperty('--offsetLeft', e.offsetLeft + 'px')
        e.style.setProperty('--offsetTop', e.offsetTop + 'px')
      })
  }
  observer.observe(root, {childList: true, subtree: true})
}
