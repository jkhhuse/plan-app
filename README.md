# plan-app


## 项目安装、运行

```
yarn add @capacitor/core @capacitor/cli
npx cap init [name] [id] --web-dir=dist

yarn run build  

yarn add @capacitor/android
npx cap add android
```

## 代码同步到 android app

```
# vue
yarn run build

npx cap sync

# native 
重启服务
```