import request from 'umi-request';

export function getListFriend() {
  const result = request.get('/api/friend').then( res => { return res }).catch( err => { console.log('Err get friend',err) });
  return result;
}