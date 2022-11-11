// Page for users not logged in
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Homepage</h3>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/login"}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
