// userTypes.ts

export interface UserInSession {
    userId: number;
    email: string;
    role?: string;
    status?: boolean;
    name?: string;
    firstLastName?: string;
    secondLastName?: string | null;
    phoneNumber?: string | null;
    adressState?: string | null;
    adressCountry?: string | null;
    image?: string | null;
    personalInformation?: any;
  }
  
  export interface UpdateUserPersonalInfoRequest {
    email: string;
    password?: string;
    name: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    adressState: string;
    adressCountry: string;
  }
  
  export interface RequestBaseForDeleteAndGetOneDTO {
    id: number;
  }
  
  export interface PaginationRequestDTO {
    page: number;
    size: number;
    sortDirection?: "asc" | "desc";
    sortField?: string;
    search?: string;
    status?: boolean;
  }
  
  export interface UpdateUserStatusDTO {
    userId: number;
    status: boolean;
  }
  
  export interface ResponseGetPostulantsDTO {
    userId: number;
    email: string;
    name: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    adressState: string;
    adressCountry: string;
    status: boolean;
    image?: string;
  }
  
  export interface PageResponse<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface RequestGetPostulantDTO {
    id: number;
  }