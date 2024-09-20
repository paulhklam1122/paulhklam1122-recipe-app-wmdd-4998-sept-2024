import { GluestackUIProvider } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text } from 'react-native'
import { config } from '@gluestack-ui/config'
import Header from './src/components/layout/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RecipesContainer from './src/components/containers/RecipesContainer'
import AppStack from './src/components/stacks/AppStack'

const App = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        {/* <Header /> */}
        {/* <RecipesContainer /> */}
        <AppStack />
        <StatusBar style='auto' />
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
