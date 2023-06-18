import { applyRequestIntercepter, applyResponseIntercepter, axiosInstance } from "@/constant";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

/**
 * This function will cache response based on queryKey
 * @param queryKey : this key for caching, in the future you can use  useQuery('[queryKey]', ...) to get caching data
 * @param endpoint : the API endpont
 * @param options  : define options to refech or caching here, ref: https://react-query.tanstack.com/reference/useQuery
 * @param request  : request params
 * @returns 
 */
export function useHttpGet<Request, Response>(queryKey: string, endpoint: string, options?: {}, request?: Request) {

    const defaultOption = {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        structuralSharing: false
    };
    const mergeOptions = {
        ...defaultOption,
        ...options
    }

    // interceptorHandler(t,'withQuery')

    const query = useQuery<Response, AxiosError>(
        queryKey,
        async () => {
            try {
                const res = await axiosInstance.get<null, AxiosResponse>(endpoint, request as any);
                const data = res.data;

                if (data) {
                    return data;
                }
            } catch (error: any) {
                // onErrorHandle(error, refreshToken, refreshAnonymousToken, expireSession );
            }
        },
        mergeOptions
    );
    return query
}

/**
 * This function will cache response with key is endpoint (no need to define QUERY_KEY)
 * @param endpoint : the API endpont
 * @param options  : define options to refech or caching here, ref: https://react-query.tanstack.com/reference/useQuery
 * @param request  : request params
 * @returns 
 */
export function useHttpGetAutoCached<Request, Response>(endpoint: string, options?: {}, request?: Request) {
    return useHttpGet<Request, Response>(endpoint, endpoint, options, request);
}

export function useAPI() {
    applyRequestIntercepter();
    applyResponseIntercepter();
    return { API: axiosInstance }
}