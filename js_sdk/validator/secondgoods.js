// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "category_id": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "goods_sn": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "货号",
    "label": "货号"
  },
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "名称",
    "label": "名称"
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
  "price": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "价格",
    "label": "价格"
  },
  "goods_desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "详细描述",
    "label": "详细描述"
  },
  "picurl": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "商品图",
    "label": "商品图"
  },
  "remain_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "库存数量",
    "label": "库存数量"
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
  "checked": {
    "rules": [
      {
        "format": "bool"
      },
      {
        "range": [
          {
            "value": true,
            "text": "显示"
          },
          {
            "value": false,
            "text": "隐藏"
          }
        ]
      }
    ],
    "title": "状态",
    "defaultValue": true,
    "label": "状态"
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
  },
  "seller_note": {
    "rules": [
      {
        "format": "string"
      }
    ]
  }
}

const enumConverter = {
  "checked_valuetotext": [
    {
      "value": true,
      "text": "显示"
    },
    {
      "value": false,
      "text": "隐藏"
    }
  ]
}

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
