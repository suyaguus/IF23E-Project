<<<<<<< HEAD
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
=======
// import DashboarAdmindPage from "./dashboard/admin/page";
// import DashBoardPage from "./dashboard/page";

// export default function Home() {
//   return (
//     <DashBoardPage/>
//   );
// }

import DashBoarduserPage from "./dashboard/user/page";

export default function Home() {
  return (
    <DashBoarduserPage/>
  );
>>>>>>> sapta
}
