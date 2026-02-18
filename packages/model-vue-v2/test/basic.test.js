'use strict'

const Fs = require('fs')
const Path = require('path')

const Code = require('@hapi/code')
const Lab = require('@hapi/lab')

const lab = (exports.lab = Lab.script())
const describe = lab.describe
const it = lab.it
const expect = Code.expect

describe('basic', function () {
  // does each component have a test?
  it('complete', async () => {
    var cmfolder = Path.resolve(__dirname, '../src/components')
    var testfolder = Path.resolve(__dirname, '../test')
    var components = Fs.readdirSync(cmfolder).filter((n) => n.endsWith('.vue'))

    components.forEach((cm) => {
      var specfile = testfolder + '/' + cm.replace(/\.vue$/, '.spec.js')
      var exists = Fs.existsSync(specfile)
      expect(exists ? cm : 'not-found:' + specfile).equal(cm)
    })
  })
})
