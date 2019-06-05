
import runtime from './runtime/runtime'

const zettai = {
  VERSION: '1.0.0',
  LICENSE: 'MIT License (c) 2019, Rambling Indie Games, LLC',

  createRuntime (options) {
    return runtime.create(options)
  }
}

export default zettai
