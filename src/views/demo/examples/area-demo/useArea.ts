import { area } from './data/area'
import { area as areaData } from './data/area-data'

export function useArea() {
  type Name = 'province_list' | 'city_list' | 'county_list'

  interface AnyObject {
    [key: string]: string
  }

  // 根据上一级编码， 获取下一级对象
  const filter = (name: Name, code: number | string) => {
    const obj: AnyObject = {}
    let reg: any = null
    if (name === 'city_list') {
      reg = new RegExp('^' + code.toString().replace(/0000$/, ''))
    } else if (name === 'county_list') {
      reg = new RegExp('^' + code.toString().replace(/00$/, ''))
    }

    for (const key in area[name]) {
      // eslint-disable-next-line no-prototype-builtins
      if (area[name].hasOwnProperty(key) && reg.test(key)) {
        obj[key] = area[name][key]
      }
    }
    return obj
  }

  type AreaTreeNode = {
    label: string
    code: string | number
    children?: AreaTreeNode[]
  }

  // 把对象格式数据转化成对象数组形式
  const getArr = (obj: AnyObject) => {
    const arr: AreaTreeNode[] = []
    for (const i in obj) {
      arr.push({ label: obj[i], code: i })
    }
    return arr
  }

  // 把数据转化成树形结构
  const getAreaTreeDataByObj = () => {
    const provinceList = getArr(area['province_list'])

    provinceList.forEach((item) => {
      const cityList = getArr(filter('city_list', item.code))
      item.children = cityList

      cityList.forEach((i) => {
        const countyList = getArr(filter('county_list', i.code))
        i.children = countyList
      })
    })

    return provinceList
  }

  // 直接获取树形数据源
  const getAreaTreeData = () => {
    return areaData
  }

  return {
    getAreaTreeDataByObj,
    getAreaTreeData
  }
}
