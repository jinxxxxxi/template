import { ApiResponse } from "../common";
import { GetUserListRequest } from "./request";
import { GetUserListResponse, GetUserResponse, UserInfo, UserListItem } from "./response";


export interface IUserClient {
    /**
     * 用户ID
     * @method GET
     * @path /api/user/self
     * @description 获取当前用户信息
     * @returns 用户信息
    **/
   getSelfInfo(): Promise<GetUserResponse>;

   /**
    * 获取用户列表
    * @param page 页码
    * @param pageSize 每页条数
    * @returns 用户列表
    * @method GET
    * @path /api/user/list
    * @description 获取用户列表
    * @returns 用户列表
    **/
   getUserList(userListRequest: GetUserListRequest): Promise<GetUserListResponse>;

   /**
    * 根据用户ID获取用户信息
    * @param userId 用户ID
    * @method GET
    * @path /api/user/:userId
    * @description 获取用户信息
    * @returns 用户信息
    **/
   getUserById(userId: string): Promise<GetUserResponse>;

   /**
   *删除用户
   * @param userId 用户ID
   * @method DELETE
   * @path /api/user/:userId
   * @description 删除用户
   * @returns 删除结果
   **/
   deleteUser(userId: string): Promise<ApiResponse>;


   /**
   * 更新用户信息
   * @param userId 用户ID
   * @param userInfo 用户信息
   * @method PUT
   * @path /api/user/:userId
   * @description 更新用户信息
   * @returns 更新结果
   **/
   updateUser(userId: string, userInfo: UserInfo): Promise<GetUserResponse>;
}

