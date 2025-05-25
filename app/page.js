import TaskManager from "@/Components/TaskManager";
import Navbar from "../Components/Navbar";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <TaskManager />
        </main>
        <Footer />
      </div>
    </>
  );
}
