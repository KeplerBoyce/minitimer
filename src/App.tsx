import Sidebar from "./components/Sidebar";

export default function App() {
    return (
        <div className="w-full h-[100vh] bg-dark-1">
            <Sidebar className="absolute left-0 bg-dark-0" />
        </div>
    );
}
