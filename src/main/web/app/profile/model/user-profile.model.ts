import {Cuisine} from './cuisine.model';

export interface UserProfile{
        name: any,
        surname: '',
        street: string,
        streetNumber: '',
        flatNumber: '',
        postCode: '',
        city: '',
        birthDate: any,
        phoneNumber: '',
        sex: any,
        interests: '',
        description: '',
        preferredCuisine: Cuisine[],
        profileCompletion: any,
        userAccountDTO: {
          username: '',
          email: '',
          country: '',
          nick: '',
          lastLogged: '',
          isFilled: '',
          isVerified: '',
          createdAt: '',
          id: ''
        },
            id: '' 
    };