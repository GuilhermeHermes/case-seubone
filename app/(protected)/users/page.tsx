// pages/users.tsx
import { auth } from "@/auth";
import UsersTable from "@/components/users-table";
import ClientSideComponent from "@/components/create-vendedor"; // Importe o componente cliente

const UsersPage = async () => {
  const session = await auth();
  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute top-5 right-5">
        <ClientSideComponent />
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
