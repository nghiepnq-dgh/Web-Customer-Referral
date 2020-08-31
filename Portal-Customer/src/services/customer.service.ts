import { fetch, fetchAuth } from '@/utils/request';

const routes = {
  login: 'v2/auth/token',
  getMe: 'v2/auth/profile',
  viewRewardReport: 'v2/reward/total-reward',
  getCampainValidEnpoint: 'v2/campaign/active',
};

export function login(data) {
  return fetch({
    url: routes.login,
    method: 'POST',
    data,
  });
}

export function getMe() {
  return fetchAuth({
    url: routes.getMe,
    method: 'GET',
  });
}

export function viewRewardReport() {
  return fetchAuth({
    url: routes.viewRewardReport,
    method: 'POST',
  });
}

export function getCampaignService() {
  return fetchAuth({
    url: routes.getCampainValidEnpoint,
    method: 'GET',
  });
}
