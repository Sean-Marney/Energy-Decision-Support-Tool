import { useRouter } from "next/router";

// Should be switched to ID later
export default function User() {
  const router = useRouter();
  const { email } = router.query;

  return <h1>{email}</h1>;
}
