declare const jest: any

declare function describe(
  name: string,
  fn: () => void
): void

declare function it(
  name: string,
  fn: () => any | Promise<any>
): void

declare function test(
  name: string,
  fn: () => any | Promise<any>
): void

declare function beforeEach(fn: () => any | Promise<any>): void
declare function afterEach(fn: () => any | Promise<any>): void

declare function expect(actual: any): any
declare const expect: {
  (actual: any): any
  arrayContaining: (items: any[]) => any
}

