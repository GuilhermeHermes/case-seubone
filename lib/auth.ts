import {auth} from '@/auth';

export const CurrentUser = async () => {
    const session = await auth();
    console.log(session?.user);
    return session?.user;
}
