import {Cuisine} from './cuisine.model';

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
        profileCompletion: number;
        userAccountDTO: {
          username: string,
          email: string,
          country: string,
          nick: string,
          lastLogged: any,
          isFilled: boolean,
          isVerified: boolean,
          createdAt: any,
          id: number
        };
            id: number; 
    };