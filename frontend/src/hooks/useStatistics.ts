// useStatistics.ts
import statisticService from '@/components/services/statistics/statistic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios'; // Ensure this import is correct for your setup
import { IStatistics } from '@/types/statistics.interface';

type QueryFunction = () => Promise<AxiosResponse<IStatistics, any>>;

export const useTotalUsers = () => {
    return useQuery<number, Error>({
      queryKey: ['users'],
      queryFn: fetchData<number>(statisticService.getTotalUsers),
    });
  };
  
export const useTotalProducts = () => {
  return useQuery<number, Error>({
    queryKey: ['products'],
    queryFn: fetchData<number>(statisticService.getTotalProducts),
  });
};

export const useTotalOrders = () => {
  return useQuery<number, Error>({
    queryKey: ['orders'],
    queryFn: fetchData<number>(statisticService.getTotalOrders),
  });
};

export const useTotalIncome = () => {
  return useQuery<number, Error>({
    queryKey: ['income'],
    queryFn: fetchData<number>(statisticService.getTotalIncome),
  });
};

function fetchData<T>(queryFn: QueryFunction): UseQueryOptions<T, Error>['queryFn'] {
  return async () => {
    const response = await queryFn();
    return response.data as T;
  };
}
