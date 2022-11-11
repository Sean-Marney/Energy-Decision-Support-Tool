import { useRouter } from "next/router";

export default function Organisation() {
  const router = useRouter();
  const { orgName } = router.query;

  return (
    <div>
      <h1>{orgName}</h1>
    </div>
  );
}
