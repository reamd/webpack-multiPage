# 接口文档信息

## 1. 获取人员信息接口
```
req = {
    type: 'POST',
    url: '/getPersonInfo',
    dataType: 'json',
    data: {
        userId: '123'
    }
}

res = {
    success: true,
    data: {
        userId: '123'
        name: 'reamd',
        age: 18
    }
}
```
