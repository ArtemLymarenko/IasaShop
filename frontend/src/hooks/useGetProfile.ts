import userService from "@/components/services/user/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
	const { data } = useQuery({
		queryKey: ['getProfile'],
		queryFn: async () => await userService.getProfile(),
		select: ({ data }) => data
	})

	return data
}