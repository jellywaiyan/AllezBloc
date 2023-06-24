import { API, Auth, graphqlOperation } from "aws-amplify";

export const findOverlappingChatRooms = async (userID) => {
    const authUser = await Auth.currentAuthenticatedUser();

    //find all chatrooms of user1
    const response = await API.graphql(graphqlOperation(listChatRooms, { id: authUser.attributes.sub }))
    //find all chatrooms of user2
 
    //remove chat rooms with more than 2 users
    const chatRooms = response.data?.getUser?.ChatRooms?.items || [];
    //console.log(chatRooms);
    const chatRoom = chatRooms.find((chatRoomItem) => 
        chatRoomItem.chatRoom.users.items.some((userItem) => userItem.user.id == userID));
    //find overlapped/common chat room
    return chatRoom;
};


export const listChatRooms = /* GraphQL */ `
query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }`