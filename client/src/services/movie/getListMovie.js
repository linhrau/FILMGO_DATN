//để quản lý việc lấy danh sách phim (/movies) từ API
import { queryOptions, useQuery } from '@tanstack/react-query';
import api from '../../libs/axios';

export const GET_LIST_MOVIE = 'LIST_MOVIE';
//GET_LIST_MOVIE: là query key, dùng để React Query quản lý cache.
//getListMovie(): hàm gọi API bằng Axios (api.get('/movies')) để lấy dữ liệu phim từ endpoint /movies.
const getListMovie = async () => {
    const { data } = await api.get(`/movies`);
    return data;
};
//queryKey: key duy nhất để React Query nhận diện cache (['LIST_MOVIE']).
//queryFn: hàm async để lấy dữ liệu (getListMovie()).
//retry: false: không tự động retry nếu gặp lỗi.
//staleTime: 5 phút: trong 5 phút, dữ liệu được coi là "fresh" → React Query không gọi lại API.
export const getListMovieOptions = () =>
    queryOptions({
        queryKey: [GET_LIST_MOVIE],
        queryFn: () => getListMovie(),
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
// Đây là hook tuỳ chỉnh (custom hook) giúp bạn dùng useQuery dễ dàng hơn.
// queryConfig: cho phép truyền thêm cấu hình từ bên ngoài (ví dụ: onSuccess, onError, refetchInterval, v.v).
//enabled: để bật/tắt việc gọi API (ví dụ: bạn có thể để enabled: false rồi gọi refetch() sau).
export const useGetListMovie = ({ queryConfig, enabled }) => {
    return useQuery({
        ...getListMovieOptions(),
        ...queryConfig,
        enabled: enabled,
    });
};
