import { Button, ButtonText, Card, Heading, Image, Text, VStack } from '@gluestack-ui/themed'

const RecipeCard = props => {
  const { label, image, source, url, navigation } = props
  return (
    <Card p='$5' borderRadius='$lg' maxWidth={400} m='$3'>
      <Image
        mb='$6'
        h={240}
        width='$full'
        borderRadius='$md'
        source={{
          uri: image
        }}
      />
      <Text
        fontSize='$sm'
        fontStyle='normal'
        fontFamily='$heading'
        fontWeight='$normal'
        lineHeight='$sm'
        mb='$2'
        sx={{
          color: '$textLight700',
          _dark: {
            color: '$textDark200'
          }
        }}
      >
        {source}
      </Text>
      <VStack mb='$6'>
        <Heading size='md' fontFamily='heading' mb='$4'>
          {label}
        </Heading>
        <Button
          variant='link'
          onPress={() => {
            navigation.navigate('Show', {
              label,
              url
            })
          }}
        >
          <ButtonText fontSize='$sm'>View</ButtonText>
        </Button>
      </VStack>
    </Card>
  )
}

export default RecipeCard
