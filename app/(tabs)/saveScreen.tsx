import React from 'react'
import { View, Text } from 'react-native'

export default function SaveScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-red-800'>
      <Text className='text-5xl text-white'>An Error Occured!</Text>
      <Text className='text-xl text-white'>Compile Error: Line 23 - 'boost' not found. 'hyperdrive' module incompatible with current 'core' version 4.2. Please update or define override."</Text>
    </View>
  )
}
