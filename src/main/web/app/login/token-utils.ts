export class TokenUtils {
    /**
     * Search local storage for token. If token isnt prese3nt in local storage. Search in session storage.
     */
    static getStoredToken(){
        var foundToken = localStorage.getItem('toKey');
        if(foundToken == null)
            foundToken = sessionStorage.getItem('toKey');
        return foundToken;
    }

    /**
     * stores token in the local or session storage depending on whether user checked "remember me" or not
     * @param shouldBeRemembered
     * @param token !Remember to stringify the JSON!
     */
    static storeToken(shouldBeRemembered: boolean, token: any){
        if(token == null)
            return;
        if (shouldBeRemembered == true) {
            localStorage.setItem('toKey', token);
        }
        else {
            sessionStorage.setItem('toKey',token);
        }
    }

    static removeStoredTokens(){
        sessionStorage.removeItem('toKey');
        localStorage.removeItem('toKey');
    }
}