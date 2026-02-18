import { mount } from '@vue/test-utils'
import Vue from 'vue'

import def from '../src/components/BasicDataTable.vue'

describe('BasicDataTable', () => {
  it('happy', async () => {
    var props = {}

    var wrapper = make_component({ Vue, mount, def, props })

    //expect(wrapper.html()).contains('')
  })
})
