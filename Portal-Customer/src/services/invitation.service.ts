import { fetchAuth } from '@/utils/request';
import {deleteNullObject} from '../utils/function.utils';

const routes = {
 invitaion: 'v2/invitation',
 listInvitations: 'v2/invitation'
}

export function createInvitaion(data){
  return fetchAuth({
    url: routes.invitaion,
    method:'POST',
    data
  })
}

export function listInvitaionService(params){
    const newParam = deleteNullObject(params);
    return fetchAuth({
      url: routes.listInvitations,
      method:'GET',
      params: {
        ...newParam
      }
    })
  }
  