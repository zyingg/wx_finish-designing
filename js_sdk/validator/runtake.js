// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "category_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "需求",
    "label": "需求"
  },
  "keywords": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "关键字",
    "label": "关键字"
  },
  "run_desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "跑腿代取需求",
    "label": "跑腿代取需求"
  },
  "take_place": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "取货地址",
    "label": "取货地址"
  },
  "run_place": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "送货地址",
    "label": "送货地址"
  },
  "contact": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "联系方式",
    "label": "联系方式"
  },
  "run_thumb": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "商品封面图",
    "label": "商品封面图"
  },
  "run_price": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "出价",
    "label": "出价"
  },
  "add_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "last_modify_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
