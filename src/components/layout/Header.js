import { Box, SafeAreaView, StatusBar, Text } from '@gluestack-ui/themed'

const Header = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Box bg='#2c3e50' alignItems='center' justifyContent='center' safeAreaTop py={5}>
        <Text color='#fff' fontSize={20} fontWeight='bold'>
          Recipe App
        </Text>
      </Box>
    </SafeAreaView>
  )
}

export default Header
