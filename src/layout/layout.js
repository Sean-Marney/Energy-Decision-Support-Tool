export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-300">
      <div className="m-auto bg-slate-50 rounded-md w-2/3 h-3/4 ">
        <div className="right flex flex-col justify-evenly">
          <div className="text-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
