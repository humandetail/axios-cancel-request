const express = require('express')

const app = express()

app.all('*', (_req, res, next) => {
  res.setHeader('ContentType', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST'])

  next()
})

const records = [
  {
    id: 1,
    type: 1,
    name: '张三'
  },
  {
    id: 2,
    type: 2,
    name: '李四'
  },
  {
    id: 3,
    type: 1,
    name: '王五'
  }
]

let counter = 0
app.get('/api/records', (req, res) => {
  const type = Number(req.query.type || 0)

  // 计数
  counter++

  const data = type === 0
    ? records
    : records.filter(record => record.type === type)

  setTimeout(() => {
    res.send({
      code: 0,
      message: 'success',
      // 给名称携带上计数器
      data: data.map(item => {
        return {
          ...item,
          name: `${item.name} - ${counter}`
        }
      })
    })
  }, (3 - type) * 500)
})

app.get('/api/home', (_req, res) => {
  setTimeout(() => {
    res.send({
      code: -1,
      message: 'error',
      data: null
    })
  }, 2000)
})

app.get('/api/about', (_req, res) => {
  setTimeout(() => {
    res.send({
      code: 0,
      message: 'success',
      data: []
    })
  }, 1000)
})

app.listen(3000, () => {
  console.log('Is Connected.')
})
