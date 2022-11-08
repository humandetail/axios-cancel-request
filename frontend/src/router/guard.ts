import router from './index'

import { useCommonStore } from '../store'

router.beforeEach((_to, _from, next) => {
  const commonStore = useCommonStore()
  commonStore.CLEAR_CANCELERS()
  next()
})
