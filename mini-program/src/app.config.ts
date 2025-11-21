const pages = ['pages/index/index']
export default defineAppConfig({
  animation: true,
  entryPagePath: 'pages/index/index',
  pages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
})
