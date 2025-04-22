//lấy danh sách phim đang chiếu (/moviesShowing).
//Tạo một custom hook (useGetListMovieShowing) để gọi API lấy danh sách các phim đang chiếu từ endpoint:/moviesShowing (qua Axios).

import { queryOptions, useQuery } from '@tanstack/react-query';
import api from '../../libs/axios';
//GET_LIST_MOVIE_SHOWING làm query key, giúp React Query phân biệt cache.
export const GET_LIST_MOVIE_SHOWING = 'LIST_MOVIE_SHOWING';
//Hàm getListMovie() gọi API /moviesShowing bằng Axios (api.get(...)).
//Trả về data lấy được từ response.
//api ở đây là một instance axios đã cấu hình sẵn (base URL, header, v.v).
const getListMovie = async () => {
    const { data } = await api.get(`/moviesShowing`);
    return data;
};
//queryKey: là định danh cache: ['LIST_MOVIE_SHOWING']
//queryFn: là hàm lấy dữ liệu — getListMovie()
//retry: false: không tự động gọi lại nếu API lỗi
//staleTime: 5 phút: trong 5 phút, React Query coi dữ liệu là “fresh” → không gọi lại
export const getListMovieOptions = () =>
    queryOptions({
        queryKey: [GET_LIST_MOVIE_SHOWING],
        queryFn: () => getListMovie(),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
//Customhook (useGetListMovieShowing) này kết hợp sẵn queryOptions ở trên với cấu hình tuỳ biến truyền từ ngoài vào.
//queryConfig: cho phép truyền thêm các config như onSuccess, onError, refetchInterval, v.v.
//enabled: dùng để kiểm soát việc gọi query tự động hay không (true hoặc false)
export const useGetListMovieShowing = ({ queryConfig, enabled }) => {
    return useQuery({
        ...getListMovieOptions(),
        ...queryConfig,
        enabled: enabled,
    });
};
