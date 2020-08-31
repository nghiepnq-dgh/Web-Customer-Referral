import { fetch, fetchAuth } from '@/utils/request';
import request from 'umi-request';

const routes = {
  createReward:'v2/reward',
  getListReward:'v2/reward',
  getDetailReward: id => `v2/reward/${id}`,
  updateReward: id => `v2/reward/${id}`,
  deleteReward: id => `v2/reward/${id}`
}

export function createReward(data) {
  return fetchAuth({
    url: routes.createReward,
    method:'POST',
    data
  })
}

export function getListReward(params){
  return fetchAuth({
    url: routes.getListReward,
    method:'GET', 
    params: {...params}
  })
}

export function getDetailReward(id){
  return fetchAuth({
    url: routes.getDetailReward(id),
    method:'GET'
  })
}

export function updateReward(id){
  return fetchAuth({
    url: routes.updateReward(id),
    method:'PUT'
  })
}

export function deleteReward(id){
  return fetchAuth({
    url: routes.deleteReward(id),
    method:'DELETE'
  })
}


