import { Center } from '@gluestack-ui/themed'
import Form from '../forms/Form'
import { useState } from 'react'
import { getRecipes } from '../../services/api'
import Loading from '../layout/Loading'
import RecipesList from '../lists/RecipesList'

const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/d96/d964289a83afcc99c8022addf088444d.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMSJGMEQCIAb6FjfkN1SEgECJ%2BVP7ssqKDX%2FIn47Ha1YFhFK%2FVHecAiBAKz%2F37z75bxgk%2F1nHNvUTjJbRLgQ5gJpdBProweVSxCq5BQhqEAAaDDE4NzAxNzE1MDk4NiIMaQIS2dNflj%2FuVczVKpYFGVLXmKqJ04weAxlDbEcKZh3PUIJou6bQdcZtvEr4e0bceTorpp6I9yVy8Uvy34Mt6YPth5ZMa6TXnM%2BsXe9u1n9zLpHFihHY09tB0zqiXI0q54MiU6ODkFyqEFSKM5YL3mg5oCVHXh1Y5%2FfFUHyUHaUki7iV3dGov5LsWCMNc%2FLqy3Oc2xBIArNaDUc%2F3JqCSlc%2Fd3KynRMOxeFF1woYaKVNc4ML5vZ9AWVkA3A6v17dqgrHZi05xz%2FvamNwEWuIXzUx26e248khyIFkfl8TCSDc2X8QCBtEhf%2B1XQDeAUpkHQZ%2Fzy02xt82s4ZacVwxp3ijJQBymhDLeryeEf2nT%2B4wPhUMMSCtn%2B8AIcz6l6ZnZ8%2FVWFqTN%2FRj5zbeLlu%2BtIl1KIsMUoA%2BWAjWgCXeunePqvhrAQgUNz3RfjSRlbg%2BUAW2CLBxTf9BQTL3pBoqKsLbB5pHPb64eChz2ko2IlGSIHCpDVu7eAp973LfZz2olOMSxnKUMVIIm1DUqExaZV7u2EnzBExLu5L851YmGz9b0Fyi%2FU5qYuZ8b%2FpeTQPft5fObU1LDEMoSxOXKUZTIVIZcdDda2ol%2BLnKk%2FQSsa7qZ6OqAPa6okJUt4T%2BMHvSEy9qrgZHmcN8gPh8ZHe54jfTqJk43v4QKsXd0H9iartMpe7mjigUD2OHy7IMjIGRcT8%2Bc93d%2FfohGgLS7MZF9w0EZ%2Br9SvzTzZXwl6qeB7ESKLwZj1I%2BN9nA6EtAyL7lKbC0%2Bu2kIxkIAvffN0fmoWJanfQGBKxoM%2FOJs%2BDplsCaMmLJRtD%2BlpWjL48xdSIXNYSnNL9bKdOBlozxqMlOL05MpUKVgZ2WELEfFH%2F9F2R9buriCm8siB5mK3eKBHahmQwByWAwxYWztwY6sgF3lbzo0kl0vTPBwVjLojzncOyyuZCARfNFyRdtgTa618lHTsxpImCVOs7KET%2Fi3oTxQ9mhFNA80TlkVu%2FzaHa7UE36VWejo5rLF3P1%2FEgtKLPKg7vdbryS5ZQscYW46gQu%2FB65lhTeHt6ME3d7F2S6V%2FgBo6HW%2Fns3WmJpJE2Vtpebx6sBVuTophvWUI6%2FEmx7cdiwkCpqB3ThQbFk3Q75inH%2F6qpE0tlmj2BrQdZSh9pV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240920T014327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD6WADDCO%2F20240920%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0c92153bf764bcc7a0c520d25a9cb65616ec7e0add3337030fe573c46f11d333',
    label: 'Smoked Wagyu Beef Shank',
    source: 'Food52',
    url: 'https://food52.com/recipes/86509-smoked-wagyu-beef-shank'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/207/2074a28ff50eba58d79304c9296438a1.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMSJGMEQCIAb6FjfkN1SEgECJ%2BVP7ssqKDX%2FIn47Ha1YFhFK%2FVHecAiBAKz%2F37z75bxgk%2F1nHNvUTjJbRLgQ5gJpdBProweVSxCq5BQhqEAAaDDE4NzAxNzE1MDk4NiIMaQIS2dNflj%2FuVczVKpYFGVLXmKqJ04weAxlDbEcKZh3PUIJou6bQdcZtvEr4e0bceTorpp6I9yVy8Uvy34Mt6YPth5ZMa6TXnM%2BsXe9u1n9zLpHFihHY09tB0zqiXI0q54MiU6ODkFyqEFSKM5YL3mg5oCVHXh1Y5%2FfFUHyUHaUki7iV3dGov5LsWCMNc%2FLqy3Oc2xBIArNaDUc%2F3JqCSlc%2Fd3KynRMOxeFF1woYaKVNc4ML5vZ9AWVkA3A6v17dqgrHZi05xz%2FvamNwEWuIXzUx26e248khyIFkfl8TCSDc2X8QCBtEhf%2B1XQDeAUpkHQZ%2Fzy02xt82s4ZacVwxp3ijJQBymhDLeryeEf2nT%2B4wPhUMMSCtn%2B8AIcz6l6ZnZ8%2FVWFqTN%2FRj5zbeLlu%2BtIl1KIsMUoA%2BWAjWgCXeunePqvhrAQgUNz3RfjSRlbg%2BUAW2CLBxTf9BQTL3pBoqKsLbB5pHPb64eChz2ko2IlGSIHCpDVu7eAp973LfZz2olOMSxnKUMVIIm1DUqExaZV7u2EnzBExLu5L851YmGz9b0Fyi%2FU5qYuZ8b%2FpeTQPft5fObU1LDEMoSxOXKUZTIVIZcdDda2ol%2BLnKk%2FQSsa7qZ6OqAPa6okJUt4T%2BMHvSEy9qrgZHmcN8gPh8ZHe54jfTqJk43v4QKsXd0H9iartMpe7mjigUD2OHy7IMjIGRcT8%2Bc93d%2FfohGgLS7MZF9w0EZ%2Br9SvzTzZXwl6qeB7ESKLwZj1I%2BN9nA6EtAyL7lKbC0%2Bu2kIxkIAvffN0fmoWJanfQGBKxoM%2FOJs%2BDplsCaMmLJRtD%2BlpWjL48xdSIXNYSnNL9bKdOBlozxqMlOL05MpUKVgZ2WELEfFH%2F9F2R9buriCm8siB5mK3eKBHahmQwByWAwxYWztwY6sgF3lbzo0kl0vTPBwVjLojzncOyyuZCARfNFyRdtgTa618lHTsxpImCVOs7KET%2Fi3oTxQ9mhFNA80TlkVu%2FzaHa7UE36VWejo5rLF3P1%2FEgtKLPKg7vdbryS5ZQscYW46gQu%2FB65lhTeHt6ME3d7F2S6V%2FgBo6HW%2Fns3WmJpJE2Vtpebx6sBVuTophvWUI6%2FEmx7cdiwkCpqB3ThQbFk3Q75inH%2F6qpE0tlmj2BrQdZSh9pV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240920T014327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD6WADDCO%2F20240920%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2cbfeb1b8d44012ae5bbd0f5951bb0d6adf583f7466c580bb655e1bc1f121da0',
    label: 'Roast sirloin of beef',
    source: 'BBC Good Food',
    url: 'http://www.bbcgoodfood.com/recipes/2558/roast-sirloin-of-beef'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/ac6/ac62c888656327623f1bf247638ca34b.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMSJGMEQCIAb6FjfkN1SEgECJ%2BVP7ssqKDX%2FIn47Ha1YFhFK%2FVHecAiBAKz%2F37z75bxgk%2F1nHNvUTjJbRLgQ5gJpdBProweVSxCq5BQhqEAAaDDE4NzAxNzE1MDk4NiIMaQIS2dNflj%2FuVczVKpYFGVLXmKqJ04weAxlDbEcKZh3PUIJou6bQdcZtvEr4e0bceTorpp6I9yVy8Uvy34Mt6YPth5ZMa6TXnM%2BsXe9u1n9zLpHFihHY09tB0zqiXI0q54MiU6ODkFyqEFSKM5YL3mg5oCVHXh1Y5%2FfFUHyUHaUki7iV3dGov5LsWCMNc%2FLqy3Oc2xBIArNaDUc%2F3JqCSlc%2Fd3KynRMOxeFF1woYaKVNc4ML5vZ9AWVkA3A6v17dqgrHZi05xz%2FvamNwEWuIXzUx26e248khyIFkfl8TCSDc2X8QCBtEhf%2B1XQDeAUpkHQZ%2Fzy02xt82s4ZacVwxp3ijJQBymhDLeryeEf2nT%2B4wPhUMMSCtn%2B8AIcz6l6ZnZ8%2FVWFqTN%2FRj5zbeLlu%2BtIl1KIsMUoA%2BWAjWgCXeunePqvhrAQgUNz3RfjSRlbg%2BUAW2CLBxTf9BQTL3pBoqKsLbB5pHPb64eChz2ko2IlGSIHCpDVu7eAp973LfZz2olOMSxnKUMVIIm1DUqExaZV7u2EnzBExLu5L851YmGz9b0Fyi%2FU5qYuZ8b%2FpeTQPft5fObU1LDEMoSxOXKUZTIVIZcdDda2ol%2BLnKk%2FQSsa7qZ6OqAPa6okJUt4T%2BMHvSEy9qrgZHmcN8gPh8ZHe54jfTqJk43v4QKsXd0H9iartMpe7mjigUD2OHy7IMjIGRcT8%2Bc93d%2FfohGgLS7MZF9w0EZ%2Br9SvzTzZXwl6qeB7ESKLwZj1I%2BN9nA6EtAyL7lKbC0%2Bu2kIxkIAvffN0fmoWJanfQGBKxoM%2FOJs%2BDplsCaMmLJRtD%2BlpWjL48xdSIXNYSnNL9bKdOBlozxqMlOL05MpUKVgZ2WELEfFH%2F9F2R9buriCm8siB5mK3eKBHahmQwByWAwxYWztwY6sgF3lbzo0kl0vTPBwVjLojzncOyyuZCARfNFyRdtgTa618lHTsxpImCVOs7KET%2Fi3oTxQ9mhFNA80TlkVu%2FzaHa7UE36VWejo5rLF3P1%2FEgtKLPKg7vdbryS5ZQscYW46gQu%2FB65lhTeHt6ME3d7F2S6V%2FgBo6HW%2Fns3WmJpJE2Vtpebx6sBVuTophvWUI6%2FEmx7cdiwkCpqB3ThQbFk3Q75inH%2F6qpE0tlmj2BrQdZSh9pV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240920T014327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD6WADDCO%2F20240920%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=35c8eac05e1e8396d3af5b542905f97a9acc15987b95554310293fbbb22d9bdb',
    label: 'Roast Beef',
    source: 'Saveur',
    url: 'https://www.saveur.com/recipes/roast-beef-recipe'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/fdb/fdbf70c97bdfb86dc33e2dbab97dd847.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLWVhc3QtMSJGMEQCIAb6FjfkN1SEgECJ%2BVP7ssqKDX%2FIn47Ha1YFhFK%2FVHecAiBAKz%2F37z75bxgk%2F1nHNvUTjJbRLgQ5gJpdBProweVSxCq5BQhqEAAaDDE4NzAxNzE1MDk4NiIMaQIS2dNflj%2FuVczVKpYFGVLXmKqJ04weAxlDbEcKZh3PUIJou6bQdcZtvEr4e0bceTorpp6I9yVy8Uvy34Mt6YPth5ZMa6TXnM%2BsXe9u1n9zLpHFihHY09tB0zqiXI0q54MiU6ODkFyqEFSKM5YL3mg5oCVHXh1Y5%2FfFUHyUHaUki7iV3dGov5LsWCMNc%2FLqy3Oc2xBIArNaDUc%2F3JqCSlc%2Fd3KynRMOxeFF1woYaKVNc4ML5vZ9AWVkA3A6v17dqgrHZi05xz%2FvamNwEWuIXzUx26e248khyIFkfl8TCSDc2X8QCBtEhf%2B1XQDeAUpkHQZ%2Fzy02xt82s4ZacVwxp3ijJQBymhDLeryeEf2nT%2B4wPhUMMSCtn%2B8AIcz6l6ZnZ8%2FVWFqTN%2FRj5zbeLlu%2BtIl1KIsMUoA%2BWAjWgCXeunePqvhrAQgUNz3RfjSRlbg%2BUAW2CLBxTf9BQTL3pBoqKsLbB5pHPb64eChz2ko2IlGSIHCpDVu7eAp973LfZz2olOMSxnKUMVIIm1DUqExaZV7u2EnzBExLu5L851YmGz9b0Fyi%2FU5qYuZ8b%2FpeTQPft5fObU1LDEMoSxOXKUZTIVIZcdDda2ol%2BLnKk%2FQSsa7qZ6OqAPa6okJUt4T%2BMHvSEy9qrgZHmcN8gPh8ZHe54jfTqJk43v4QKsXd0H9iartMpe7mjigUD2OHy7IMjIGRcT8%2Bc93d%2FfohGgLS7MZF9w0EZ%2Br9SvzTzZXwl6qeB7ESKLwZj1I%2BN9nA6EtAyL7lKbC0%2Bu2kIxkIAvffN0fmoWJanfQGBKxoM%2FOJs%2BDplsCaMmLJRtD%2BlpWjL48xdSIXNYSnNL9bKdOBlozxqMlOL05MpUKVgZ2WELEfFH%2F9F2R9buriCm8siB5mK3eKBHahmQwByWAwxYWztwY6sgF3lbzo0kl0vTPBwVjLojzncOyyuZCARfNFyRdtgTa618lHTsxpImCVOs7KET%2Fi3oTxQ9mhFNA80TlkVu%2FzaHa7UE36VWejo5rLF3P1%2FEgtKLPKg7vdbryS5ZQscYW46gQu%2FB65lhTeHt6ME3d7F2S6V%2FgBo6HW%2Fns3WmJpJE2Vtpebx6sBVuTophvWUI6%2FEmx7cdiwkCpqB3ThQbFk3Q75inH%2F6qpE0tlmj2BrQdZSh9pV&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240920T014327Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFD6WADDCO%2F20240920%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9b6438c1fbea8fd6e472f8e3ca123d042aa30c4c7d73f976d437604aab9c2f4b',
    label: 'Beef Tea',
    source: 'Epicurious',
    url: 'https://www.epicurious.com/recipes/food/views/beef-tea-395253'
  }
]

const RecipesContainer = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const { navigation } = props

  const fetchRecipes = () => {
    setIsLoading(true)

    // getRecipes(ingredient).then(
    //   recipes => {
    //     setRecipes(recipes)
    //     setIsLoading(false)
    //   },
    //   error => {
    //     alert('Error', `Something went wrong! ${error}`)
    //   }
    // )

    setRecipes(recipesResponse)

    setIsLoading(false)
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  return (
    <Center px={4}>
      <Form onInputChange={handleInputChange} onSubmit={fetchRecipes} />
      {isLoading ? <Loading /> : <RecipesList navigation={navigation} recipes={recipes} />}
    </Center>
  )
}

export default RecipesContainer
