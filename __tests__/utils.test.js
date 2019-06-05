import {
  clamp,
  hexByte,
  parseRGBAFromObject
} from '../src/runtime/utils'

test('-10 to clamp to zero', () => {
  expect(clamp(-10, 0, 10)).toBe(0)
})

test('100 to clamp to 10', () => {
  expect(clamp(100, 0, 10)).toBe(10)
})

test('Number 5 to be "05" string', () => {
  expect(hexByte(5)).toBe('05')
})

test('Number 255 to be "ff" string', () => {
  expect(hexByte(255)).toBe('ff')
})

test('Number 256 to be "10" string', () => {
  expect(hexByte(256)).toBe('10')
})

test('object {r:0xaa, g:0xbb, b:0xcc, a:0xdd} to be "#aabbccdd" string', () => {
  expect(parseRGBAFromObject({ r: 0xaa, g: 0xbb, b: 0xcc, a: 0xdd })).toBe('#aabbccdd')
})
