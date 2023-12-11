
import { FC, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import styles from './UserPage.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/ui/button/Button';
import Field from '@/components/ui/input/Field';
import { IUser } from '@/types/user.interface';
import userService from '@/components/services/user/user.service';
import { useGetProfile } from '@/hooks/useGetProfile';
import { useActions } from '@/hooks/useActions';
import Heading from '@/components/ui/heading/Heading';

const UserPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const queryClient = useQueryClient();
  const userProfile = useGetProfile();
  const { logout } = useActions()
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, 
  } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: userProfile,
  });

  useEffect(() => {
    setValue('firstName', userProfile?.firstName || '');
    setValue('lastName', userProfile?.lastName || '');
    setValue('phone', userProfile?.phone || '');
    setValue('email', userProfile?.email || '');
  }, [userProfile, setValue]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log('Submitting data:', data);
    const user = await userService.updateProfile({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });

    if (!user) {
      setErrorMessage('Something went wrong. Try again!');
      return;
    }


    queryClient.invalidateQueries('profile data');

    reset();
  };

  return (
    <Layout pageTitle={pageTitle}>
      <div className='userInfo'>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
		<Field
			  {...formRegister('firstName', {
				required: 'First name is required',
			  })}
			  placeholder='First Name'
			  error={errors.firstName?.message}
			/>
  
			<Field
			  {...formRegister('lastName', {
				required: 'Last name is required',
			  })}
			  placeholder='Last Name'
			  error={errors.lastName?.message}
			/>
  
			<Field
			  {...formRegister('phone', {
				required: 'Phone number is required',
			  })}
			  placeholder='Phone'
			  error={errors.phone?.message}
			/>
  
			<Field
			  {...formRegister('email', {
				required: 'Email is required',
			  })}
			  placeholder='Email'
			  error={errors.email?.message}
			/>

          <Button type='submit'>Save</Button>
		  <Button onClick={logout}>Logout</Button>
        </form>
      </div>
    </Layout>
  );
};

export default UserPage;

