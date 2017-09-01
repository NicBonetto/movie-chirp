import chai, { expect } from 'chai'
import { sinon, spy } from 'sinon'
import { mount, render, shallow } from 'enzyme'
import fetch from 'isomorphic-fetch'

chai.use(require('chai-like'))
chai.use(require('chai-things'))
global.fetch = fetch
global.expect = expect
global.sinon = sinon
global.spy = spy
global.mount = mount
global.render = render
global.shallow = shallow
