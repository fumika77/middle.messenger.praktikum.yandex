import {Base, IRequestOptions} from "./Base";
import {ChatCreateRequest, ChatDeleteRequest, ChatListRequest, ModifyChatUserRequest, TokenRequest} from "./types";

class Chats extends Base{
    private baseUrl = 'chats';

    public getChats(data?: Partial<ChatListRequest>){
        return super.get(this.baseUrl,{data} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public createChat(data: ChatCreateRequest){
        return super.post(this.baseUrl,{data} ).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public deleteChat(data: ChatDeleteRequest){
        return super.delete(this.baseUrl,{data}  as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public addChatUser(data: ModifyChatUserRequest){
        return super.put(this.baseUrl + '/users',{data}  as IRequestOptions ).then((response) => {
            return response == 'OK'? response : JSON.parse(<string>response);
        })
    }

    public deleteChatUser(data: ModifyChatUserRequest){
        return super.delete(this.baseUrl + '/users',{data} as IRequestOptions).then((response) => {
            return JSON.parse(<string>response);
        })
    }

    public getToken(data: TokenRequest){
        return super.post(this.baseUrl + `/token/${data.id}`,{data: {data}, headers: {mode: 'cors',
            credentials: 'include'}} ).then((response) => {
            return JSON.parse(<string>response);
        })
    }

}

const instance = new Chats();
export default instance;