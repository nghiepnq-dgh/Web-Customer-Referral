import { fetch, fetchAuth } from '@/utils/request';

const route = {
  getClientSetting: 'v2/client-setting',
  createClientSetting: 'v2/client-setting',
  updateClientSetting: 'v2/client-setting'
}

export function getClientSetting(){
  return fetchAuth({
    url: route.getClientSetting,
    method:'GET'
  })
}

export function createClientSetting(data){
  return fetchAuth({
    url: route.createClientSetting,
    method:'POST',
    data
  })
}

export function updateClientSetting(data){
  return fetchAuth({
    url: route.getClientSetting,
    method:'PUT',
    data
  })
}