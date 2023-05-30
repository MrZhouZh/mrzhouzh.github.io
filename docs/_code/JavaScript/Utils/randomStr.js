const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

function randomStr(size = 16, dict = urlAlphabet) {
  let id = '', i = size
  const len = dict.length

  while (i--) {
    id += dict[(Math.random() * len) | 0]
  }

  return id
}
