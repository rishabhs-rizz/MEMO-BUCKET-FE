import { SignIn, Signup } from "./components/AuthPage";
import { DashBoard } from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OthersBrain } from "./components/OthersBrain";
import SelectedContent from "./components/SelectedContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/api/v1/brain/:shareLink" element={<OthersBrain />} />
        <Route path="/dashboard/:ContentType" element={<SelectedContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
