import {Cuisine} from './cuisine.model';
import {UserAccountDTO} from './userAccountDTO.model';

export class UserProfile{
        name: string;
        surname: string;
        street: string;
        streetNumber: string;
        flatNumber: string;
        postCode: string;
        city: string;
        birthDate: any;
        phoneNumber: string;
        sex: string;
        interests: string;
        description: string;
        preferredCuisine: Cuisine[];
        profileCompletion: string;
        userAccountDTO: UserAccountDTO;
            id: number; 

      constructor(){
        this.name = '';
        this.surname = '';
        this.street = '';
        this.streetNumber = '';
        this.flatNumber = '';
        this.postCode = '';
        this.city = '';
        this.birthDate = '';
        this.phoneNumber = '';
        this.sex = '';
        this.interests = '';
        this.description = '';
        this.preferredCuisine = [];
        this.profileCompletion = '';
        this.userAccountDTO = new UserAccountDTO;
        this.id = -1;
      }  
            }