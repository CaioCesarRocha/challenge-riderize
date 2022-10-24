
export type SearchByID = {
    id: string
  }
  

export type RegisterRide = {
    data: {
        id?: string,
        name: string, 
        start_date: string,
        start_date_registration: string,
        end_date_registration: string,
        additional_information:string,
        start_place: string,
        participants_limit: number,
        creator_id: string
    }
}

export type Enroll = {
    data: {
        user_id: string,
        ride_id: string,
        subscription_date: string
    }    
}

export type RegisterUser = {
    data: {
        username: string,
        email: string,
        password: string
    }  
}

export type LoginUser = {
    data: {
        email: string,
        password: string
    }  
}