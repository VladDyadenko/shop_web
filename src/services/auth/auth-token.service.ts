import Cookies from 'js-cookie';

export enum EnumTokens{
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}


export const saveTokenStorage = (accessToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
        expires: 1,
        sameSite: 'none',  
        secure: true,      
        path: '/',
      
    })
}
 
export const removeFromStoreg = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
}