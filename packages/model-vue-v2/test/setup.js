const Fs = require('fs')

const JSDOMGlobal = require('jsdom-global')
const Code = require('@hapi/code')

global.Fs = Fs
JSDOMGlobal('', { pretendToBeVisual: true })

global.expect = Code.expect

window.Date = Date

const el = document.createElement('div')
el.setAttribute('data-app', true)
document.body.appendChild(el)

global.dd = function (x) {
  return JSON.parse(JSON.stringify(x))
}

global.make_component = function (config) {
  expect(config.def.name).exists().string().not.empty()

  const wrapper = config.mount(config.def, {
    Vue: config.Vue,
    propsData: config.props,
    mocks: {},
  })

  expect(wrapper).exists()

  Fs.writeFileSync('./test/html/' + config.def.name + '.html', wrapper.html())

  return wrapper
}
