import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Register";
import Profilepage from "./pages/Profilepage";
import Logout from "./pages/Logout";
import Profilepage_admin_want from "./pages/Profilepage_admin_want";
import Form from "./pages/Form";
import Landing from "./pages/Landing";
import Notification from "./pages/Notification";
import Notification_each from "./components/Notification_each";
import Chat from "./pages/Chat";
import PostJob from "./pages/PostJob";
import ApplicationsPage from "./pages/JobApplications";
import RegisterClient from "./pages/RegisterClient";
import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./pages/Jobs";
import UserSignUp from "./pages/StudentRegister";
import Election from "./pages/Election";
import ElectionStudent from "./pages/ElectionStudent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/candidates" exact element={<Home />} />
        <Route path="/jobs" exact element={<Jobs />} />
        <Route path="/election" exact element={<Election />} />
        <Route path="/election_student" exact element={<ElectionStudent />} />




        <Route path="/login" exact element={<SignIn />} />
        <Route path="/register" exact element={<SignUp />} />
        <Route path="/register_client" exact element={<RegisterClient />} />
        <Route path="/reg_stud" exact element={<UserSignUp />} />


        <Route path="/logout" exact element={<Logout />} />
        <Route path="/profile" exact element={<Profilepage />} />
        <Route path="/applications" exact element={<ApplicationsPage />} />


        <Route path="/infoform" exact element={<Form />} />

        <Route
          path="/profile_admin_want"
          exact
          element={
            <ProtectedRoute>
              <Profilepage_admin_want />
            </ProtectedRoute>
          }
        />
        <Route path="/notification" exact element={<Notification />} />
        <Route
          path="/notification_each"
          exact
          element={<Notification_each />}
        />
        {/* <Route path="/chat" exact element={<Chat />} /> */}

        <Route path="/postjob" exact element={<PostJob />} />

      </Routes>
    </>
    
  );
}

export default App;
