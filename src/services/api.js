import axios from 'axios'
import { APP_ID, APP_KEY, BASE_URL, TYPE } from '../config/apiConfig'
import qs from 'qs'

export const getRecipes = async ingredient => {
  const url = BASE_URL

  try {
    const params = {
      q: ingredient,
      app_id: APP_ID,
      app_key: APP_KEY,
      type: TYPE,
      field: ['label', 'image', 'source', 'url']
    }

    const recipeAxios = axios.create({
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })

    const response = await recipeAxios.get(url, { params })

    console.log('RESPONSE', response.data.hits)
  } catch (error) {
    console.log(error)
    throw error
  }
}
