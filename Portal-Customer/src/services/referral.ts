// import { request } from '@/utils/request-mock;
import request from 'umi-request';
import { fetch, fetchAuth } from '@/utils/request';

const routes = {
  createReferral: 'v2/referral',
  getListReferral:'v2/referral',
  getDetailReferral: id => `v2/referral/${id}`,
  updateReferral: id => `v2/referral/${id}`,
  deleteReferral: id => `v2/referral/${id}`
};

export function createReferral(data) {
  
  return fetchAuth({
    url: routes.createReferral,
    method:'POST',
    data
  })
}

export function getListReferral(params){
  return fetchAuth({
    url: routes.getListReferral,
    method:'GET',
    params:{
      ...params
    }
  })
}

export function getDetailReferral(id){
  return fetchAuth({
    url: routes.getDetailReferral(id),
    method:'GET'
  })
}

export function updateReferral(id){
  // use Form() for handle fields data when it's working with API
  return fetchAuth({
    url: routes.updateReferral(id),
    method:'PUT'
  })
}

export function deleteReferral(id){
  return fetchAuth({
    url: routes.deleteReferral(id),
    method:'DELETE'
  })
}
 
