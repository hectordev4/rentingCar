import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: 'eu-central-1',
});

export const signIn = async (
  username: string,
  password: string
): Promise<InitiateAuthCommandOutput | undefined> => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID as string,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    const { AuthenticationResult } = response;

    console.log('AuthenticationResult: ', AuthenticationResult);

    if (AuthenticationResult) {
      sessionStorage.setItem('idToken', AuthenticationResult.IdToken ?? '');
      sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken ?? '');
      sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken ?? '');
      console.log('Login successful, tokens stored in sessionStorage.');
    }

    return response;
  } catch (error) {
    console.error('Error signing in: ', error);
    return undefined;
  }
};
