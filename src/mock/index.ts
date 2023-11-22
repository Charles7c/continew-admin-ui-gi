import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import userModule from './user/index'
import tableModule from './person/index'
import systemModule from './system/index'
import fileModule from './file/index'
import testModule from './test/index'
import cateModule from './cate/index'
import areaModule from './area/index'

export function setupProdMockServer() {
  createProdMockServer([
    ...userModule,
    ...tableModule,
    ...systemModule,
    ...fileModule,
    ...cateModule,
    ...testModule,
    ...areaModule
  ])
}
