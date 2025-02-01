import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
 client = new Client();
 account;

 constructor(){
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client)
 }

 async createAccount({email, password, name}){
    try{
        const newAccount = await this.account.create(ID.unique(), email, password, name);
        if(newAccount){
            this.login(email,password)
        }else{
            return newAccount
        }
    } catch(err){
        throw err
    }
 }

 async login({email, password}){
    try {
        return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error;
    }
 }

 async getCurrentUser(){
    try {
        const currUser =  await this.account.get()
        if(!currUser){
            return null
        }else{
            return currUser
        }
    } catch (error) {
        throw error
    }
 }

 async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
 }


}

const authService = new AuthService();

export default authService;