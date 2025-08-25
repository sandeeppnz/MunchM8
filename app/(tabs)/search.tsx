import seed from '@/lib/seed'
import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>

      <Button title='Seed' onPress={()=> seed().catch(
        (error)=> console.log("failed to see the db", error)
        )} />
    </SafeAreaView>
  )
}

export default Search