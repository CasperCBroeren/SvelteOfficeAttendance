import { writable, get } from 'svelte/store'
import createAuth0Client from '@auth0/auth0-spa-js'

function createUserData() {
  let options = {
    domain: 'dev-y7zixll2.eu.auth0.com',
    clientId: 'HgNBU9MhAKMGy7JwF6Yp1I13Fg7OONwA',   
    returnUri: 'http://localhost:5000/',
    audience: 'ApiOfficeAttendance'
  }
  
  const store = writable<any>({});
  const { subscribe, set, update } = store;
  return {
    subscribe,
    set,
    update,
    async load() {
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience
      }); 
      if (window.location.search.indexOf('code') > -1 && window.location.search.indexOf('state') > -1) {
        await this.auth0Client.handleRedirectCallback();
        location.search = '';
      }
      const user = await this.auth0Client.getUser(); 
      set({
        isAuthenticated: await this.auth0Client.isAuthenticated(),
        user
      });
    },
    async getToken() {
      
      return  await this.auth0Client.getTokenSilently();
    },
    async login() {
      if (window.location.search.indexOf('error') == -1) {
        this.auth0Client = await createAuth0Client({
          domain: options.domain,
          client_id: options.clientId,
          audience: options.audience
        });
        await this.auth0Client.loginWithRedirect({  redirect_uri: options.returnUri } );
        const user = this.auth0Client.getUser();
        set({
          isAuthenticated: await this.auth0Client.isAuthenticated(),
          user
        });
      }
    },
    async logout() {
      return await this.auth0Client.logout({ returnTo: options.returnUri   });
    } 
  }
}

export const userData = createUserData();