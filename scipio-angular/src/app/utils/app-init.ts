import {KeycloakService} from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'https://keycloak.tircher.be/auth',
            realm: 'TCC',
            clientId: 'scipio',
            credentials: {
              secret: '670768c2-e5b5-4b78-b7ed-8d119c7e48fa'
            }
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
