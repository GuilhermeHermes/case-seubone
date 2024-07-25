import {auth} from "@/auth"

const RequestPage = async () => {
  const session = await auth()
  session?.user.role
    return (  
        <div>
          {JSON.stringify(session)}
        </div>
    );
}
 
export default RequestPage