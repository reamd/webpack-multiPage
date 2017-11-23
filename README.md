# webpack-multiPage构建说明

## 安装依赖
npm install

## 开发环境
npm run dev

## 生产环境(上线)
npm run build

## 开发流程
- 增加html页面

- 增加相应的js和scss
在js中引入当前页面的scss

- 在webpack.config.js中：
    - 定义js的map
    - 定义html的template
    - 定义html的filename
    - 定义html的chunks（js）