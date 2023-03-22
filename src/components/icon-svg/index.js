import Vue from 'vue'
import IconSvg from './icon-svg'

Vue.component('IconSvg', IconSvg)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
