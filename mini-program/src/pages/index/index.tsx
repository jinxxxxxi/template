import { Button, View } from '@tarojs/components'
import './index.scss'

export default function Index() {

  return (
    <View className="flex flex-1 flex-col items-center justify-center gap-2 h-full">
      <Button plain type="primary" >
        Go Home
      </Button>
    </View>
  )
}
